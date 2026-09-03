"""
Base Adapter Architecture for Data Source Integration
Provides common functionality for all data source adapters
"""

from abc import ABC, abstractmethod
from typing import Dict, Any, Optional, List, Tuple
import requests
import pandas as pd
import json
import time
from datetime import datetime, timedelta
from dataclasses import dataclass
import logging
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
import hashlib

@dataclass
class APIResponse:
    """Standardized API response structure"""
    success: bool
    data: Optional[Dict[str, Any]] = None
    error: Optional[str] = None
    status_code: Optional[int] = None
    rate_limited: bool = False
    retry_after: Optional[int] = None

@dataclass
class IngestionResult:
    """Standardized ingestion result structure"""
    source: str
    records_processed: int
    records_successful: int
    records_failed: int
    start_time: datetime
    end_time: datetime
    status: str
    error_message: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None

class BaseAdapter(ABC):
    """
    Abstract base class for all data source adapters.
    
    Provides common functionality:
    - API request handling with rate limiting
    - Error handling and retry logic
    - Data validation and transformation
    - Database operations
    - Logging and monitoring
    """
    
    def __init__(self, config: Dict[str, Any]):
        """
        Initialize the adapter with configuration.
        
        Args:
            config: Configuration dictionary containing:
                - api_key: API authentication key
                - base_url: Base URL for API
                - database_url: Database connection string
                - rate_limit: Requests per second limit
                - timeout: Request timeout in seconds
        """
        self.config = config
        self.api_key = config.get('api_key')
        self.base_url = config.get('base_url')
        self.rate_limit = config.get('rate_limit', 10)
        self.timeout = config.get('timeout', 30)
        self.logger = self._setup_logger()
        
        # Database connection
        self.engine = create_engine(config.get('database_url'))
        self.Session = sessionmaker(bind=self.engine)
        
        # Rate limiting
        self.last_request_time = 0
        self.request_count = 0
        
    def _setup_logger(self) -> logging.Logger:
        """Setup logging for the adapter."""
        logger = logging.getLogger(self.__class__.__name__)
        logger.setLevel(logging.INFO)
        
        if not logger.handlers:
            handler = logging.StreamHandler()
            formatter = logging.Formatter(
                '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
            )
            handler.setFormatter(formatter)
            logger.addHandler(handler)
        
        return logger
    
    def _rate_limit(self) -> None:
        """Apply rate limiting to API requests."""
        current_time = time.time()
        time_since_last_request = current_time - self.last_request_time
        min_interval = 1.0 / self.rate_limit
        
        if time_since_last_request < min_interval:
            sleep_time = min_interval - time_since_last_request
            time.sleep(sleep_time)
        
        self.last_request_time = time.time()
        self.request_count += 1
    
    def _make_request(
        self,
        endpoint: str,
        params: Optional[Dict[str, Any]] = None,
        headers: Optional[Dict[str, str]] = None,
        method: str = 'GET'
    ) -> APIResponse:
        """
        Make HTTP request with rate limiting and error handling.
        
        Args:
            endpoint: API endpoint path
            params: Query parameters
            headers: Request headers
            method: HTTP method
            
        Returns:
            APIResponse object
        """
        self._rate_limit()
        
        url = f"{self.base_url}{endpoint}"
        default_headers = self._get_default_headers()
        if headers:
            default_headers.update(headers)
        
        try:
            response = requests.request(
                method=method,
                url=url,
                params=params,
                headers=default_headers,
                timeout=self.timeout
            )
            
            return self._handle_response(response)
            
        except requests.exceptions.Timeout:
            self.logger.error(f"Request timeout for {url}")
            return APIResponse(
                success=False,
                error="Request timeout",
                status_code=None
            )
        except requests.exceptions.RequestException as e:
            self.logger.error(f"Request failed for {url}: {str(e)}")
            return APIResponse(
                success=False,
                error=str(e),
                status_code=None
            )
    
    def _handle_response(self, response: requests.Response) -> APIResponse:
        """Handle API response with proper error handling."""
        if response.status_code == 429:
            retry_after = int(response.headers.get('Retry-After', 60))
            self.logger.warning(f"Rate limited. Retry after {retry_after} seconds")
            return APIResponse(
                success=False,
                error="Rate limit exceeded",
                status_code=429,
                rate_limited=True,
                retry_after=retry_after
            )
        
        if response.status_code == 401:
            self.logger.error("Authentication failed")
            return APIResponse(
                success=False,
                error="Authentication failed",
                status_code=401
            )
        
        if response.status_code == 404:
            self.logger.info("Resource not found")
            return APIResponse(
                success=False,
                error="Resource not found",
                status_code=404
            )
        
        if response.status_code >= 400:
            self.logger.error(f"API error: {response.status_code}")
            return APIResponse(
                success=False,
                error=f"API error: {response.status_code}",
                status_code=response.status_code
            )
        
        try:
            data = response.json()
            return APIResponse(
                success=True,
                data=data,
                status_code=response.status_code
            )
        except ValueError as e:
            self.logger.error(f"Failed to parse JSON response: {str(e)}")
            return APIResponse(
                success=False,
                error="Failed to parse JSON response",
                status_code=response.status_code
            )
    
    @abstractmethod
    def _get_default_headers(self) -> Dict[str, str]:
        """Get default headers for API requests."""
        pass
    
    @abstractmethod
    def fetch_property(self, property_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Fetch property data from the source."""
        pass
    
    @abstractmethod
    def transform_to_canonical(self, raw_data: Dict[str, Any]) -> Dict[str, Any]:
        """Transform raw data to canonical format."""
        pass
    
    @abstractmethod
    def validate_data(self, data: Dict[str, Any]) -> bool:
        """Validate data quality."""
        pass
    
    def fetch_with_retry(
        self,
        endpoint: str,
        params: Optional[Dict[str, Any]] = None,
        max_retries: int = 3,
        backoff_factor: float = 1.0
    ) -> APIResponse:
        """
        Fetch data with retry logic.
        
        Args:
            endpoint: API endpoint
            params: Query parameters
            max_retries: Maximum number of retries
            backoff_factor: Exponential backoff factor
            
        Returns:
            APIResponse object
        """
        for attempt in range(max_retries):
            response = self._make_request(endpoint, params)
            
            if response.success:
                return response
            
            if response.rate_limited:
                retry_after = response.retry_after or 60
                self.logger.info(f"Rate limited, waiting {retry_after} seconds")
                time.sleep(retry_after)
                continue
            
            if attempt < max_retries - 1:
                wait_time = backoff_factor * (2 ** attempt)
                self.logger.info(f"Retry {attempt + 1}/{max_retries} after {wait_time}s")
                time.sleep(wait_time)
        
        return response
    
    def generate_property_id(self, address: str, city: str, state_code: str) -> str:
        """
        Generate a consistent property ID from address components.
        
        Args:
            address: Street address
            city: City name
            state_code: State code
            
        Returns:
            Unique property ID
        """
        normalized = f"{address.lower()}_{city.lower()}_{state_code.lower()}"
        hash_value = hashlib.md5(normalized.encode()).hexdigest()[:12]
        return f"PROP_{hash_value.upper()}"
    
    def save_to_database(
        self,
        table_name: str,
        data: Dict[str, Any],
        conflict_columns: List[str] = None
    ) -> bool:
        """
        Save data to database with upsert capability.
        
        Args:
            table_name: Target table name
            data: Data to insert/update
            conflict_columns: Columns for conflict detection
            
        Returns:
            Success status
        """
        session = self.Session()
        try:
            # Create INSERT ... ON CONFLICT query
            columns = list(data.keys())
            values = list(data.values())
            placeholders = [f":{col}" for col in columns]
            
            insert_sql = f"""
                INSERT INTO {table_name} ({', '.join(columns)})
                VALUES ({', '.join(placeholders)})
            """
            
            if conflict_columns:
                conflict_clause = f"ON CONFLICT ({', '.join(conflict_columns)}) DO UPDATE SET "
                update_clause = ", ".join([f"{col} = EXCLUDED.{col}" for col in columns if col not in conflict_columns])
                insert_sql += f" {conflict_clause} {update_clause}"
            
            session.execute(text(insert_sql), data)
            session.commit()
            
            self.logger.info(f"Successfully saved data to {table_name}")
            return True
            
        except Exception as e:
            session.rollback()
            self.logger.error(f"Failed to save to database: {str(e)}")
            return False
        finally:
            session.close()
    
    def log_ingestion(
        self,
        source: str,
        endpoint: str,
        records_processed: int,
        records_successful: int,
        records_failed: int,
        start_time: datetime,
        end_time: datetime,
        status: str,
        error_message: Optional[str] = None,
        metadata: Optional[Dict[str, Any]] = None
    ) -> None:
        """
        Log ingestion metadata to database.
        
        Args:
            source: Data source name
            endpoint: API endpoint used
            records_processed: Total records processed
            records_successful: Successfully processed records
            records_failed: Failed records
            start_time: Ingestion start time
            end_time: Ingestion end time
            status: Ingestion status
            error_message: Error message if failed
            metadata: Additional metadata
        """
        session = self.Session()
        try:
            log_data = {
                'source': source,
                'endpoint': endpoint,
                'records_processed': records_processed,
                'records_successful': records_successful,
                'records_failed': records_failed,
                'start_time': start_time,
                'end_time': end_time,
                'status': status,
                'error_message': error_message,
                'metadata': json.dumps(metadata) if metadata else None
            }
            
            session.execute(
                text("""
                    INSERT INTO data_ingestion_log 
                    (source, endpoint, records_processed, records_successful, 
                     records_failed, start_time, end_time, status, error_message, metadata)
                    VALUES 
                    (:source, :endpoint, :records_processed, :records_successful,
                     :records_failed, :start_time, :end_time, :status, :error_message, :metadata)
                """),
                log_data
            )
            session.commit()
            
        except Exception as e:
            session.rollback()
            self.logger.error(f"Failed to log ingestion: {str(e)}")
        finally:
            session.close()
    
    def calculate_data_quality_score(self, data: Dict[str, Any]) -> float:
        """
        Calculate data quality score based on field completeness.
        
        Args:
            data: Data to evaluate
            
        Returns:
            Quality score between 0.0 and 1.0
        """
        critical_fields = [
            'address', 'city', 'state_code', 'property_id',
            'living_area_sqft', 'year_built', 'bedrooms', 'bathrooms'
        ]
        
        optional_fields = [
            'latitude', 'longitude', 'lot_size_sqft', 'garage',
            'pool', 'tax_assessed_value', 'last_sale_price'
        ]
        
        critical_complete = sum(1 for field in critical_fields if data.get(field) is not None)
        optional_complete = sum(1 for field in optional_fields if data.get(field) is not None)
        
        critical_score = critical_complete / len(critical_fields)
        optional_score = optional_complete / len(optional_fields)
        
        # Weight critical fields more heavily
        quality_score = (critical_score * 0.7) + (optional_score * 0.3)
        
        return round(quality_score, 2)
    
    def archive_raw_response(
        self,
        source: str,
        response_data: Dict[str, Any],
        property_id: str
    ) -> None:
        """
        Archive raw API response for audit trail.
        
        Args:
            source: Data source name
            response_data: Raw API response
            property_id: Property identifier
        """
        # In production, this would save to object storage (S3, GCS, etc.)
        # For now, we'll just log it
        archive_data = {
            'source': source,
            'property_id': property_id,
            'timestamp': datetime.now().isoformat(),
            'response': response_data
        }
        
        self.logger.info(f"Archived raw response for {property_id} from {source}")
    
    def batch_fetch_properties(
        self,
        property_list: List[Dict[str, Any]],
        batch_size: int = 100
    ) -> List[IngestionResult]:
        """
        Fetch multiple properties in batches.
        
        Args:
            property_list: List of property data dictionaries
            batch_size: Number of properties per batch
            
        Returns:
            List of ingestion results
        """
        results = []
        total_batches = (len(property_list) + batch_size - 1) // batch_size
        
        for i in range(0, len(property_list), batch_size):
            batch = property_list[i:i + batch_size]
            batch_num = (i // batch_size) + 1
            
            self.logger.info(f"Processing batch {batch_num}/{total_batches}")
            
            batch_result = self._process_batch(batch)
            results.append(batch_result)
            
            # Brief pause between batches
            if batch_num < total_batches:
                time.sleep(1)
        
        return results
    
    def _process_batch(self, batch: List[Dict[str, Any]]) -> IngestionResult:
        """Process a batch of properties."""
        start_time = datetime.now()
        records_processed = len(batch)
        records_successful = 0
        records_failed = 0
        
        for property_data in batch:
            try:
                # Fetch from source
                raw_data = self.fetch_property(property_data)
                
                if raw_data:
                    # Transform to canonical format
                    canonical_data = self.transform_to_canonical(raw_data)
                    
                    # Validate data
                    if self.validate_data(canonical_data):
                        # Save to database
                        if self.save_to_database(
                            self._get_target_table(),
                            canonical_data,
                            self._get_conflict_columns()
                        ):
                            records_successful += 1
                        else:
                            records_failed += 1
                    else:
                        records_failed += 1
                        self.logger.warning(f"Data validation failed for property")
                else:
                    records_failed += 1
                    
            except Exception as e:
                records_failed += 1
                self.logger.error(f"Failed to process property: {str(e)}")
        
        end_time = datetime.now()
        status = "completed" if records_failed == 0 else "partial_success"
        
        return IngestionResult(
            source=self.__class__.__name__,
            records_processed=records_processed,
            records_successful=records_successful,
            records_failed=records_failed,
            start_time=start_time,
            end_time=end_time,
            status=status
        )
    
    @abstractmethod
    def _get_target_table(self) -> str:
        """Get the target database table for this adapter."""
        pass
    
    @abstractmethod
    def _get_conflict_columns(self) -> List[str]:
        """Get columns for conflict detection in upsert operations."""
        pass


class APIBudgetManager:
    """Manage API usage and costs across adapters."""
    
    def __init__(self, monthly_budget_usd: float):
        self.monthly_budget = monthly_budget_usd
        self.current_spend = 0.0
        self.request_costs = {
            'attom': 0.001,  # $0.001 per request
            'rentcast': 0.0005,  # $0.0005 per request
            'census': 0.0,  # Free
            'fhfa': 0.0,  # Free
            'redfin': 0.0  # Free (downloaded data)
        }
        self.request_counts = {source: 0 for source in self.request_costs}
        self._setup_logger()
    
    def _setup_logger(self) -> None:
        """Setup logger for budget manager."""
        self.logger = logging.getLogger('APIBudgetManager')
        self.logger.setLevel(logging.INFO)
        
        if not self.logger.handlers:
            handler = logging.StreamHandler()
            formatter = logging.Formatter(
                '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
            )
            handler.setFormatter(formatter)
            self.logger.addHandler(handler)
    
    def can_make_request(self, source: str) -> bool:
        """Check if budget allows request."""
        cost = self.request_costs.get(source, 0)
        return (self.current_spend + cost) <= self.monthly_budget
    
    def track_request(self, source: str) -> None:
        """Track request cost."""
        cost = self.request_costs.get(source, 0)
        self.current_spend += cost
        self.request_counts[source] += 1
        
        if self.current_spend > self.monthly_budget * 0.9:
            self.logger.warning("90% of API budget consumed")
    
    def get_usage_summary(self) -> Dict[str, Any]:
        """Get current usage summary."""
        return {
            'monthly_budget': self.monthly_budget,
            'current_spend': self.current_spend,
            'remaining_budget': self.monthly_budget - self.current_spend,
            'budget_utilization': (self.current_spend / self.monthly_budget) * 100,
            'request_counts': self.request_counts
        }


class DataCache:
    """Cache API responses to reduce costs and improve performance."""
    
    def __init__(self, redis_host: str = 'localhost', redis_port: int = 6379):
        self._setup_logger()
        
        try:
            import redis
            self.redis_client = redis.Redis(host=redis_host, port=redis_port, db=0)
            self.cache_available = True
        except ImportError:
            self.logger.warning("Redis not available, caching disabled")
            self.cache_available = False
            self.redis_client = None
    
    def _setup_logger(self) -> None:
        """Setup logger for cache."""
        self.logger = logging.getLogger('DataCache')
        self.logger.setLevel(logging.INFO)
        
        if not self.logger.handlers:
            handler = logging.StreamHandler()
            formatter = logging.Formatter(
                '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
            )
            handler.setFormatter(formatter)
            self.logger.addHandler(handler)
        
        self.cache_durations = {
            'property_details': timedelta(days=7),
            'sales_history': timedelta(days=30),
            'census_data': timedelta(days=365),
            'market_data': timedelta(days=1),
            'rental_listings': timedelta(days=1)
        }
    
    def get_cached_data(self, cache_key: str, data_type: str) -> Optional[Dict[str, Any]]:
        """Retrieve cached data if available."""
        if not self.cache_available:
            return None
        
        try:
            cached = self.redis_client.get(cache_key)
            if cached:
                return json.loads(cached)
        except Exception as e:
            self.logger.error(f"Cache retrieval failed: {str(e)}")
        
        return None
    
    def cache_data(self, cache_key: str, data: Dict[str, Any], data_type: str) -> None:
        """Cache data with appropriate TTL."""
        if not self.cache_available:
            return
        
        try:
            duration = self.cache_durations.get(data_type, timedelta(days=1))
            self.redis_client.setex(
                cache_key,
                int(duration.total_seconds()),
                json.dumps(data)
            )
        except Exception as e:
            self.logger.error(f"Cache write failed: {str(e)}")
    
    def generate_cache_key(self, source: str, **kwargs) -> str:
        """Generate consistent cache key."""
        key_parts = [source]
        for key, value in sorted(kwargs.items()):
            key_parts.append(f"{key}:{value}")
        return ":".join(key_parts)