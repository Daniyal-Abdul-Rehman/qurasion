"""
Environmental Risk Data Adapter
Implements data fetching and transformation for environmental hazard data
"""

from typing import Dict, Any, Optional, List
from datetime import datetime
import requests
import zipfile
import os
from .base_adapter import BaseAdapter, APIResponse

class EnvironmentalAdapter(BaseAdapter):
    """
    Environmental Risk Data Adapter
    
    Handles:
    - FEMA flood zone data
    - Environmental hazard information
    - Data transformation to canonical format
    """
    
    def __init__(self, config: Dict[str, Any]):
        super().__init__(config)
        self.base_url = "https://msc.fema.gov"
        self.fema_download_url = "https://www.fema.gov/gis/geospatial-data-spatial-data-tools"
        
    def _get_default_headers(self) -> Dict[str, str]:
        """Get default headers for FEMA requests."""
        return {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'application/json'
        }
    
    def fetch_property(self, property_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """
        Fetch environmental risk data for a specific property.
        
        Args:
            property_data: Dictionary containing coordinates (lat, lng)
            
        Returns:
            Raw environmental data or None if failed
        """
        lat = property_data.get('latitude')
        lng = property_data.get('longitude')
        
        if not all([lat, lng]):
            self.logger.error("Missing required coordinates")
            return None
        
        # Use database enrichment instead of direct API call
        self.logger.warning("Environmental data should use database enrichment")
        return None
    
    def fetch_flood_zones_by_coordinates(
        self,
        lat: float,
        lng: float
    ) -> Optional[Dict[str, Any]]:
        """
        Fetch flood zone data for specific coordinates.
        
        Args:
            lat: Latitude
            lng: Longitude
            
        Returns:
            Flood zone data or None if not found
        """
        try:
            from sqlalchemy import text
            
            session = self.Session()
            try:
                # Use PostGIS point-in-polygon query
                query = text("""
                    SELECT 
                        fema_id,
                        flood_zone,
                        in_flood_hazard_area,
                        zone_status
                    FROM fema_flood_zones
                    WHERE ST_Contains(
                        geometry,
                        ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)
                    )
                    LIMIT 1
                """)
                
                result = session.execute(query, {
                    'lat': lat,
                    'lng': lng
                }).fetchone()
                
                if result:
                    return {
                        'fema_id': result.fema_id,
                        'flood_zone': result.flood_zone,
                        'in_flood_hazard_area': result.in_flood_hazard_area,
                        'zone_status': result.zone_status
                    }
                return None
                
            finally:
                session.close()
                
        except Exception as e:
            self.logger.error(f"Flood zone lookup failed: {str(e)}")
            return None
    
    def download_flood_zone_data(
        self,
        state_fips: str,
        county_fips: str
    ) -> str:
        """
        Download FEMA flood zone data for a county.
        
        Args:
            state_fips: State FIPS code
            county_fips: County FIPS code
            
        Returns:
            Path to downloaded shapefile
        """
        # FEMA NFHL (National Flood Hazard Layer) download URL
        base_url = "https://msc.fema.gov/portal/downloadProduct"
        
        try:
            self.logger.info(f"Downloading FEMA flood zone data for state {state_fips}, county {county_fips}")
            
            # Construct download URL for specific county
            # This is a simplified version - actual FEMA NFHL downloads are more complex
            download_url = f"{base_url}?state={state_fips}&county={county_fips}"
            
            response = requests.get(download_url, headers=self._get_default_headers(), timeout=300)
            response.raise_for_status()
            
            # Create temp directory
            temp_dir = f"/tmp/fema_flood_zones_{state_fips}_{county_fips}"
            os.makedirs(temp_dir, exist_ok=True)
            
            # Save to local file
            local_path = os.path.join(temp_dir, f"fema_{state_fips}_{county_fips}.zip")
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
                self.logger.info(f"Downloaded and extracted flood zones to {shp_file}")
                return shp_file
            else:
                self.logger.error("No .shp file found in downloaded archive")
                return ""
            
        except Exception as e:
            self.logger.error(f"Failed to download FEMA flood zone data: {str(e)}")
            return ""
    
    def load_flood_zones_to_db(
        self,
        shapefile_path: str
    ) -> int:
        """
        Load FEMA flood zone data into database.
        
        Args:
            shapefile_path: Path to shapefile
            
        Returns:
            Number of flood zones loaded
        """
        try:
            import geopandas as gpd
            from sqlalchemy import text
            
            self.logger.info(f"Loading flood zones from {shapefile_path}")
            
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
                    
                    flood_zone_data = {
                        'fema_id': str(row.get('FEMA_ID', '')),
                        'flood_zone': str(row.get('ZONE_SUBTY', ''))[:5],  # Limit to 5 chars
                        'in_flood_hazard_area': row.get('SFHA_TF') == 'T',
                        'zone_status': str(row.get('ZONE_STAT', '')),
                        'geometry': geometry_wkt,
                        'raw_response': row.to_dict()
                    }
                    
                    # Insert using PostGIS
                    session.execute(text("""
                        INSERT INTO fema_flood_zones 
                        (fema_id, flood_zone, in_flood_hazard_area, zone_status, geometry, raw_response)
                        VALUES 
                        (:fema_id, :flood_zone, :in_flood_hazard_area, :zone_status, 
                         ST_GeomFromText(:geometry, 4326), :raw_response)
                        ON CONFLICT (fema_id) DO UPDATE SET
                            flood_zone = EXCLUDED.flood_zone,
                            in_flood_hazard_area = EXCLUDED.in_flood_hazard_area,
                            zone_status = EXCLUDED.zone_status,
                            geometry = EXCLUDED.geometry,
                            raw_response = EXCLUDED.raw_response
                    """), flood_zone_data)
                    
                    loaded_count += 1
                    
                except Exception as e:
                    self.logger.error(f"Failed to load flood zone: {str(e)}")
                    continue
            
            session.commit()
            session.close()
            
            self.logger.info(f"Loaded {loaded_count} flood zones")
            return loaded_count
            
        except ImportError:
            self.logger.warning("geopandas not available, using alternative method")
            return self._load_flood_zones_alternative(shapefile_path)
        except Exception as e:
            self.logger.error(f"Failed to load flood zones: {str(e)}")
            return 0
    
    def _load_flood_zones_alternative(self, shapefile_path: str) -> int:
        """
        Alternative method to load flood zones without geopandas.
        
        Args:
            shapefile_path: Path to shapefile
            
        Returns:
            Number of flood zones loaded
        """
        # This would use ogr2ogr or other command-line tools
        self.logger.warning("Alternative flood zone loading not yet implemented")
        return 0
    
    def transform_to_canonical(self, raw_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Transform environmental raw data to canonical format.
        
        Args:
            raw_data: Raw environmental data
            
        Returns:
            Canonical environmental data
        """
        try:
            canonical_data = {
                'fema_id': raw_data.get('fema_id'),
                'flood_zone': str(raw_data.get('flood_zone', ''))[:5],
                'in_flood_hazard_area': raw_data.get('in_flood_hazard_area', False),
                'zone_status': raw_data.get('zone_status'),
                'raw_response': raw_data
            }
            
            return canonical_data
            
        except Exception as e:
            self.logger.error(f"Environmental transformation failed: {str(e)}")
            return {}
    
    def validate_data(self, data: Dict[str, Any]) -> bool:
        """
        Validate environmental data quality.
        
        Args:
            data: Canonical environmental data
            
        Returns:
            True if valid, False otherwise
        """
        # Validate flood zone format
        flood_zone = data.get('flood_zone')
        if flood_zone and len(flood_zone) > 5:
            self.logger.warning(f"Invalid flood zone length: {flood_zone}")
            return False
        
        # Validate boolean field
        in_flood_hazard = data.get('in_flood_hazard_area')
        if in_flood_hazard is not None and not isinstance(in_flood_hazard, bool):
            self.logger.warning(f"Invalid in_flood_hazard_area type: {type(in_flood_hazard)}")
            return False
        
        return True
    
    def calculate_risk_features(
        self,
        property_id: str,
        lat: float,
        lng: float
    ) -> Dict[str, Any]:
        """
        Calculate environmental risk features for ML models.
        
        Args:
            property_id: Property ID
            lat: Latitude
            lng: Longitude
            
        Returns:
            Dictionary of environmental risk features
        """
        flood_data = self.fetch_flood_zones_by_coordinates(lat, lng)
        
        if not flood_data:
            return {
                'flood_zone': 'unknown',
                'flood_risk_level': 'unknown',
                'in_fema_zone': False
            }
        
        # Determine flood risk level
        flood_zone = flood_data.get('flood_zone', '')
        flood_risk_level = self._categorize_flood_risk(flood_zone)
        
        return {
            'flood_zone': flood_zone,
            'flood_risk_level': flood_risk_level,
            'in_fema_zone': flood_data.get('in_flood_hazard_area', False)
        }
    
    def _categorize_flood_risk(self, flood_zone: str) -> str:
        """Categorize flood zone into risk levels."""
        if not flood_zone:
            return 'unknown'
        
        # High risk zones
        if flood_zone.startswith(('A', 'V')):
            return 'high'
        # Moderate risk zones
        elif flood_zone.startswith(('B', 'X')):
            return 'moderate'
        # Minimal risk zones
        elif flood_zone.startswith(('C', 'D')):
            return 'minimal'
        else:
            return 'unknown'
    
    def _get_target_table(self) -> str:
        """Get target table for environmental data."""
        return "fema_flood_zones"
    
    def _get_conflict_columns(self) -> List[str]:
        """Get columns for conflict detection."""
        return ['fema_id']