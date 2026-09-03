"""
Example: Census Data Ingestion
Demonstrates how to ingest and enrich property data with census information
"""

import sys
import os

# Add parent directory to path for imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from pipelines.data_ingestion_pipeline import DataIngestionPipeline, PipelineConfig
from config.config_manager import ConfigManager
from sources.census_adapter import CensusAdapter

def main():
    """Main example function."""
    
    # Load configuration
    config_manager = ConfigManager()
    config = config_manager.get_config()
    
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
    print("Census Data Ingestion Example")
    print("=" * 60)
    
    # Example 1: Update census data for a specific county
    print("\n1. Updating census data for Dallas County, Texas...")
    census_results = pipeline.run_census_update(
        state_fips='48',  # Texas
        county_fips='113'  # Dallas County
    )
    
    print(f"Census update completed:")
    print(f"  Tracts processed: {census_results['tracts_processed']}")
    print(f"  Tracts successful: {census_results['tracts_successful']}")
    print(f"  Tracts failed: {census_results['tracts_failed']}")
    print(f"  Duration: {census_results['duration_seconds']:.2f} seconds")
    
    # Example 2: Direct census adapter usage
    print("\n2. Using census adapter directly...")
    census_config = config_manager.get_api_config('census')
    census_adapter = CensusAdapter(census_config)
    
    # Fetch tract data for a specific area
    print("Fetching tract data for Dallas County, Texas...")
    tracts = census_adapter.fetch_tract_data(
        state_fips='48',
        county_fips='113'
    )
    
    print(f"Fetched {len(tracts)} census tracts")
    
    if tracts:
        # Transform and display first tract
        first_tract = census_adapter.transform_to_canonical(tracts[0])
        print(f"\nSample tract data:")
        print(f"  Tract ID: {first_tract.get('geo_id')}")
        print(f"  Tract Name: {first_tract.get('tract_name')}")
        print(f"  Median Income: ${first_tract.get('median_income', 0):,}")
        print(f"  Median Home Value: ${first_tract.get('median_home_value', 0):,}")
        print(f"  Vacancy Rate: {first_tract.get('vacancy_rate', 0):.2%}")
        print(f"  Owner Occupancy Rate: {first_tract.get('owner_occupancy_rate', 0):.2%}")
        print(f"  Income Affordability: {first_tract.get('income_affordability', 0):.2f}")
    
    # Example 3: Geographic enrichment
    if config.geo_enrichment_enabled:
        print("\n3. Running geographic enrichment...")
        enrichment_results = pipeline.run_geographic_enrichment()
        
        print(f"Geographic enrichment completed:")
        print(f"  Properties processed: {enrichment_results['properties_processed']}")
        print(f"  Properties enriched: {enrichment_results['properties_enriched']}")
    
    print("\n" + "=" * 60)
    print("Census example completed successfully!")
    print("=" * 60)

if __name__ == "__main__":
    main()