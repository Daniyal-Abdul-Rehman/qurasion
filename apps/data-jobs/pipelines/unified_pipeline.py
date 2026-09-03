"""
Unified Data Ingestion Pipeline
Orchestrates data ingestion across all phases and data sources
"""

from typing import Dict, Any, List, Optional
from datetime import datetime, timedelta
from enum import Enum
import logging
from dataclasses import dataclass, field

from sources.base_adapter import BaseAdapter, IngestionResult
from sources.attom_adapter import ATTOMAdapter, ATTOMSalesHistoryAdapter
from sources.rentcast_adapter import RentCastAdapter, RentCastListingsAdapter
from sources.census_adapter import CensusAdapter, CensusGeographicEnrichment
from sources.fhfa_adapter import FHFAAdapter
from sources.redfin_adapter import RedfinAdapter
from sources.permit_adapter import PermitAdapter
from sources.environmental_adapter import EnvironmentalAdapter
from monitoring.data_quality_monitor import DataQualityMonitor
from config.config_manager import ConfigManager, PipelineConfig

class PipelinePhase(Enum):
    """Pipeline execution phases"""
    PHASE_1_PROPERTY_DATA = "phase_1_property_data"
    PHASE_2_TRANSACTION_DATA = "phase_2_transaction_data"
    PHASE_3_MARKET_DATA = "phase_3_market_data"
    PHASE_4_GEOGRAPHIC_DATA = "phase_4_geographic_data"
    PHASE_5_SPECIALIZED_DATA = "phase_5_specialized_data"

class ExecutionMode(Enum):
    """Pipeline execution modes"""
    PROPERTY_FOCUSED = "property_focused"
    CITY_WIDE = "city_wide"
    STATE_WIDE = "state_wide"
    FULL_UPDATE = "full_update"

@dataclass
class PipelineResult:
    """Result of pipeline execution"""
    phase: PipelinePhase
    status: str
    start_time: datetime
    end_time: datetime
    duration_seconds: float
    records_processed: int
    records_successful: int
    records_failed: int
    source_results: Dict[str, Any] = field(default_factory=dict)
    errors: List[str] = field(default_factory=list)
    metadata: Dict[str, Any] = field(default_factory=dict)

class UnifiedDataPipeline:
    """
    Unified Data Ingestion Pipeline
    
    Orchestrates data ingestion across all phases:
    - Phase 1: Core Property Data (ATTOM, RentCast)
    - Phase 2: Transaction Data (Sales History, Rental Listings)
    - Phase 3: Market Data (Census, FHFA, Redfin)
    - Phase 4: Geographic Data (TIGER/Line Boundaries, Enrichment)
    - Phase 5: Specialized Data (Building Permits, Environmental Risk)
    """
    
    def __init__(self, config: PipelineConfig):
        """
        Initialize the unified pipeline.
        
        Args:
            config: Pipeline configuration
        """
        self.config = config
        self.logger = self._setup_logger()
        
        # Initialize all adapters
        self.adapters = {}
        self._initialize_adapters()
        
        # Initialize monitoring
        self.quality_monitor = DataQualityMonitor(config.database.connection_string)
        
        # Pipeline state
        self.current_run_id = None
        self.results = []
    
    def _setup_logger(self) -> logging.Logger:
        """Setup pipeline logging."""
        logger = logging.getLogger('UnifiedDataPipeline')
        logger.setLevel(getattr(logging, self.config.logging.level))
        
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
        try:
            # Phase 1 adapters
            self.adapters['attom'] = ATTOMAdapter({
                'attom_api_key': self.config.api.attom_api_key,
                'base_url': self.config.api.attom_base_url,
                'database_url': self.config.database.connection_string,
                'rate_limit': self.config.api.attom_rate_limit,
                'timeout': self.config.timeout
            })
            
            self.adapters['rentcast'] = RentCastAdapter({
                'rentcast_api_key': self.config.api.rentcast_api_key,
                'base_url': self.config.api.rentcast_base_url,
                'database_url': self.config.database.connection_string,
                'rate_limit': self.config.api.rentcast_rate_limit,
                'timeout': self.config.timeout
            })
            
            # Phase 2 adapters
            self.adapters['attom_sales'] = ATTOMSalesHistoryAdapter({
                'attom_api_key': self.config.api.attom_api_key,
                'base_url': self.config.api.attom_base_url,
                'database_url': self.config.database.connection_string,
                'rate_limit': self.config.api.attom_rate_limit,
                'timeout': self.config.timeout
            })
            
            self.adapters['rentcast_listings'] = RentCastListingsAdapter({
                'rentcast_api_key': self.config.api.rentcast_api_key,
                'base_url': self.config.api.rentcast_base_url,
                'database_url': self.config.database.connection_string,
                'rate_limit': self.config.api.rentcast_rate_limit,
                'timeout': self.config.timeout
            })
            
            # Phase 3 adapters
            self.adapters['census'] = CensusAdapter({
                'census_api_key': self.config.api.census_api_key,
                'base_url': self.config.api.census_base_url,
                'database_url': self.config.database.connection_string,
                'rate_limit': self.config.api.census_rate_limit,
                'timeout': self.config.timeout
            })
            
            self.adapters['fhfa'] = FHFAAdapter({
                'base_url': '',
                'database_url': self.config.database.connection_string,
                'rate_limit': 10,
                'timeout': 60
            })
            
            self.adapters['redfin'] = RedfinAdapter({
                'base_url': '',
                'database_url': self.config.database.connection_string,
                'rate_limit': 10,
                'timeout': 60
            })
            
            # Phase 4 adapters
            self.adapters['census_geo'] = CensusGeographicEnrichment(
                self.config.database.connection_string
            )
            
            # Phase 5 adapters
            self.adapters['permit'] = PermitAdapter({
                'base_url': '',
                'database_url': self.config.database.connection_string,
                'rate_limit': 10,
                'timeout': 30
            })
            
            self.adapters['environmental'] = EnvironmentalAdapter({
                'base_url': '',
                'database_url': self.config.database.connection_string,
                'rate_limit': 10,
                'timeout': 30
            })
            
            self.logger.info("All adapters initialized successfully")
            
        except Exception as e:
            self.logger.error(f"Failed to initialize adapters: {str(e)}")
            raise
    
    def run_phase_1_property_data(
        self,
        property_list: List[Dict[str, Any]] = None,
        city: str = None,
        state: str = None,
        mode: ExecutionMode = ExecutionMode.PROPERTY_FOCUSED
    ) -> PipelineResult:
        """
        Run Phase 1: Core Property Data ingestion.
        
        Args:
            property_list: List of properties to process (for property_focused mode)
            city: City name (for city_wide mode)
            state: State code (for city_wide mode)
            mode: Execution mode
            
        Returns:
            Pipeline result
        """
        self.current_run_id = f"phase1_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        start_time = datetime.now()
        
        self.logger.info(f"Starting Phase 1: {mode.value}")
        
        records_processed = 0
        records_successful = 0
        records_failed = 0
        source_results = {}
        errors = []
        
        try:
            if mode == ExecutionMode.PROPERTY_FOCUSED and property_list:
                # Process specific properties
                for source in ['attom', 'rentcast']:
                    if source in self.adapters:
                        adapter = self.adapters[source]
                        results = adapter.batch_fetch_properties(property_list, self.config.batch_size)
                        
                        for result in results:
                            records_processed += result.records_processed
                            records_successful += result.records_successful
                            records_failed += result.records_failed
                        
                        source_results[source] = {
                            'status': 'completed',
                            'records_processed': records_processed,
                            'records_successful': records_successful,
                            'records_failed': records_failed
                        }
            
            elif mode == ExecutionMode.CITY_WIDE and city and state:
                # City-wide ingestion
                for source in ['attom', 'rentcast']:
                    if source in self.adapters:
                        adapter = self.adapters[source]
                        properties = adapter.fetch_all_properties_in_city(city, state)
                        
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
                                errors.append(f"Failed to process property: {str(e)}")
                        
                        records_processed = len(properties)
                        records_successful += successful
                        records_failed += failed
                        
                        source_results[source] = {
                            'status': 'completed' if failed == 0 else 'partial_success',
                            'records_processed': records_processed,
                            'records_successful': successful,
                            'records_failed': failed
                        }
            
            else:
                errors.append("Invalid mode or missing parameters for Phase 1")
        
        except Exception as e:
            errors.append(f"Phase 1 execution failed: {str(e)}")
            self.logger.error(f"Phase 1 error: {str(e)}")
        
        end_time = datetime.now()
        duration = (end_time - start_time).total_seconds()
        
        result = PipelineResult(
            phase=PipelinePhase.PHASE_1_PROPERTY_DATA,
            status='completed' if not errors else 'failed',
            start_time=start_time,
            end_time=end_time,
            duration_seconds=duration,
            records_processed=records_processed,
            records_successful=records_successful,
            records_failed=records_failed,
            source_results=source_results,
            errors=errors,
            metadata={'mode': mode.value}
        )
        
        self.results.append(result)
        return result
    
    def run_phase_2_transaction_data(
        self,
        property_ids: List[str] = None,
        city: str = None,
        state: str = None
    ) -> PipelineResult:
        """
        Run Phase 2: Transaction Data ingestion.
        
        Args:
            property_ids: List of property IDs for sales history
            city: City name for rental listings
            state: State code for rental listings
            
        Returns:
            Pipeline result
        """
        self.current_run_id = f"phase2_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        start_time = datetime.now()
        
        self.logger.info("Starting Phase 2: Transaction Data")
        
        records_processed = 0
        records_successful = 0
        records_failed = 0
        source_results = {}
        errors = []
        
        try:
            # Sales history ingestion
            if property_ids:
                attom_sales_adapter = self.adapters['attom_sales']
                # This would need property_id mapping from ATTOM IDs to canonical IDs
                # For now, placeholder implementation
                self.logger.info("Sales history ingestion requires property ID mapping")
            
            # Rental listings ingestion
            if city and state:
                rentcast_listings_adapter = self.adapters['rentcast_listings']
                listings_count = rentcast_listings_adapter.fetch_and_save_listings(city, state)
                
                records_processed = listings_count
                records_successful = listings_count
                
                source_results['rentcast_listings'] = {
                    'status': 'completed',
                    'records_processed': listings_count,
                    'records_successful': listings_count,
                    'records_failed': 0
                }
        
        except Exception as e:
            errors.append(f"Phase 2 execution failed: {str(e)}")
            self.logger.error(f"Phase 2 error: {str(e)}")
        
        end_time = datetime.now()
        duration = (end_time - start_time).total_seconds()
        
        result = PipelineResult(
            phase=PipelinePhase.PHASE_2_TRANSACTION_DATA,
            status='completed' if not errors else 'failed',
            start_time=start_time,
            end_time=end_time,
            duration_seconds=duration,
            records_processed=records_processed,
            records_successful=records_successful,
            records_failed=records_failed,
            source_results=source_results,
            errors=errors
        )
        
        self.results.append(result)
        return result
    
    def run_phase_3_market_data(
        self,
        target_states: List[str] = None,
        target_msas: List[int] = None,
        state_fips: str = None,
        county_fips: str = None
    ) -> PipelineResult:
        """
        Run Phase 3: Market Data ingestion.
        
        Args:
            target_states: List of state FIPS codes for FHFA data
            target_msas: List of MSA IDs for Redfin data
            state_fips: State FIPS for Census data
            county_fips: County FIPS for Census data
            
        Returns:
            Pipeline result
        """
        self.current_run_id = f"phase3_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        start_time = datetime.now()
        
        self.logger.info("Starting Phase 3: Market Data")
        
        records_processed = 0
        records_successful = 0
        records_failed = 0
        source_results = {}
        errors = []
        
        try:
            # FHFA HPI data
            fhfa_adapter = self.adapters['fhfa']
            fhfa_count = fhfa_adapter.fetch_and_save_hpi_data('state', target_states)
            
            records_processed += fhfa_count
            records_successful += fhfa_count
            
            source_results['fhfa'] = {
                'status': 'completed',
                'records_processed': fhfa_count,
                'records_successful': fhfa_count,
                'records_failed': 0
            }
            
            # Redfin market data
            redfin_adapter = self.adapters['redfin']
            redfin_count = redfin_adapter.fetch_and_save_market_data(target_msas)
            
            records_processed += redfin_count
            records_successful += redfin_count
            
            source_results['redfin'] = {
                'status': 'completed',
                'records_processed': redfin_count,
                'records_successful': redfin_count,
                'records_failed': 0
            }
            
            # Census data
            if state_fips and county_fips:
                census_adapter = self.adapters['census']
                census_results = self._run_census_update(census_adapter, state_fips, county_fips)
                
                records_processed += census_results['tracts_processed']
                records_successful += census_results['tracts_successful']
                records_failed += census_results['tracts_failed']
                
                source_results['census'] = census_results
        
        except Exception as e:
            errors.append(f"Phase 3 execution failed: {str(e)}")
            self.logger.error(f"Phase 3 error: {str(e)}")
        
        end_time = datetime.now()
        duration = (end_time - start_time).total_seconds()
        
        result = PipelineResult(
            phase=PipelinePhase.PHASE_3_MARKET_DATA,
            status='completed' if not errors else 'failed',
            start_time=start_time,
            end_time=end_time,
            duration_seconds=duration,
            records_processed=records_processed,
            records_successful=records_successful,
            records_failed=records_failed,
            source_results=source_results,
            errors=errors
        )
        
        self.results.append(result)
        return result
    
    def run_phase_4_geographic_data(
        self,
        state_fips: str,
        load_boundaries: bool = True
    ) -> PipelineResult:
        """
        Run Phase 4: Geographic Data ingestion.
        
        Args:
            state_fips: State FIPS code
            load_boundaries: Whether to load TIGER/Line boundaries
            
        Returns:
            Pipeline result
        """
        self.current_run_id = f"phase4_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        start_time = datetime.now()
        
        self.logger.info("Starting Phase 4: Geographic Data")
        
        records_processed = 0
        records_successful = 0
        records_failed = 0
        source_results = {}
        errors = []
        
        try:
            if load_boundaries:
                census_adapter = self.adapters['census']
                
                # Download tract boundaries
                shapefile_path = census_adapter.download_tract_boundaries(state_fips)
                
                if shapefile_path:
                    # Load to database
                    loaded_count = census_adapter.load_tract_boundaries_to_db(shapefile_path, state_fips)
                    
                    records_processed = loaded_count
                    records_successful = loaded_count
                    
                    source_results['census_boundaries'] = {
                        'status': 'completed',
                        'records_processed': loaded_count,
                        'records_successful': loaded_count,
                        'records_failed': 0
                    }
                else:
                    errors.append("Failed to download census boundaries")
            
            # Geographic enrichment is handled separately
            source_results['geo_enrichment'] = {
                'status': 'available',
                'message': 'Geographic enrichment available via CensusGeographicEnrichment class'
            }
        
        except Exception as e:
            errors.append(f"Phase 4 execution failed: {str(e)}")
            self.logger.error(f"Phase 4 error: {str(e)}")
        
        end_time = datetime.now()
        duration = (end_time - start_time).total_seconds()
        
        result = PipelineResult(
            phase=PipelinePhase.PHASE_4_GEOGRAPHIC_DATA,
            status='completed' if not errors else 'failed',
            start_time=start_time,
            end_time=end_time,
            duration_seconds=duration,
            records_processed=records_processed,
            records_successful=records_successful,
            records_failed=records_failed,
            source_results=source_results,
            errors=errors
        )
        
        self.results.append(result)
        return result
    
    def run_phase_5_specialized_data(
        self,
        property_ids: List[str] = None,
        jurisdiction: str = None,
        state_fips: str = None,
        county_fips: str = None
    ) -> PipelineResult:
        """
        Run Phase 5: Specialized Data ingestion.
        
        Args:
            property_ids: List of property IDs for permit data
            jurisdiction: Jurisdiction for permit data
            state_fips: State FIPS for environmental data
            county_fips: County FIPS for environmental data
            
        Returns:
            Pipeline result
        """
        self.current_run_id = f"phase5_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        start_time = datetime.now()
        
        self.logger.info("Starting Phase 5: Specialized Data")
        
        records_processed = 0
        records_successful = 0
        records_failed = 0
        source_results = {}
        errors = []
        
        try:
            # Building permit data
            if property_ids and jurisdiction:
                permit_adapter = self.adapters['permit']
                permit_count = permit_adapter.fetch_and_save_permits(property_ids, jurisdiction)
                
                records_processed += permit_count
                records_successful += permit_count
                
                source_results['permits'] = {
                    'status': 'completed',
                    'records_processed': permit_count,
                    'records_successful': permit_count,
                    'records_failed': 0
                }
            
            # Environmental risk data
            if state_fips and county_fips:
                environmental_adapter = self.adapters['environmental']
                
                # Download flood zone data
                shapefile_path = environmental_adapter.download_flood_zone_data(state_fips, county_fips)
                
                if shapefile_path:
                    # Load to database
                    loaded_count = environmental_adapter.load_flood_zones_to_db(shapefile_path)
                    
                    records_processed += loaded_count
                    records_successful += loaded_count
                    
                    source_results['environmental'] = {
                        'status': 'completed',
                        'records_processed': loaded_count,
                        'records_successful': loaded_count,
                        'records_failed': 0
                    }
                else:
                    errors.append("Failed to download environmental data")
        
        except Exception as e:
            errors.append(f"Phase 5 execution failed: {str(e)}")
            self.logger.error(f"Phase 5 error: {str(e)}")
        
        end_time = datetime.now()
        duration = (end_time - start_time).total_seconds()
        
        result = PipelineResult(
            phase=PipelinePhase.PHASE_5_SPECIALIZED_DATA,
            status='completed' if not errors else 'failed',
            start_time=start_time,
            end_time=end_time,
            duration_seconds=duration,
            records_processed=records_processed,
            records_successful=records_successful,
            records_failed=records_failed,
            source_results=source_results,
            errors=errors
        )
        
        self.results.append(result)
        return result
    
    def run_full_pipeline(
        self,
        properties: List[Dict[str, Any]] = None,
        city: str = None,
        state: str = None,
        state_fips: str = None,
        county_fips: str = None,
        target_msas: List[int] = None,
        jurisdiction: str = None
    ) -> Dict[str, PipelineResult]:
        """
        Run the complete pipeline across all phases.
        
        Args:
            properties: List of properties for Phase 1
            city: City name for Phases 1-2
            state: State code for Phases 1-2
            state_fips: State FIPS for Phases 3-5
            county_fips: County FIPS for Phases 3-5
            target_msas: List of MSA IDs for Phase 3
            jurisdiction: Jurisdiction for Phase 5
            
        Returns:
            Dictionary of results for each phase
        """
        self.logger.info("Starting full pipeline execution")
        
        all_results = {}
        
        # Phase 1: Core Property Data
        phase1_result = self.run_phase_1_property_data(
            property_list=properties,
            city=city,
            state=state,
            mode=ExecutionMode.CITY_WIDE if city and state else ExecutionMode.PROPERTY_FOCUSED
        )
        all_results['phase_1'] = phase1_result
        
        # Phase 2: Transaction Data
        phase2_result = self.run_phase_2_transaction_data(
            city=city,
            state=state
        )
        all_results['phase_2'] = phase2_result
        
        # Phase 3: Market Data
        phase3_result = self.run_phase_3_market_data(
            target_states=[state_fips] if state_fips else None,
            target_msas=target_msas,
            state_fips=state_fips,
            county_fips=county_fips
        )
        all_results['phase_3'] = phase3_result
        
        # Phase 4: Geographic Data
        if state_fips:
            phase4_result = self.run_phase_4_geographic_data(state_fips)
            all_results['phase_4'] = phase4_result
        
        # Phase 5: Specialized Data
        if state_fips and county_fips:
            phase5_result = self.run_phase_5_specialized_data(
                jurisdiction=jurisdiction,
                state_fips=state_fips,
                county_fips=county_fips
            )
            all_results['phase_5'] = phase5_result
        
        # Run data quality checks
        if self.config.data_quality_enabled:
            self.logger.info("Running data quality checks")
            self._run_quality_checks()
        
        self.logger.info("Full pipeline execution completed")
        return all_results
    
    def _run_census_update(
        self,
        census_adapter: CensusAdapter,
        state_fips: str,
        county_fips: str
    ) -> Dict[str, Any]:
        """Run census data update."""
        tracts = census_adapter.fetch_tract_data(state_fips, county_fips)
        
        successful = 0
        failed = 0
        
        for tract in tracts:
            try:
                canonical = census_adapter.transform_to_canonical(tract)
                if census_adapter.validate_data(canonical):
                    census_adapter.save_to_database(
                        census_adapter._get_target_table(),
                        canonical,
                        census_adapter._get_conflict_columns()
                    )
                    successful += 1
                else:
                    failed += 1
            except Exception as e:
                failed += 1
        
        return {
            'status': 'completed' if failed == 0 else 'partial_success',
            'tracts_processed': len(tracts),
            'tracts_successful': successful,
            'tracts_failed': failed
        }
    
    def _run_quality_checks(self) -> None:
        """Run data quality checks on all data sources."""
        tables_to_check = [
            ('attom', 'attom_properties'),
            ('rentcast', 'rentcast_properties'),
            ('census', 'census_tract_data'),
            ('fhfa', 'fhfa_hpi_data'),
            ('redfin', 'redfin_market_data')
        ]
        
        for source, table in tables_to_check:
            try:
                quality_result = self.quality_monitor.run_quality_check(source, table)
                self.logger.info(f"{source} quality score: {quality_result['quality_score']:.2f}")
            except Exception as e:
                self.logger.error(f"Quality check failed for {source}: {str(e)}")
    
    def get_pipeline_summary(self) -> Dict[str, Any]:
        """Get summary of pipeline execution."""
        total_records_processed = sum(r.records_processed for r in self.results)
        total_records_successful = sum(r.records_successful for r in self.results)
        total_records_failed = sum(r.records_failed for r in self.results)
        total_duration = sum(r.duration_seconds for r in self.results)
        
        return {
            'run_id': self.current_run_id,
            'total_phases': len(self.results),
            'total_records_processed': total_records_processed,
            'total_records_successful': total_records_successful,
            'total_records_failed': total_records_failed,
            'success_rate': total_records_successful / total_records_processed if total_records_processed > 0 else 0,
            'total_duration_seconds': total_duration,
            'phases_completed': len([r for r in self.results if r.status == 'completed']),
            'phases_failed': len([r for r in self.results if r.status == 'failed']),
            'results': [
                {
                    'phase': r.phase.value,
                    'status': r.status,
                    'duration': r.duration_seconds,
                    'records_processed': r.records_processed,
                    'records_successful': r.records_successful,
                    'records_failed': r.records_failed
                }
                for r in self.results
            ]
        }