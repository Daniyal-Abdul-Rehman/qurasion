"""
U.S. Census Bureau Adapter
Implements data fetching and transformation for Census API
"""

from typing import Dict, Any, Optional, List
from datetime import datetime
import json
import requests
import zipfile
import os
from .base_adapter import BaseAdapter, APIResponse

class CensusAdapter(BaseAdapter):
    """
    U.S. Census Bureau Adapter
    
    Handles:
    - ACS 5-year demographic data
    - Geographic boundary data
    - Data transformation to canonical format
    - Geographic enrichment operations
    """
    
    def __init__(self, config: Dict[str, Any]):
        super().__init__(config)
        self.base_url = "https://api.census.gov/data"
        self.api_key = config.get('census_api_key')  # Optional, Census API is mostly free
        
    def _get_default_headers(self) -> Dict[str, str]:
        """Get default headers for Census API requests."""
        headers = {
            'accept': 'application/json'
        }
        if self.api_key:
            headers['X-API-Key'] = self.api_key
        return headers
    
    def fetch_property(self, property_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """
        Not applicable for Census data - use geographic enrichment instead.
        
        Args:
            property_data: Property data for geographic lookup
            
        Returns:
            None (use fetch_tract_data instead)
        """
        return None
    
    def fetch_tract_data(
        self,
        state_fips: str,
        county_fips: str,
        tract_fips: Optional[str] = None,
        year: int = 2022
    ) -> List[Dict[str, Any]]:
        """
        Fetch ACS 5-year data for census tracts.
        
        Args:
            state_fips: State FIPS code (e.g., '48' for Texas)
            county_fips: County FIPS code (e.g., '113' for Dallas County)
            tract_fips: Specific tract FIPS code (optional)
            year: ACS data year
            
        Returns:
            List of census tract data
        """
        # ACS 5-year variables for demographics and housing
        variables = [
            'NAME',                                    # Geographic area name
            'B19013_001E',                             # Median household income
            'B19013_001M',                             # Margin of error for income
            'B25001_001E',                             # Total housing units
            'B25002_001E',                             # Total vacancy
            'B25003_001E',                             # Owner-occupied units
            'B25058_001E',                             # Median value of owner-occupied units
            'B06012_001E',                             # Median age
            'B23025_005E',                             # Unemployment rate
            'B02001_002E',                             # Total population by race - White alone
            'B02001_003E',                             # Total population by race - Black or African American alone
            'B02001_004E',                             # Total population by race - American Indian and Alaska Native alone
            'B02001_005E',                             # Total population by race - Asian alone
            'B02001_006E',                             # Total population by race - Native Hawaiian and Other Pacific Islander alone
            'B02001_007E',                             # Total population by race - Some other race alone
            'B02001_008E',                             # Total population by race - Two or more races
            'B03003_003E',                             # Hispanic or Latino population
        ]
        
        endpoint = f"/{year}/acs/acs5"
        params = {
            'get': ','.join(variables),
            'for': 'tract:*' if not tract_fips else f'tract:{tract_fips}',
            'in': f'state:{state_fips} county:{county_fips}'
        }
        
        response = self.fetch_with_retry(endpoint, params)
        
        if response.success and response.data:
            # Census API returns array of arrays, first row is headers
            data_rows = response.data
            if len(data_rows) > 1:
                headers = data_rows[0]
                tracts = []
                
                for row in data_rows[1:]:
                    tract_data = dict(zip(headers, row))
                    tracts.append(tract_data)
                
                self.logger.info(f"Fetched {len(tracts)} census tracts")
                return tracts
            else:
                self.logger.warning("No census data returned")
                return []
        else:
            self.logger.error(f"Failed to fetch census data: {response.error}")
            return []
    
    def fetch_all_tracts_for_state(
        self,
        state_fips: str,
        year: int = 2022
    ) -> List[Dict[str, Any]]:
        """
        Fetch all census tracts for a state.
        
        Args:
            state_fips: State FIPS code
            year: ACS data year
            
        Returns:
            List of all census tracts in the state
        """
        # This would require fetching data for all counties in the state
        # For now, return empty list - would need county enumeration
        self.logger.warning("State-wide tract fetch not yet implemented")
        return []
    
    def enrich_property_with_census(
        self,
        property_data: Dict[str, Any],
        state_fips: str,
        county_fips: str
    ) -> Dict[str, Any]:
        """
        Enrich property data with census tract information.
        
        Args:
            property_data: Property data with coordinates
            state_fips: State FIPS code
            county_fips: County FIPS code
            
        Returns:
            Property data enriched with census features
        """
        lat = property_data.get('latitude')
        lng = property_data.get('longitude')
        
        if not lat or not lng:
            self.logger.warning("Missing coordinates for census enrichment")
            return property_data
        
        # Find census tract containing the property
        tract_id = self._find_tract_by_coordinates(lat, lng, state_fips, county_fips)
        
        if tract_id:
            # Fetch census data for this tract
            tract_data = self.fetch_tract_data(state_fips, county_fips, tract_id)
            
            if tract_data:
                enriched_data = property_data.copy()
                census_features = self._extract_census_features(tract_data[0])
                enriched_data.update(census_features)
                
                self.logger.info(f"Enriched property with census data from tract {tract_id}")
                return enriched_data
        
        return property_data
    
    def _find_tract_by_coordinates(
        self,
        lat: float,
        lng: float,
        state_fips: str,
        county_fips: str
    ) -> Optional[str]:
        """
        Find census tract containing given coordinates.
        
        Args:
            lat: Latitude
            lng: Longitude
            state_fips: State FIPS code
            county_fips: County FIPS code
            
        Returns:
            Tract FIPS code or None if not found
        """
        try:
            from sqlalchemy import text
            
            session = self.Session()
            try:
                # Use PostGIS point-in-polygon query
                query = text("""
                    SELECT tract_code
                    FROM census_tract_boundaries
                    WHERE state_fips = :state_fips
                    AND county_fips = :county_fips
                    AND ST_Contains(
                        geometry,
                        ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)
                    )
                    LIMIT 1
                """)
                
                result = session.execute(query, {
                    'state_fips': state_fips,
                    'county_fips': county_fips,
                    'lat': lat,
                    'lng': lng
                }).fetchone()
                
                if result:
                    return result.tract_code
                return None
                
            finally:
                session.close()
                
        except Exception as e:
            self.logger.error(f"Coordinate-based tract lookup failed: {str(e)}")
            return None
    
    def transform_to_canonical(self, raw_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Transform Census raw data to canonical format.
        
        Args:
            raw_data: Raw Census API response (single tract)
            
        Returns:
            Canonical census tract data
        """
        try:
            # Extract geographic identifiers
            state_fips = raw_data.get('state')
            county_fips = raw_data.get('county')
            tract_fips = raw_data.get('tract')
            geo_id = f"{state_fips}{county_fips}{tract_fips}"
            
            # Parse tract name
            tract_name = raw_data.get('NAME', '')
            
            # Extract numeric values (Census returns strings)
            def safe_int(value: str) -> Optional[int]:
                try:
                    return int(value) if value else None
                except (ValueError, TypeError):
                    return None
            
            # Extract demographic and housing data
            median_income = safe_int(raw_data.get('B19013_001E'))
            total_housing_units = safe_int(raw_data.get('B25001_001E'))
            total_vacancy = safe_int(raw_data.get('B25002_001E'))
            owner_occupied_units = safe_int(raw_data.get('B25003_001E'))
            median_home_value = safe_int(raw_data.get('B25058_001E'))
            median_age = safe_int(raw_data.get('B06012_001E'))
            unemployment_rate = safe_int(raw_data.get('B23025_005E'))
            
            # Calculate derived features
            vacancy_rate = None
            if total_housing_units and total_housing_units > 0:
                vacancy_rate = round(total_vacancy / total_housing_units, 4) if total_vacancy else 0.0
            
            owner_occupancy_rate = None
            if total_housing_units and total_housing_units > 0:
                owner_occupancy_rate = round(owner_occupied_units / total_housing_units, 4) if owner_occupied_units else 0.0
            
            income_affordability = None
            if median_income and median_home_value and median_income > 0:
                income_affordability = round(median_home_value / (median_income * 3), 2)
            
            # Race/ethnicity data
            white_pop = safe_int(raw_data.get('B02001_002E'))
            black_pop = safe_int(raw_data.get('B02001_003E'))
            asian_pop = safe_int(raw_data.get('B02001_005E'))
            hispanic_pop = safe_int(raw_data.get('B03003_003E'))
            
            total_minority = sum([
                black_pop or 0, asian_pop or 0, hispanic_pop or 0
            ])
            
            canonical_data = {
                'state_fips': state_fips,
                'county_fips': county_fips,
                'tract_fips': tract_fips,
                'tract_name': tract_name,
                'geo_id': geo_id,
                'median_income': median_income,
                'total_housing_units': total_housing_units,
                'total_vacancy': total_vacancy,
                'owner_occupied_units': owner_occupied_units,
                'median_home_value': median_home_value,
                'median_age': median_age,
                'unemployment_rate': unemployment_rate,
                'white_population': white_pop,
                'black_population': black_pop,
                'asian_population': asian_pop,
                'hispanic_population': hispanic_pop,
                'total_minority_population': total_minority,
                'vacancy_rate': vacancy_rate,
                'owner_occupancy_rate': owner_occupancy_rate,
                'income_affordability': income_affordability,
                'raw_response': json.dumps(raw_data)
            }
            
            return canonical_data
            
        except Exception as e:
            self.logger.error(f"Census transformation failed: {str(e)}")
            return {}
    
    def _extract_census_features(self, census_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Extract ML features from census data.
        
        Args:
            census_data: Canonical census data
            
        Returns:
            Dictionary of ML features
        """
        return {
            'census_tract_id': census_data.get('geo_id'),
            'median_income': census_data.get('median_income'),
            'vacancy_rate': census_data.get('vacancy_rate'),
            'owner_occupancy_rate': census_data.get('owner_occupancy_rate'),
            'median_home_value': census_data.get('median_home_value'),
            'income_affordability': census_data.get('income_affordability'),
            'neighborhood_income_level': self._categorize_income(census_data.get('median_income')),
            'housing_demand': self._calculate_housing_demand(census_data.get('vacancy_rate'))
        }
    
    def _categorize_income(self, median_income: Optional[int]) -> str:
        """Categorize median income into quintiles."""
        if not median_income:
            return 'unknown'
        
        if median_income < 40000:
            return 'low'
        elif median_income < 60000:
            return 'medium_low'
        elif median_income < 80000:
            return 'medium'
        elif median_income < 100000:
            return 'medium_high'
        else:
            return 'high'
    
    def _calculate_housing_demand(self, vacancy_rate: Optional[float]) -> str:
        """Calculate housing demand based on vacancy rate."""
        if not vacancy_rate:
            return 'unknown'
        
        if vacancy_rate < 0.05:
            return 'very_high'
        elif vacancy_rate < 0.10:
            return 'high'
        elif vacancy_rate < 0.15:
            return 'moderate'
        else:
            return 'low'
    
    def validate_data(self, data: Dict[str, Any]) -> bool:
        """
        Validate census data quality.
        
        Args:
            data: Canonical census data
            
        Returns:
            True if valid, False otherwise
        """
        # Check critical fields
        critical_fields = ['state_fips', 'county_fips', 'tract_fips', 'geo_id']
        for field in critical_fields:
            if not data.get(field):
                self.logger.warning(f"Missing critical field: {field}")
                return False
        
        # Validate FIPS codes
        state_fips = data.get('state_fips')
        if state_fips and (len(state_fips) != 2 or not state_fips.isdigit()):
            self.logger.warning(f"Invalid state FIPS: {state_fips}")
            return False
        
        county_fips = data.get('county_fips')
        if county_fips and (len(county_fips) != 3 or not county_fips.isdigit()):
            self.logger.warning(f"Invalid county FIPS: {county_fips}")
            return False
        
        # Validate derived features
        vacancy_rate = data.get('vacancy_rate')
        if vacancy_rate is not None and (vacancy_rate < 0 or vacancy_rate > 1):
            self.logger.warning(f"Invalid vacancy rate: {vacancy_rate}")
            return False
        
        owner_occupancy_rate = data.get('owner_occupancy_rate')
        if owner_occupancy_rate is not None and (owner_occupancy_rate < 0 or owner_occupancy_rate > 1):
            self.logger.warning(f"Invalid owner occupancy rate: {owner_occupancy_rate}")
            return False
        
        return True
    
    def download_tract_boundaries(
        self,
        state_fips: str,
        year: int = 2022
    ) -> str:
        """
        Download census tract boundary shapefiles.
        
        Args:
            state_fips: State FIPS code
            year: Year of boundaries
            
        Returns:
            Path to downloaded shapefile
        """
        # Census TIGER/Line shapefile URL
        base_url = "https://www2.census.gov/geo/tiger/TIGER{year}"
        shapefile_url = f"{base_url}/TRACT/tl_{year}_{state_fips}_tract.zip"
        
        try:
            self.logger.info(f"Downloading tract boundaries for state {state_fips}")
            
            response = requests.get(shapefile_url, stream=True, timeout=300)
            response.raise_for_status()
            
            # Create temp directory
            temp_dir = f"/tmp/census_tracts_{state_fips}_{year}"
            os.makedirs(temp_dir, exist_ok=True)
            
            # Save to local file
            local_path = os.path.join(temp_dir, f"tl_{year}_{state_fips}_tract.zip")
            with open(local_path, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
            
            # Extract zip file
            with zipfile.ZipFile(local_path, 'r') as zip_ref:
                zip_ref.extractall(temp_dir)
            
            # Find the .shp file
            shp_file = None
            for file in os.listdir(temp_dir):
                if file.endswith('.shp'):
                    shp_file = os.path.join(temp_dir, file)
                    break
            
            if shp_file:
                self.logger.info(f"Downloaded and extracted boundaries to {shp_file}")
                return shp_file
            else:
                self.logger.error("No .shp file found in downloaded archive")
                return ""
            
        except Exception as e:
            self.logger.error(f"Failed to download tract boundaries: {str(e)}")
            return ""
    
    def load_tract_boundaries_to_db(
        self,
        shapefile_path: str,
        state_fips: str
    ) -> int:
        """
        Load census tract boundaries into database.
        
        Args:
            shapefile_path: Path to shapefile
            state_fips: State FIPS code
            
        Returns:
            Number of tracts loaded
        """
        try:
            import geopandas as gpd
            from sqlalchemy import text
            
            self.logger.info(f"Loading tract boundaries from {shapefile_path}")
            
            # Read shapefile
            gdf = gpd.read_file(shapefile_path)
            
            # Convert to WGS84 if needed
            if gdf.crs != 'EPSG:4326':
                gdf = gdf.to_crs('EPSG:4326')
            
            # Load to database
            loaded_count = 0
            session = self.Session()
            
            for _, row in gdf.iterrows():
                try:
                    # Extract geometry as WKT
                    geometry_wkt = row.geometry.wkt
                    
                    boundary_data = {
                        'state_fips': str(row.get('STATEFP', state_fips)),
                        'county_fips': str(row.get('COUNTYFP', '')),
                        'tract_code': str(row.get('TRACTCE', '')),
                        'tract_name': row.get('NAME', ''),
                        'geo_id': str(row.get('GEOID', '')),
                        'geometry': geometry_wkt,
                        'raw_response': json.dumps(row.to_dict())
                    }
                    
                    # Insert using PostGIS
                    session.execute(text("""
                        INSERT INTO census_tract_boundaries 
                        (state_fips, county_fips, tract_code, tract_name, geo_id, geometry, raw_response)
                        VALUES 
                        (:state_fips, :county_fips, :tract_code, :tract_name, :geo_id, 
                         ST_GeomFromText(:geometry, 4326), :raw_response)
                        ON CONFLICT (geo_id) DO UPDATE SET
                            geometry = EXCLUDED.geometry,
                            raw_response = EXCLUDED.raw_response
                    """), boundary_data)
                    
                    loaded_count += 1
                    
                except Exception as e:
                    self.logger.error(f"Failed to load tract boundary: {str(e)}")
                    continue
            
            session.commit()
            session.close()
            
            self.logger.info(f"Loaded {loaded_count} tract boundaries")
            return loaded_count
            
        except ImportError:
            self.logger.warning("geopandas not available, using alternative method")
            return self._load_boundaries_alternative(shapefile_path, state_fips)
        except Exception as e:
            self.logger.error(f"Failed to load tract boundaries: {str(e)}")
            return 0
    
    def _load_boundaries_alternative(
        self,
        shapefile_path: str,
        state_fips: str
    ) -> int:
        """
        Alternative method to load boundaries without geopandas.
        
        Args:
            shapefile_path: Path to shapefile
            state_fips: State FIPS code
            
        Returns:
            Number of tracts loaded
        """
        # This would use ogr2ogr or other command-line tools
        # For now, return 0 as placeholder
        self.logger.warning("Alternative boundary loading not yet implemented")
        return 0
    
    def _get_target_table(self) -> str:
        """Get target table for census data."""
        return "census_tract_data"
    
    def _get_conflict_columns(self) -> List[str]:
        """Get columns for conflict detection."""
        return ['state_fips', 'county_fips', 'tract_fips']


class CensusGeographicEnrichment:
    """
    Geographic enrichment using census data.
    
    Provides methods to enrich property data with census features
    using point-in-polygon operations.
    """
    
    def __init__(self, database_url: str):
        self.database_url = database_url
        self.engine = create_engine(database_url)
    
    def enrich_property_by_coordinates(
        self,
        property_id: str,
        latitude: float,
        longitude: float
    ) -> Dict[str, Any]:
        """
        Enrich property with census data using coordinates.
        
        Args:
            property_id: Property identifier
            latitude: Property latitude
            longitude: Property longitude
            
        Returns:
            Census features for the property
        """
        from sqlalchemy import text
        
        with self.engine.connect() as conn:
            # Find census tract containing the point
            query = text("""
                SELECT ct.*
                FROM census_tract_boundaries ctb
                JOIN census_tract_data ct ON ctb.geo_id = ct.geo_id
                WHERE ST_Contains(ctb.geometry, ST_SetSRID(ST_MakePoint(:lng, :lat), 4326))
                LIMIT 1
            """)
            
            result = conn.execute(query, {'lat': latitude, 'lng': longitude}).fetchone()
            
            if result:
                return {
                    'census_tract_id': result.geo_id,
                    'median_income': result.median_income,
                    'vacancy_rate': result.vacancy_rate,
                    'owner_occupancy_rate': result.owner_occupancy_rate,
                    'median_home_value': result.median_home_value,
                    'income_affordability': result.income_affordability
                }
        
        return {}
    
    def batch_enrich_properties(
        self,
        property_list: List[Dict[str, Any]]
    ) -> List[Dict[str, Any]]:
        """
        Batch enrich multiple properties with census data.
        
        Args:
            property_list: List of property dictionaries with coordinates
            
        Returns:
            List of enriched property dictionaries
        """
        enriched_properties = []
        
        for property_data in property_list:
            property_id = property_data.get('property_id')
            lat = property_data.get('latitude')
            lng = property_data.get('longitude')
            
            if lat and lng:
                census_features = self.enrich_property_by_coordinates(
                    property_id, lat, lng
                )
                property_data.update(census_features)
            
            enriched_properties.append(property_data)
        
        return enriched_properties