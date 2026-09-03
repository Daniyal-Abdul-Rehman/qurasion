"""
Configuration Management System
Handles environment variables, API keys, and application settings
"""

import os
import json
from typing import Dict, Any, Optional
from dataclasses import dataclass, field
from pathlib import Path
import logging

@dataclass
class DatabaseConfig:
    """Database configuration"""
    host: str = "localhost"
    port: int = 5432
    database: str = "qurasion"
    username: str = "postgres"
    password: str = ""
    ssl_mode: str = "prefer"
    
    @property
    def connection_string(self) -> str:
        """Generate database connection string"""
        return f"postgresql://{self.username}:{self.password}@{self.host}:{self.port}/{self.database}?sslmode={self.ssl_mode}"

@dataclass
class APIConfig:
    """API configuration for data sources"""
    attom_api_key: str = ""
    attom_base_url: str = "https://api.developer.attomdata.com"
    attom_rate_limit: int = 10
    
    rentcast_api_key: str = ""
    rentcast_base_url: str = "https://api.rentcast.io/v1"
    rentcast_rate_limit: int = 100
    
    census_api_key: str = ""  # Optional, Census API is mostly free
    census_base_url: str = "https://api.census.gov/data"
    census_rate_limit: int = 50

@dataclass
class CacheConfig:
    """Cache configuration"""
    enabled: bool = True
    redis_host: str = "localhost"
    redis_port: int = 6379
    redis_db: int = 0
    redis_password: str = ""

@dataclass
class BudgetConfig:
    """Budget management configuration"""
    monthly_budget_usd: float = 1000.0
    alert_threshold_percent: float = 90.0
    request_costs: Dict[str, float] = field(default_factory=lambda: {
        'attom': 0.001,
        'rentcast': 0.0005,
        'census': 0.0,
        'fhfa': 0.0,
        'redfin': 0.0
    })

@dataclass
class LoggingConfig:
    """Logging configuration"""
    level: str = "INFO"
    format: str = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    log_file: Optional[str] = None
    max_bytes: int = 10485760  # 10MB
    backup_count: int = 5

@dataclass
class PipelineConfig:
    """Main pipeline configuration"""
    database: DatabaseConfig = field(default_factory=DatabaseConfig)
    api: APIConfig = field(default_factory=APIConfig)
    cache: CacheConfig = field(default_factory=CacheConfig)
    budget: BudgetConfig = field(default_factory=BudgetConfig)
    logging: LoggingConfig = field(default_factory=LoggingConfig)
    
    # Pipeline settings
    batch_size: int = 100
    max_retries: int = 3
    retry_backoff: float = 1.0
    timeout: int = 30
    
    # Data quality settings
    data_quality_enabled: bool = True
    quality_check_interval_hours: int = 24
    
    # Geographic enrichment
    geo_enrichment_enabled: bool = True
    postgis_enabled: bool = False

class ConfigManager:
    """
    Configuration Manager
    
    Loads configuration from:
    1. Environment variables
    2. Configuration files (JSON/YAML)
    3. Default values
    """
    
    def __init__(self, config_file: Optional[str] = None):
        """
        Initialize configuration manager.
        
        Args:
            config_file: Path to configuration file (optional)
        """
        self.logger = self._setup_logger()
        self.config_file = config_file
        self.config = self._load_config()
    
    def _setup_logger(self) -> logging.Logger:
        """Setup basic logger."""
        logger = logging.getLogger('ConfigManager')
        logger.setLevel(logging.INFO)
        
        if not logger.handlers:
            handler = logging.StreamHandler()
            formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
            handler.setFormatter(formatter)
            logger.addHandler(handler)
        
        return logger
    
    def _load_config(self) -> PipelineConfig:
        """Load configuration from all sources."""
        # Start with defaults
        config_dict = {}
        
        # Load from file if provided
        if self.config_file and os.path.exists(self.config_file):
            file_config = self._load_from_file(self.config_file)
            config_dict.update(file_config)
            self.logger.info(f"Loaded configuration from {self.config_file}")
        
        # Override with environment variables
        env_config = self._load_from_environment()
        self._merge_config(config_dict, env_config)
        
        # Create configuration objects
        return self._create_config_objects(config_dict)
    
    def _load_from_file(self, config_file: str) -> Dict[str, Any]:
        """Load configuration from file."""
        try:
            with open(config_file, 'r') as f:
                if config_file.endswith('.json'):
                    return json.load(f)
                else:
                    # Assume JSON format for now
                    return json.load(f)
        except Exception as e:
            self.logger.warning(f"Failed to load config file: {str(e)}")
            return {}
    
    def _load_from_environment(self) -> Dict[str, Any]:
        """Load configuration from environment variables."""
        env_config = {}
        
        # Database configuration
        if os.getenv('DB_HOST'):
            env_config['database'] = env_config.get('database', {})
            env_config['database']['host'] = os.getenv('DB_HOST')
        if os.getenv('DB_PORT'):
            env_config['database'] = env_config.get('database', {})
            env_config['database']['port'] = int(os.getenv('DB_PORT'))
        if os.getenv('DB_NAME'):
            env_config['database'] = env_config.get('database', {})
            env_config['database']['database'] = os.getenv('DB_NAME')
        if os.getenv('DB_USER'):
            env_config['database'] = env_config.get('database', {})
            env_config['database']['username'] = os.getenv('DB_USER')
        if os.getenv('DB_PASSWORD'):
            env_config['database'] = env_config.get('database', {})
            env_config['database']['password'] = os.getenv('DB_PASSWORD')
        
        # API configuration
        if os.getenv('ATTOM_API_KEY'):
            env_config['api'] = env_config.get('api', {})
            env_config['api']['attom_api_key'] = os.getenv('ATTOM_API_KEY')
        if os.getenv('RENTCAST_API_KEY'):
            env_config['api'] = env_config.get('api', {})
            env_config['api']['rentcast_api_key'] = os.getenv('RENTCAST_API_KEY')
        if os.getenv('CENSUS_API_KEY'):
            env_config['api'] = env_config.get('api', {})
            env_config['api']['census_api_key'] = os.getenv('CENSUS_API_KEY')
        
        # Cache configuration
        if os.getenv('REDIS_HOST'):
            env_config['cache'] = env_config.get('cache', {})
            env_config['cache']['redis_host'] = os.getenv('REDIS_HOST')
        if os.getenv('REDIS_PORT'):
            env_config['cache'] = env_config.get('cache', {})
            env_config['cache']['redis_port'] = int(os.getenv('REDIS_PORT'))
        if os.getenv('REDIS_PASSWORD'):
            env_config['cache'] = env_config.get('cache', {})
            env_config['cache']['redis_password'] = os.getenv('REDIS_PASSWORD')
        
        # Budget configuration
        if os.getenv('MONTHLY_BUDGET_USD'):
            env_config['budget'] = env_config.get('budget', {})
            env_config['budget']['monthly_budget_usd'] = float(os.getenv('MONTHLY_BUDGET_USD'))
        
        # Logging configuration
        if os.getenv('LOG_LEVEL'):
            env_config['logging'] = env_config.get('logging', {})
            env_config['logging']['level'] = os.getenv('LOG_LEVEL')
        if os.getenv('LOG_FILE'):
            env_config['logging'] = env_config.get('logging', {})
            env_config['logging']['log_file'] = os.getenv('LOG_FILE')
        
        # Pipeline settings
        if os.getenv('BATCH_SIZE'):
            env_config['batch_size'] = int(os.getenv('BATCH_SIZE'))
        if os.getenv('MAX_RETRIES'):
            env_config['max_retries'] = int(os.getenv('MAX_RETRIES'))
        
        return env_config
    
    def _merge_config(self, base_config: Dict[str, Any], override_config: Dict[str, Any]) -> None:
        """Recursively merge configuration dictionaries."""
        for key, value in override_config.items():
            if key in base_config and isinstance(base_config[key], dict) and isinstance(value, dict):
                self._merge_config(base_config[key], value)
            else:
                base_config[key] = value
    
    def _create_config_objects(self, config_dict: Dict[str, Any]) -> PipelineConfig:
        """Create configuration objects from dictionary."""
        # Extract nested configurations
        db_dict = config_dict.get('database', {})
        api_dict = config_dict.get('api', {})
        cache_dict = config_dict.get('cache', {})
        budget_dict = config_dict.get('budget', {})
        logging_dict = config_dict.get('logging', {})
        
        # Create configuration objects
        database_config = DatabaseConfig(**db_dict)
        api_config = APIConfig(**api_dict)
        cache_config = CacheConfig(**cache_dict)
        budget_config = BudgetConfig(**budget_dict)
        logging_config = LoggingConfig(**logging_dict)
        
        # Extract pipeline-level settings
        pipeline_settings = {
            'batch_size': config_dict.get('batch_size', 100),
            'max_retries': config_dict.get('max_retries', 3),
            'retry_backoff': config_dict.get('retry_backoff', 1.0),
            'timeout': config_dict.get('timeout', 30),
            'data_quality_enabled': config_dict.get('data_quality_enabled', True),
            'quality_check_interval_hours': config_dict.get('quality_check_interval_hours', 24),
            'geo_enrichment_enabled': config_dict.get('geo_enrichment_enabled', True),
            'postgis_enabled': config_dict.get('postgis_enabled', False)
        }
        
        return PipelineConfig(
            database=database_config,
            api=api_config,
            cache=cache_config,
            budget=budget_config,
            logging=logging_config,
            **pipeline_settings
        )
    
    def get_config(self) -> PipelineConfig:
        """Get the complete configuration."""
        return self.config
    
    def get_database_url(self) -> str:
        """Get database connection string."""
        return self.config.database.connection_string
    
    def get_api_config(self, source: str) -> Dict[str, Any]:
        """
        Get API configuration for a specific source.
        
        Args:
            source: Data source name ('attom', 'rentcast', 'census')
            
        Returns:
            Dictionary with API configuration
        """
        api_config = self.config.api
        
        source_configs = {
            'attom': {
                'api_key': api_config.attom_api_key,
                'base_url': api_config.attom_base_url,
                'rate_limit': api_config.attom_rate_limit,
                'database_url': self.get_database_url()
            },
            'rentcast': {
                'api_key': api_config.rentcast_api_key,
                'base_url': api_config.rentcast_base_url,
                'rate_limit': api_config.rentcast_rate_limit,
                'database_url': self.get_database_url()
            },
            'census': {
                'api_key': api_config.census_api_key,
                'base_url': api_config.census_base_url,
                'rate_limit': api_config.census_rate_limit,
                'database_url': self.get_database_url()
            }
        }
        
        return source_configs.get(source, {})
    
    def validate_config(self) -> bool:
        """
        Validate configuration completeness.
        
        Returns:
            True if configuration is valid, False otherwise
        """
        errors = []
        
        # Check database configuration
        if not self.config.database.host:
            errors.append("Database host is required")
        if not self.config.database.database:
            errors.append("Database name is required")
        if not self.config.database.username:
            errors.append("Database username is required")
        
        # Check API keys for Phase 1 sources
        if not self.config.api.attom_api_key:
            errors.append("ATTOM API key is required for Phase 1")
        if not self.config.api.rentcast_api_key:
            errors.append("RentCast API key is required for Phase 1")
        
        if errors:
            self.logger.error("Configuration validation failed:")
            for error in errors:
                self.logger.error(f"  - {error}")
            return False
        
        self.logger.info("Configuration validation passed")
        return True
    
    def save_sample_config(self, output_path: str) -> None:
        """
        Save a sample configuration file.
        
        Args:
            output_path: Path to save the sample configuration
        """
        sample_config = {
            "database": {
                "host": "localhost",
                "port": 5432,
                "database": "qurasion",
                "username": "postgres",
                "password": "your_password",
                "ssl_mode": "prefer"
            },
            "api": {
                "attom_api_key": "your_attom_api_key",
                "attom_base_url": "https://api.developer.attomdata.com",
                "attom_rate_limit": 10,
                "rentcast_api_key": "your_rentcast_api_key",
                "rentcast_base_url": "https://api.rentcast.io/v1",
                "rentcast_rate_limit": 100,
                "census_api_key": "",
                "census_base_url": "https://api.census.gov/data",
                "census_rate_limit": 50
            },
            "cache": {
                "enabled": True,
                "redis_host": "localhost",
                "redis_port": 6379,
                "redis_db": 0,
                "redis_password": ""
            },
            "budget": {
                "monthly_budget_usd": 1000.0,
                "alert_threshold_percent": 90.0
            },
            "logging": {
                "level": "INFO",
                "log_file": None,
                "max_bytes": 10485760,
                "backup_count": 5
            },
            "batch_size": 100,
            "max_retries": 3,
            "retry_backoff": 1.0,
            "timeout": 30,
            "data_quality_enabled": True,
            "quality_check_interval_hours": 24,
            "geo_enrichment_enabled": True,
            "postgis_enabled": False
        }
        
        try:
            with open(output_path, 'w') as f:
                json.dump(sample_config, f, indent=2)
            self.logger.info(f"Sample configuration saved to {output_path}")
        except Exception as e:
            self.logger.error(f"Failed to save sample configuration: {str(e)}")

def load_config(config_file: Optional[str] = None) -> PipelineConfig:
    """
    Convenience function to load configuration.
    
    Args:
        config_file: Optional path to configuration file
        
    Returns:
        PipelineConfig object
    """
    manager = ConfigManager(config_file)
    return manager.get_config()