"""
Example: Property Data Ingestion
Demonstrates how to ingest property data from ATTOM and RentCast APIs
"""

import sys
import os

# Add parent directory to path for imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from pipelines.data_ingestion_pipeline import DataIngestionPipeline, PipelineConfig
from config.config_manager import ConfigManager
from monitoring.data_quality_monitor import DataQualityMonitor

def main():
    """Main example function."""
    
    # Load configuration
    config_manager = ConfigManager()
    config = config_manager.get_config()
    
    # Validate configuration
    if not config_manager.validate_config():
        print("Configuration validation failed. Please check your settings.")
        return
    
    # Create pipeline configuration
    pipeline_config = PipelineConfig(
        database_url=config_manager.get_database_url(),
        attom_api_key=config.api.attom_api_key,
        rentcast_api_key=config.api.rentcast_api_key,
        census_api_key=config.api.census_api_key,
        monthly_budget_usd=config.budget.monthly_budget_usd,
        enable_caching=config.cache.enabled,
        cache_redis_host=config.cache.redis_host,
        cache_redis_port=config.cache.redis_port,
        log_level=config.logging.level
    )
    
    # Initialize pipeline
    pipeline = DataIngestionPipeline(pipeline_config)
    
    print("=" * 60)
    print("Property Data Ingestion Example")
    print("=" * 60)
    
    # Example 1: Ingest specific properties
    print("\n1. Ingesting specific properties...")
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
    
    property_results = pipeline.run_property_ingestion(
        property_list=sample_properties,
        sources=['attom', 'rentcast']
    )
    
    print(f"Property ingestion completed:")
    print(f"  Total properties: {property_results['total_properties']}")
    print(f"  Successful: {property_results['summary']['total_successful']}")
    print(f"  Failed: {property_results['summary']['total_failed']}")
    print(f"  Success rate: {property_results['summary']['success_rate']:.2%}")
    
    # Example 2: City-wide ingestion
    print("\n2. Running city-wide ingestion for Dallas, TX...")
    city_results = pipeline.run_city_wide_ingestion(
        city='Dallas',
        state='TX',
        sources=['attom', 'rentcast']
    )
    
    print(f"City-wide ingestion completed:")
    print(f"  Duration: {city_results['duration_seconds']:.2f} seconds")
    
    # Example 3: Check budget usage
    print("\n3. Budget usage summary...")
    budget_summary = pipeline.get_budget_summary()
    print(f"  Monthly budget: ${budget_summary['monthly_budget']:.2f}")
    print(f"  Current spend: ${budget_summary['current_spend']:.2f}")
    print(f"  Remaining: ${budget_summary['remaining_budget']:.2f}")
    print(f"  Utilization: {budget_summary['budget_utilization']:.2f}%")
    
    # Example 4: Run data quality checks
    if config.data_quality_enabled:
        print("\n4. Running data quality checks...")
        quality_monitor = DataQualityMonitor(config_manager.get_database_url())
        
        # Check ATTOM data quality
        attom_quality = quality_monitor.run_quality_check('attom', 'attom_properties')
        print(f"ATTOM data quality score: {attom_quality['quality_score']:.2f}")
        
        # Check RentCast data quality
        rentcast_quality = quality_monitor.run_quality_check('rentcast', 'rentcast_properties')
        print(f"RentCast data quality score: {rentcast_quality['quality_score']:.2f}")
        
        # Display alerts
        if attom_quality['alerts']:
            print(f"ATTOM alerts: {len(attom_quality['alerts'])}")
            for alert in attom_quality['alerts'][:3]:  # Show first 3 alerts
                print(f"  - [{alert.severity.value}] {alert.message}")
        
        if rentcast_quality['alerts']:
            print(f"RentCast alerts: {len(rentcast_quality['alerts'])}")
            for alert in rentcast_quality['alerts'][:3]:  # Show first 3 alerts
                print(f"  - [{alert.severity.value}] {alert.message}")
    
    print("\n" + "=" * 60)
    print("Example completed successfully!")
    print("=" * 60)

if __name__ == "__main__":
    main()