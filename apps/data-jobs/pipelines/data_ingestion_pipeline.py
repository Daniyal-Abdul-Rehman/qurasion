"""
Data Ingestion Pipeline
Orchestrates data ingestion from multiple sources into the canonical database
"""

from typing import Dict, Any, List, Optional
from datetime import datetime, timedelta
import logging
import json
from dataclasses import dataclass
from enum import Enum
import os
import sys

# Add parent directory to path for imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sources.base_adapter import BaseAdapter, IngestionResult, APIBudgetManager, DataCache
from sources.attom_adapter import ATTOMAdapter, ATTOMSalesHistoryAdapter
from sources.rentcast_adapter import RentCastAdapter, RentCastListingsAdapter
from sources.census_adapter import CensusAdapter, CensusGeographicEnrichment

class IngestionStatus(Enum):
    """Status of ingestion operations"""
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    PARTIAL_SUCCESS = "partial_success"

@dataclass
class PipelineConfig:
    """Configuration for data ingestion pipeline"""
    database_url: str
    attom_api_key: str
    rentcast_api_key: str
    census_api_key: Optional[str] = None
    monthly_budget_usd: float = 1000.0
    enable_caching: bool = True
    cache_redis_host: str = "localhost"
    cache_redis_port: int = 6379
    log_level: str = "INFO"

class DataIngestionPipeline:
    """
    Main data ingestion pipeline that orchestrates all data sources.
    
    Manages:
    - Adapter initialization and configuration
    - Budget management and cost tracking
    - Error handling and retry logic
    - Geographic enrichment
    - Data quality monitoring
    - Logging and reporting
    """
    
    def __init__(self, config: PipelineConfig):
        """
        Initialize the data ingestion pipeline.
        
        Args:
            config: Pipeline configuration
        """
        self.config = config
        self.logger = self._setup_logger()
        
        # Initialize budget manager
        self.budget_manager = APIBudgetManager(config.monthly_budget_usd)
        
        # Initialize cache if enabled
        self.cache = None
        if config.enable_caching:
            self.cache = DataCache(config.cache_redis_host, config.cache_redis_port)
        
        # Initialize adapters
        self.adapters = {}
        self._initialize_adapters()
        
        # Geographic enrichment
        self.geo_enrichment = CensusGeographicEnrichment(config.database_url)
        
        # Pipeline state
        self.current_run_id = None
        self.start_time = None
        self.results = []
    
    def _setup_logger(self) -> logging.Logger:
        """Setup pipeline logging."""
        logger = logging.getLogger('DataIngestionPipeline')
        logger.setLevel(getattr(logging, self.config.log_level))
        
        if not logger.handlers:
            handler = logging.StreamHandler()
            formatter = logging.Formatter(
                '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
            )
            handler.setFormatter(formatter)
            logger.addHandler(handler)
        
        return logger
    
    def _initialize_adapters(self) -> None:
        """Initialize all data source adapters."""
        adapter_configs = {
            'attom': {
                'api_key': self.config.attom_api_key,
                'database_url': self.config.database_url,
                'rate_limit': 10,
                'timeout': 30
            },
            'rentcast': {
                'api_key': self.config.rentcast_api_key,
                'database_url': self.config.database_url,
                'rate_limit': 100,  # 100 requests per minute
                'timeout': 30
            },
            'census': {
                'api_key': self.config.census_api_key,
                'database_url': self.config.database_url,
                'rate_limit': 50,
                'timeout': 60
            }
        }
        
        try:
            self.adapters['attom'] = ATTOMAdapter(adapter_configs['attom'])
            self.adapters['attom_sales'] = ATTOMSalesHistoryAdapter(adapter_configs['attom'])
            self.adapters['rentcast'] = RentCastAdapter(adapter_configs['rentcast'])
            self.adapters['rentcast_listings'] = RentCastListingsAdapter(adapter_configs['rentcast'])
            self.adapters['census'] = CensusAdapter(adapter_configs['census'])
            
            self.logger.info("All adapters initialized successfully")
            
        except Exception as e:
            self.logger.error(f"Failed to initialize adapters: {str(e)}")
            raise
    
    def run_property_ingestion(
        self,
        property_list: List[Dict[str, Any]],
        sources: List[str] = None
    ) -> Dict[str, Any]:
        """
        Run property data ingestion for multiple properties.
        
        Args:
            property_list: List of property dictionaries with address data
            sources: List of sources to use (default: all)
            
        Returns:
            Summary of ingestion results
        """
        if sources is None:
            sources = ['attom', 'rentcast']
        
        self.current_run_id = f"run_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        self.start_time = datetime.now()
        
        self.logger.info(f"Starting property ingestion run {self.current_run_id}")
        self.logger.info(f"Processing {len(property_list)} properties from sources: {sources}")
        
        results = {
            'run_id': self.current_run_id,
            'start_time': self.start_time.isoformat(),
            'total_properties': len(property_list),
            'source_results': {},
            'summary': {}
        }
        
        total_successful = 0
        total_failed = 0
        
        for source in sources:
            if source not in self.adapters:
                self.logger.warning(f"Source {source} not available")
                continue
            
            try:
                source_result = self._ingest_from_source(source, property_list)
                results['source_results'][source] = source_result
                
                total_successful += source_result['records_successful']
                total_failed += source_result['records_failed']
                
            except Exception as e:
                self.logger.error(f"Failed to ingest from {source}: {str(e)}")
                results['source_results'][source] = {
                    'status': 'failed',
                    'error': str(e),
                    'records_successful': 0,
                    'records_failed': len(property_list)
                }
                total_failed += len(property_list)
        
        end_time = datetime.now()
        results['end_time'] = end_time.isoformat()
        results['duration_seconds'] = (end_time - self.start_time).total_seconds()
        results['summary'] = {
            'total_successful': total_successful,
            'total_failed': total_failed,
            'success_rate': total_successful / len(property_list) if property_list else 0,
            'status': 'completed' if total_failed == 0 else 'partial_success'
        }
        
        self.logger.info(f"Ingestion completed: {results['summary']}")
        self._log_pipeline_results(results)
        
        return results
    
    def _ingest_from_source(self, source: str, property_list: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Ingest data from a specific source.
        
        Args:
            source: Source name
            property_list: List of properties to process
            
        Returns:
            Source-specific results
        """
        adapter = self.adapters[source]
        start_time = datetime.now()
        
        self.logger.info(f"Starting ingestion from {source}")
        
        # Check budget before starting
        if not self.budget_manager.can_make_request(source):
            self.logger.warning(f"Budget exhausted for {source}")
            return {
                'status': 'failed',
                'error': 'Budget exhausted',
                'records_processed': len(property_list),
                'records_successful': 0,
                'records_failed': len(property_list)
            }
        
        # Process properties in batches
        batch_results = adapter.batch_fetch_properties(property_list, batch_size=100)
        
        # Aggregate results
        total_processed = sum(r.records_processed for r in batch_results)
        total_successful = sum(r.records_successful for r in batch_results)
        total_failed = sum(r.records_failed for r in batch_results)
        
        end_time = datetime.now()
        
        result = {
            'status': 'completed' if total_failed == 0 else 'partial_success',
            'records_processed': total_processed,
            'records_successful': total_successful,
            'records_failed': total_failed,
            'start_time': start_time.isoformat(),
            'end_time': end_time.isoformat(),
            'duration_seconds': (end_time - start_time).total_seconds()
        }
        
        # Log ingestion
        adapter.log_ingestion(
            source=source,
            endpoint="batch_property_fetch",
            records_processed=total_processed,
            records_successful=total_successful,
            records_failed=total_failed,
            start_time=start_time,
            end_time=end_time,
            status=result['status']
        )
        
        self.logger.info(f"Completed ingestion from {source}: {result}")
        
        return result
    
    def run_city_wide_ingestion(
        self,
        city: str,
        state: str,
        sources: List[str] = None
    ) -> Dict[str, Any]:
        """
        Run city-wide data ingestion.
        
        Args:
            city: City name
            state: State code
            sources: List of sources to use
            
        Returns:
            Summary of ingestion results
        """
        if sources is None:
            sources = ['attom', 'rentcast']
        
        self.current_run_id = f"city_run_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        self.start_time = datetime.now()
        
        self.logger.info(f"Starting city-wide ingestion for {city}, {state}")
        
        results = {
            'run_id': self.current_run_id,
            'city': city,
            'state': state,
            'start_time': self.start_time.isoformat(),
            'source_results': {},
            'summary': {}
        }
        
        for source in sources:
            if source not in self.adapters:
                continue
            
            try:
                if source == 'attom':
                    source_result = self._ingest_attom_city_wide(city, state)
                elif source == 'rentcast':
                    source_result = self._ingest_rentcast_city_wide(city, state)
                else:
                    continue
                
                results['source_results'][source] = source_result
                
            except Exception as e:
                self.logger.error(f"Failed city-wide ingestion from {source}: {str(e)}")
                results['source_results'][source] = {
                    'status': 'failed',
                    'error': str(e)
                }
        
        end_time = datetime.now()
        results['end_time'] = end_time.isoformat()
        results['duration_seconds'] = (end_time - self.start_time).total_seconds()
        
        return results
    
    def _ingest_attom_city_wide(self, city: str, state: str) -> Dict[str, Any]:
        """Ingest all ATTOM properties for a city."""
        adapter = self.adapters['attom']
        start_time = datetime.now()
        
        self.logger.info(f"Fetching all ATTOM properties for {city}, {state}")
        
        # Fetch recent properties (last 30 days)
        end_date = datetime.now()
        start_date = end_date - timedelta(days=30)
        
        properties = adapter.fetch_all_properties_in_city(
            city=city,
            state=state,
            start_date=start_date.strftime('%Y-%m-%d'),
            end_date=end_date.strftime('%Y-%m-%d')
        )
        
        # Transform and save
        successful = 0
        failed = 0
        
        for prop in properties:
            try:
                canonical = adapter.transform_to_canonical(prop)
                if adapter.validate_data(canonical):
                    adapter.save_to_database(
                        adapter._get_target_table(),
                        canonical,
                        adapter._get_conflict_columns()
                    )
                    successful += 1
                else:
                    failed += 1
            except Exception as e:
                failed += 1
                self.logger.error(f"Failed to process property: {str(e)}")
        
        end_time = datetime.now()
        
        return {
            'status': 'completed' if failed == 0 else 'partial_success',
            'records_processed': len(properties),
            'records_successful': successful,
            'records_failed': failed,
            'start_time': start_time.isoformat(),
            'end_time': end_time.isoformat(),
            'duration_seconds': (end_time - start_time).total_seconds()
        }
    
    def _ingest_rentcast_city_wide(self, city: str, state: str) -> Dict[str, Any]:
        """Ingest all RentCast properties and listings for a city."""
        adapter = self.adapters['rentcast']
        listings_adapter = self.adapters['rentcast_listings']
        start_time = datetime.now()
        
        self.logger.info(f"Fetching all RentCast data for {city}, {state}")
        
        # Fetch properties
        properties = adapter.fetch_all_properties_in_city(city, state)
        
        # Transform and save properties
        prop_successful = 0
        prop_failed = 0
        
        for prop in properties:
            try:
                canonical = adapter.transform_to_canonical(prop)
                if adapter.validate_data(canonical):
                    adapter.save_to_database(
                        adapter._get_target_table(),
                        canonical,
                        adapter._get_conflict_columns()
                    )
                    prop_successful += 1
                else:
                    prop_failed += 1
            except Exception as e:
                prop_failed += 1
                self.logger.error(f"Failed to process property: {str(e)}")
        
        # Fetch rental listings
        listings = listings_adapter.fetch_and_save_listings(city, state)
        
        end_time = datetime.now()
        
        return {
            'status': 'completed' if prop_failed == 0 else 'partial_success',
            'properties_processed': len(properties),
            'properties_successful': prop_successful,
            'properties_failed': prop_failed,
            'listings_saved': listings,
            'start_time': start_time.isoformat(),
            'end_time': end_time.isoformat(),
            'duration_seconds': (end_time - start_time).total_seconds()
        }
    
    def run_census_update(
        self,
        state_fips: str,
        county_fips: str
    ) -> Dict[str, Any]:
        """
        Update census data for a specific county.
        
        Args:
            state_fips: State FIPS code
            county_fips: County FIPS code
            
        Returns:
            Summary of census update results
        """
        adapter = self.adapters['census']
        start_time = datetime.now()
        
        self.logger.info(f"Updating census data for state {state_fips}, county {county_fips}")
        
        # Fetch all tracts for the county
        tracts = adapter.fetch_tract_data(state_fips, county_fips)
        
        # Transform and save
        successful = 0
        failed = 0
        
        for tract in tracts:
            try:
                canonical = adapter.transform_to_canonical(tract)
                if adapter.validate_data(canonical):
                    adapter.save_to_database(
                        adapter._get_target_table(),
                        canonical,
                        adapter._get_conflict_columns()
                    )
                    successful += 1
                else:
                    failed += 1
            except Exception as e:
                failed += 1
                self.logger.error(f"Failed to process tract: {str(e)}")
        
        end_time = datetime.now()
        
        return {
            'status': 'completed' if failed == 0 else 'partial_success',
            'tracts_processed': len(tracts),
            'tracts_successful': successful,
            'tracts_failed': failed,
            'start_time': start_time.isoformat(),
            'end_time': end_time.isoformat(),
            'duration_seconds': (end_time - start_time).total_seconds()
        }
    
    def run_geographic_enrichment(
        self,
        property_ids: List[str] = None
    ) -> Dict[str, Any]:
        """
        Run geographic enrichment for properties.
        
        Args:
            property_ids: List of property IDs to enrich (all if None)
            
        Returns:
            Summary of enrichment results
        """
        start_time = datetime.now()
        
        self.logger.info("Starting geographic enrichment")
        
        # This would query properties from database and enrich them
        # For now, return placeholder result
        
        end_time = datetime.now()
        
        return {
            'status': 'completed',
            'properties_processed': 0,
            'properties_enriched': 0,
            'start_time': start_time.isoformat(),
            'end_time': end_time.isoformat(),
            'duration_seconds': (end_time - start_time).total_seconds()
        }
    
    def get_budget_summary(self) -> Dict[str, Any]:
        """Get current budget and usage summary."""
        return self.budget_manager.get_usage_summary()
    
    def _log_pipeline_results(self, results: Dict[str, Any]) -> None:
        """Log pipeline results for monitoring."""
        self.logger.info(f"Pipeline Run {results['run_id']} Results:")
        self.logger.info(f"  Duration: {results['duration_seconds']:.2f}s")
        self.logger.info(f"  Total Properties: {results['total_properties']}")
        self.logger.info(f"  Successful: {results['summary']['total_successful']}")
        self.logger.info(f"  Failed: {results['summary']['total_failed']}")
        self.logger.info(f"  Success Rate: {results['summary']['success_rate']:.2%}")
        
        for source, source_result in results['source_results'].items():
            self.logger.info(f"  {source}: {source_result['status']}")


def create_sample_pipeline_config() -> PipelineConfig:
    """Create a sample pipeline configuration for testing."""
    return PipelineConfig(
        database_url="postgresql://user:password@localhost:5432/qurasion",
        attom_api_key="your_attom_api_key",
        rentcast_api_key="your_rentcast_api_key",
        census_api_key=None,  # Census API is free
        monthly_budget_usd=1000.0,
        enable_caching=True,
        log_level="INFO"
    )


if __name__ == "__main__":
    # Example usage
    config = create_sample_pipeline_config()
    pipeline = DataIngestionPipeline(config)
    
    # Sample property list
    sample_properties = [
        {
            'address': '123 Main St',
            'city': 'Dallas',
            'state_code': 'TX',
            'zip': '75201'
        },
        {
            'address': '456 Oak Ave',
            'city': 'Dallas',
            'state_code': 'TX',
            'zip': '75202'
        }
    ]
    
    # Run property ingestion
    results = pipeline.run_property_ingestion(sample_properties)
    print(json.dumps(results, indent=2))