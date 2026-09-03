"""
Redfin Market Data Adapter
Implements data fetching and transformation for Redfin market statistics
"""

from typing import Dict, Any, Optional, List
from datetime import datetime
import pandas as pd
import requests
import io
from .base_adapter import BaseAdapter, APIResponse

class RedfinAdapter(BaseAdapter):
    """
    Redfin Market Data Adapter
    
    Handles:
    - Market statistics download from Redfin Data Center
    - Metro-level market health indicators
    - Data transformation to canonical format
    """
    
    def __init__(self, config: Dict[str, Any]):
        super().__init__(config)
        self.base_url = "https://www.redfin.com/data-center"
        # Redfin Data Center URLs for different market metrics
        self.market_stats_url = "https://www.redfin.com/data-center/asset/csv/market-statistics/latest"
        
    def _get_default_headers(self) -> Dict[str, str]:
        """Get default headers for Redfin requests."""
        return {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'text/csv,application/csv'
        }
    
    def fetch_property(self, property_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """
        Not applicable for Redfin data - use fetch_market_data instead.
        
        Args:
            property_data: Property data (not used)
            
        Returns:
            None (use fetch_market_data instead)
        """
        return None
    
    def fetch_market_data(
        self,
        target_msas: Optional[List[int]] = None
    ) -> List[Dict[str, Any]]:
        """
        Fetch market statistics from Redfin Data Center.
        
        Args:
            target_msas: List of MSA IDs to filter (optional)
            
        Returns:
            List of market data records
        """
        try:
            self.logger.info(f"Downloading Redfin market data from {self.market_stats_url}")
            
            response = requests.get(self.market_stats_url, headers=self._get_default_headers(), timeout=60)
            response.raise_for_status()
            
            # Parse CSV data
            df = pd.read_csv(io.StringIO(response.text))
            
            # Filter for target MSAs if specified
            if target_msas and 'region_id' in df.columns:
                df = df[df['region_id'].isin(target_msas)]
            
            # Convert to list of dictionaries
            market_data = df.to_dict('records')
            
            self.logger.info(f"Fetched {len(market_data)} Redfin market records")
            return market_data
            
        except Exception as e:
            self.logger.error(f"Failed to fetch Redfin market data: {str(e)}")
            return []
    
    def transform_to_canonical(self, raw_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Transform Redfin raw data to canonical format.
        
        Args:
            raw_data: Raw Redfin market data row
            
        Returns:
            Canonical market data
        """
        try:
            # Parse period to date
            period = raw_data.get('period', '')
            month_end_date = self._parse_period_to_date(period)
            
            canonical_data = {
                'month_end_date': month_end_date,
                'msa_id': int(raw_data.get('region_id', 0)) if raw_data.get('region_id') else None,
                'msa_name': raw_data.get('region_name'),
                'median_sale_price': self._safe_int(raw_data.get('median_sale_price')),
                'median_list_price': self._safe_int(raw_data.get('median_list_price')),
                'median_price_per_sqft': self._safe_int(raw_data.get('median_ppsf')),
                'active_listings': self._safe_int(raw_data.get('inventory')),
                'supply_demand_ratio': self._safe_float(raw_data.get('supply_demand_ratio')),
                'days_on_market_median': self._safe_int(raw_data.get('days_on_market_median')),
                'raw_response': raw_data
            }
            
            return canonical_data
            
        except Exception as e:
            self.logger.error(f"Redfin transformation failed: {str(e)}")
            return {}
    
    def validate_data(self, data: Dict[str, Any]) -> bool:
        """
        Validate market data quality.
        
        Args:
            data: Canonical market data
            
        Returns:
            True if valid, False otherwise
        """
        # Check critical fields
        critical_fields = ['month_end_date', 'msa_id']
        for field in critical_fields:
            if data.get(field) is None:
                self.logger.warning(f"Missing critical field: {field}")
                return False
        
        # Validate prices
        median_sale_price = data.get('median_sale_price')
        if median_sale_price and (median_sale_price < 10000 or median_sale_price > 10000000):
            self.logger.warning(f"Invalid median sale price: {median_sale_price}")
            return False
        
        # Validate supply demand ratio
        supply_demand = data.get('supply_demand_ratio')
        if supply_demand is not None and (supply_demand < 0 or supply_demand > 10):
            self.logger.warning(f"Invalid supply demand ratio: {supply_demand}")
            return False
        
        return True
    
    def fetch_and_save_market_data(
        self,
        target_msas: Optional[List[int]] = None
    ) -> int:
        """
        Fetch and save market data to database.
        
        Args:
            target_msas: List of MSA IDs to filter
            
        Returns:
            Number of records saved
        """
        market_data = self.fetch_market_data(target_msas)
        
        saved_count = 0
        for record in market_data:
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
                    self.logger.warning(f"Validation failed for market record")
            except Exception as e:
                self.logger.error(f"Failed to save market record: {str(e)}")
        
        self.logger.info(f"Saved {saved_count} Redfin market records")
        return saved_count
    
    def calculate_market_features(
        self,
        msa_id: int,
        months_back: int = 12
    ) -> Dict[str, Any]:
        """
        Calculate derived market features for ML models.
        
        Args:
            msa_id: MSA ID
            months_back: Number of months to look back
            
        Returns:
            Dictionary of derived market features
        """
        session = self.Session()
        try:
            # Get market data for the specified period
            from sqlalchemy import text
            
            query = text("""
                SELECT 
                    median_sale_price,
                    median_list_price,
                    active_listings,
                    supply_demand_ratio,
                    days_on_market_median,
                    month_end_date
                FROM redfin_market_data
                WHERE msa_id = :msa_id
                ORDER BY month_end_date DESC
                LIMIT :months_back
            """)
            
            result = session.execute(query, {'msa_id': msa_id, 'months_back': months_back}).fetchall()
            
            if len(result) < 2:
                return {}
            
            # Calculate features from current data
            current = result[0]
            previous = result[1] if len(result) > 1 else current
            
            # List-to-sale ratio
            list_to_sale_ratio = (current.median_list_price / current.median_sale_price) if current.median_sale_price > 0 else 0
            
            # Price trend (month-over-month)
            price_trend = ((current.median_sale_price - previous.median_sale_price) / previous.median_sale_price * 100) if previous.median_sale_price > 0 else 0
            
            # Market velocity (inverse of days on market)
            market_velocity = (1 / current.days_on_market_median) if current.days_on_market_median and current.days_on_market_median > 0 else 0
            
            return {
                'list_to_sale_ratio': list_to_sale_ratio,
                'inventory_level': current.active_listings,
                'supply_demand': current.supply_demand_ratio,
                'market_velocity': market_velocity,
                'price_trend': price_trend,
                'days_on_market': current.days_on_market_median
            }
            
        except Exception as e:
            self.logger.error(f"Failed to calculate market features: {str(e)}")
            return {}
        finally:
            session.close()
    
    def _parse_period_to_date(self, period: str) -> Optional[str]:
        """Parse Redfin period string to date."""
        if not period:
            return None
        
        try:
            # Redfin uses format like "2023-12-01"
            if '-' in period:
                dt = datetime.strptime(period, '%Y-%m-%d')
                return dt.isoformat()
        except ValueError:
            pass
        
        return None
    
    def _safe_int(self, value: Any) -> Optional[int]:
        """Safely convert to integer."""
        try:
            return int(value) if value is not None else None
        except (ValueError, TypeError):
            return None
    
    def _safe_float(self, value: Any) -> Optional[float]:
        """Safely convert to float."""
        try:
            return float(value) if value is not None else None
        except (ValueError, TypeError):
            return None
    
    def _get_target_table(self) -> str:
        """Get target table for Redfin market data."""
        return "redfin_market_data"
    
    def _get_conflict_columns(self) -> List[str]:
        """Get columns for conflict detection."""
        return ['msa_id', 'month_end_date']