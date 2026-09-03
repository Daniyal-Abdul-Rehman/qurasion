"""
FHFA House Price Index Adapter
Implements data fetching and transformation for FHFA HPI data
"""

from typing import Dict, Any, Optional, List
from datetime import datetime
import pandas as pd
import requests
import io
from .base_adapter import BaseAdapter, APIResponse

class FHFAAdapter(BaseAdapter):
    """
    FHFA House Price Index Adapter
    
    Handles:
    - HPI data download from FHFA
    - State and metro area HPI trends
    - Data transformation to canonical format
    """
    
    def __init__(self, config: Dict[str, Any]):
        super().__init__(config)
        self.base_url = "https://www.fhfa.gov"
        self.hpi_download_url = "https://www.fhfa.gov/DataTools/Downloads/Documents/HPI/HPI_AT_state.csv"
        self.msa_hpi_url = "https://www.fhfa.gov/DataTools/Downloads/Documents/HPI/HPI_AT_msa.csv"
        
    def _get_default_headers(self) -> Dict[str, str]:
        """Get default headers for FHFA requests."""
        return {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'text/csv,application/csv'
        }
    
    def fetch_property(self, property_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """
        Not applicable for FHFA data - use fetch_hpi_data instead.
        
        Args:
            property_data: Property data (not used)
            
        Returns:
            None (use fetch_hpi_data instead)
        """
        return None
    
    def fetch_hpi_data(
        self,
        data_type: str = "state",
        target_states: Optional[List[str]] = None
    ) -> List[Dict[str, Any]]:
        """
        Fetch HPI data from FHFA.
        
        Args:
            data_type: Type of data ('state' or 'msa')
            target_states: List of state FIPS codes to filter (optional)
            
        Returns:
            List of HPI records
        """
        url = self.hpi_download_url if data_type == "state" else self.msa_hpi_url
        
        try:
            self.logger.info(f"Downloading FHFA HPI data from {url}")
            
            response = requests.get(url, headers=self._get_default_headers(), timeout=60)
            response.raise_for_status()
            
            # Parse CSV data
            df = pd.read_csv(io.StringIO(response.text))
            
            # Filter for target states if specified
            if target_states and data_type == "state":
                df = df[df['state_id'].isin(target_states)]
            
            # Convert to list of dictionaries
            hpi_data = df.to_dict('records')
            
            self.logger.info(f"Fetched {len(hpi_data)} HPI records")
            return hpi_data
            
        except Exception as e:
            self.logger.error(f"Failed to fetch FHFA HPI data: {str(e)}")
            return []
    
    def transform_to_canonical(self, raw_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Transform FHFA raw data to canonical format.
        
        Args:
            raw_data: Raw FHFA HPI data row
            
        Returns:
            Canonical HPI data
        """
        try:
            canonical_data = {
                'state_fips': str(raw_data.get('state_id', '')),
                'state_name': raw_data.get('state_name'),
                'msa_id': raw_data.get('msa_id') if 'msa_id' in raw_data else None,
                'msa_name': raw_data.get('msa_name') if 'msa_name' in raw_data else None,
                'year': int(raw_data.get('year', datetime.now().year)),
                'quarter': int(raw_data.get('quarter', 1)),
                'hpi_index': float(raw_data.get('hpi', 0)),
                'hpi_growth': float(raw_data.get('hpi_growth', 0)) if 'hpi_growth' in raw_data else None,
                'raw_response': raw_data
            }
            
            return canonical_data
            
        except Exception as e:
            self.logger.error(f"FHFA transformation failed: {str(e)}")
            return {}
    
    def validate_data(self, data: Dict[str, Any]) -> bool:
        """
        Validate HPI data quality.
        
        Args:
            data: Canonical HPI data
            
        Returns:
            True if valid, False otherwise
        """
        # Check critical fields
        critical_fields = ['state_fips', 'year', 'quarter', 'hpi_index']
        for field in critical_fields:
            if data.get(field) is None:
                self.logger.warning(f"Missing critical field: {field}")
                return False
        
        # Validate year
        year = data.get('year')
        if year and (year < 1990 or year > datetime.now().year + 1):
            self.logger.warning(f"Invalid year: {year}")
            return False
        
        # Validate quarter
        quarter = data.get('quarter')
        if quarter and (quarter < 1 or quarter > 4):
            self.logger.warning(f"Invalid quarter: {quarter}")
            return False
        
        # Validate HPI index
        hpi_index = data.get('hpi_index')
        if hpi_index and (hpi_index < 0 or hpi_index > 10000):
            self.logger.warning(f"Invalid HPI index: {hpi_index}")
            return False
        
        return True
    
    def fetch_and_save_hpi_data(
        self,
        data_type: str = "state",
        target_states: Optional[List[str]] = None
    ) -> int:
        """
        Fetch and save HPI data to database.
        
        Args:
            data_type: Type of data ('state' or 'msa')
            target_states: List of state FIPS codes to filter
            
        Returns:
            Number of records saved
        """
        hpi_data = self.fetch_hpi_data(data_type, target_states)
        
        saved_count = 0
        for record in hpi_data:
            try:
                canonical = self.transform_to_canonical(record)
                if self.validate_data(canonical):
                    self.save_to_database(
                        self._get_target_table(),
                        canonical,
                        self._get_conflict_columns()
                    )
                    saved_count += 1
                else:
                    self.logger.warning(f"Validation failed for HPI record")
            except Exception as e:
                self.logger.error(f"Failed to save HPI record: {str(e)}")
        
        self.logger.info(f"Saved {saved_count} HPI records")
        return saved_count
    
    def calculate_hpi_features(
        self,
        state_fips: str,
        msa_id: Optional[int] = None
    ) -> Dict[str, Any]:
        """
        Calculate derived HPI features for ML models.
        
        Args:
            state_fips: State FIPS code
            msa_id: Optional MSA ID
            
        Returns:
            Dictionary of derived HPI features
        """
        session = self.Session()
        try:
            # Get HPI data for the last 12 months
            query = """
                SELECT hpi_index, year, quarter
                FROM fhfa_hpi_data
                WHERE state_fips = :state_fips
            """
            params = {'state_fips': state_fips}
            
            if msa_id:
                query += " AND msa_id = :msa_id"
                params['msa_id'] = msa_id
            
            query += " ORDER BY year DESC, quarter DESC LIMIT 5"
            
            result = session.execute(query, params).fetchall()
            
            if len(result) < 2:
                return {}
            
            # Calculate features
            current_hpi = result[0].hpi_index
            previous_hpi = result[1].hpi_index if len(result) > 1 else current_hpi
            
            hpi_growth_12m = ((current_hpi - previous_hpi) / previous_hpi * 100) if previous_hpi > 0 else 0
            
            # Determine market trend
            if hpi_growth_12m > 2:
                market_trend = 'increasing'
            elif hpi_growth_12m > -2:
                market_trend = 'stable'
            else:
                market_trend = 'declining'
            
            return {
                'hpi_index_12m': current_hpi,
                'hpi_growth_12m': hpi_growth_12m,
                'market_trend': market_trend,
                'price_momentum': hpi_growth_12m / 12  # Monthly rate
            }
            
        except Exception as e:
            self.logger.error(f"Failed to calculate HPI features: {str(e)}")
            return {}
        finally:
            session.close()
    
    def _get_target_table(self) -> str:
        """Get target table for FHFA HPI data."""
        return "fhfa_hpi_data"
    
    def _get_conflict_columns(self) -> List[str]:
        """Get columns for conflict detection."""
        return ['state_fips', 'msa_id', 'year', 'quarter']