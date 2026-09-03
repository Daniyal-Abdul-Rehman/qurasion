"""
ATTOM Data Solutions Adapter
Implements data fetching and transformation for ATTOM API
"""

from typing import Dict, Any, Optional, List, Tuple
from datetime import datetime
import json
from .base_adapter import BaseAdapter, APIResponse

class ATTOMAdapter(BaseAdapter):
    """
    ATTOM Data Solutions Adapter
    
    Handles:
    - Property detail fetching
    - Property search and pagination
    - Sales history retrieval
    - Data transformation to canonical format
    """
    
    def __init__(self, config: Dict[str, Any]):
        super().__init__(config)
        self.api_key = config.get('attom_api_key')
        self.base_url = "https://api.developer.attomdata.com"
        
    def _get_default_headers(self) -> Dict[str, str]:
        """Get default headers for ATTOM API requests."""
        return {
            'apikey': self.api_key,
            'accept': 'application/json',
            'content-type': 'application/json'
        }
    
    def fetch_property(self, property_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """
        Fetch property details from ATTOM API.
        
        Args:
            property_data: Dictionary containing address, city, state, zip
            
        Returns:
            Raw property data from ATTOM API or None if failed
        """
        address = property_data.get('address')
        city = property_data.get('city')
        state = property_data.get('state_code')
        zip_code = property_data.get('zip')
        
        if not all([address, city, state]):
            self.logger.error("Missing required address fields")
            return None
        
        # Use extended profile endpoint for comprehensive data
        endpoint = "/v4/property/extendedprofile"
        params = {
            'address': address,
            'city': city,
            'state': state,
            'postalCode': zip_code,
            'page': 1,
            'pageSize': 1
        }
        
        response = self.fetch_with_retry(endpoint, params)
        
        if response.success and response.data:
            property_list = response.data.get('property', [])
            if property_list:
                self.logger.info(f"Successfully fetched property: {address}")
                return property_list[0]
            else:
                self.logger.warning(f"No property found for: {address}")
                return None
        else:
            self.logger.error(f"Failed to fetch property: {response.error}")
            return None
    
    def fetch_sales_history(self, property_id: str, start_year: int = 2010, end_year: int = 2024) -> List[Dict[str, Any]]:
        """
        Fetch sales history for a property.
        
        Args:
            property_id: ATTOM property ID
            start_year: Start year for history
            end_year: End year for history
            
        Returns:
            List of sales transactions
        """
        endpoint = "/v4/transaction/saleshistory"
        params = {
            'propertyId': property_id,
            'startYear': start_year,
            'endYear': end_year
        }
        
        response = self.fetch_with_retry(endpoint, params)
        
        if response.success and response.data:
            transactions = response.data.get('transaction', [])
            self.logger.info(f"Fetched {len(transactions)} sales records for property {property_id}")
            return transactions
        else:
            self.logger.error(f"Failed to fetch sales history: {response.error}")
            return []
    
    def search_properties(
        self,
        city: str,
        state: str,
        property_type: str = "RESIDENTIAL",
        start_date: Optional[str] = None,
        end_date: Optional[str] = None,
        page: int = 1,
        page_size: int = 500
    ) -> List[Dict[str, Any]]:
        """
        Search for properties by geographic criteria.
        
        Args:
            city: City name
            state: State code
            property_type: Property type filter
            start_date: Start date for transactions (YYYY-MM-DD)
            end_date: End date for transactions (YYYY-MM-DD)
            page: Page number
            page_size: Records per page (max 500)
            
        Returns:
            List of properties matching criteria
        """
        endpoint = "/v4/property/advancedsearch"
        params = {
            'page': page,
            'pageSize': page_size,
            'propertyType': property_type,
            'location': {
                'city': city,
                'state': state
            }
        }
        
        if start_date and end_date:
            params['dateRange'] = {
                'startDate': start_date,
                'endDate': end_date
            }
        
        response = self.fetch_with_retry(endpoint, params)
        
        if response.success and response.data:
            properties = response.data.get('property', [])
            self.logger.info(f"Found {len(properties)} properties in search")
            return properties
        else:
            self.logger.error(f"Property search failed: {response.error}")
            return []
    
    def fetch_all_properties_in_city(
        self,
        city: str,
        state: str,
        property_type: str = "RESIDENTIAL",
        start_date: Optional[str] = None,
        end_date: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        """
        Fetch all properties in a city with pagination.
        
        Args:
            city: City name
            state: State code
            property_type: Property type filter
            start_date: Start date for transactions
            end_date: End date for transactions
            
        Returns:
            Complete list of properties
        """
        all_properties = []
        page = 1
        page_size = 500
        
        while True:
            properties = self.search_properties(
                city=city,
                state=state,
                property_type=property_type,
                start_date=start_date,
                end_date=end_date,
                page=page,
                page_size=page_size
            )
            
            if not properties:
                break
            
            all_properties.extend(properties)
            
            if len(properties) < page_size:
                break
            
            page += 1
            self.logger.info(f"Fetched page {page}, total properties: {len(all_properties)}")
        
        self.logger.info(f"Total properties fetched: {len(all_properties)}")
        return all_properties
    
    def transform_to_canonical(self, raw_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Transform ATTOM raw data to canonical format.
        
        Args:
            raw_data: Raw ATTOM API response
            
        Returns:
            Canonical property data
        """
        try:
            identifier = raw_data.get('identifier', {})
            location = raw_data.get('location', {})
            address = location.get('address', {})
            summary = raw_data.get('summary', {})
            assessment = raw_data.get('assessment', {})
            sale_history = raw_data.get('saleHistory', [])
            
            # Generate canonical property ID
            canonical_id = self.generate_property_id(
                address.get('line1', ''),
                address.get('city', ''),
                address.get('state', '')
            )
            
            canonical_data = {
                'property_id': canonical_id,
                'attom_property_id': identifier.get('obPropId'),
                'parcel_id': identifier.get('apn'),
                'address': address.get('line1'),
                'city': address.get('city'),
                'state_code': address.get('state'),
                'zip': address.get('postalCode'),
                'latitude': location.get('latitude'),
                'longitude': location.get('longitude'),
                'property_type': self._normalize_property_type(summary.get('propType')),
                'year_built': summary.get('yearBuilt'),
                'living_area_sqft': self._extract_area(summary.get('area', {}), 'buildingArea'),
                'lot_size_sqft': self._extract_area(summary.get('area', {}), 'lotSizeArea'),
                'bedrooms': summary.get('rooms', {}).get('bedrooms'),
                'bathrooms': summary.get('rooms', {}).get('bathroomsTotal'),
                'stories': summary.get('stories'),
                'garage': summary.get('garage', {}).get('spaces'),
                'pool': self._convert_pool_to_bool(summary.get('pool', {}).get('type')),
                'tax_assessed_value': assessment.get('assessedValue', {}).get('assdValue'),
                'annual_property_tax': assessment.get('tax', {}).get('taxAmount'),
                'last_sale_price': sale_history[0].get('price') if sale_history else None,
                'last_sale_date': self._parse_date(sale_history[0].get('recordingDate')) if sale_history else None,
                'data_quality_score': self.calculate_data_quality_score({})
            }
            
            # Archive raw response
            self.archive_raw_response('attom', raw_data, canonical_id)
            
            return canonical_data
            
        except Exception as e:
            self.logger.error(f"Transformation failed: {str(e)}")
            return {}
    
    def transform_sales_history(self, raw_transactions: List[Dict[str, Any]], property_id: str) -> List[Dict[str, Any]]:
        """
        Transform sales history to canonical format.
        
        Args:
            raw_transactions: Raw ATTOM sales transactions
            property_id: Canonical property ID
            
        Returns:
            List of canonical sales records
        """
        canonical_sales = []
        
        for transaction in raw_transactions:
            canonical_sale = {
                'property_id': property_id,
                'sale_date': self._parse_date(transaction.get('saleDate')),
                'sale_price': transaction.get('price'),
                'document_type': transaction.get('documentType'),
                'seller_name': transaction.get('sellerName'),
                'buyer_name': transaction.get('buyerName'),
                'mortgage_amount': transaction.get('mortgageAmount'),
                'loan_type': transaction.get('loanType')
            }
            canonical_sales.append(canonical_sale)
        
        return canonical_sales
    
    def validate_data(self, data: Dict[str, Any]) -> bool:
        """
        Validate canonical data quality.
        
        Args:
            data: Canonical property data
            
        Returns:
            True if valid, False otherwise
        """
        # Check critical fields
        critical_fields = ['property_id', 'address', 'city', 'state_code']
        for field in critical_fields:
            if not data.get(field):
                self.logger.warning(f"Missing critical field: {field}")
                return False
        
        # Validate coordinates
        lat = data.get('latitude')
        lng = data.get('longitude')
        if lat and lng:
            if abs(lat) > 90 or abs(lng) > 180:
                self.logger.warning(f"Invalid coordinates: {lat}, {lng}")
                return False
        
        # Validate year built
        year_built = data.get('year_built')
        if year_built:
            current_year = datetime.now().year
            if year_built < 1800 or year_built > current_year + 1:
                self.logger.warning(f"Invalid year built: {year_built}")
                return False
        
        # Validate living area
        living_area = data.get('living_area_sqft')
        if living_area and (living_area < 100 or living_area > 50000):
            self.logger.warning(f"Invalid living area: {living_area}")
            return False
        
        return True
    
    def _normalize_property_type(self, prop_type: Optional[str]) -> str:
        """Normalize property type to canonical values."""
        if not prop_type:
            return 'unknown'
        
        type_mapping = {
            'Single Family Residence': 'single_family',
            'Single Family': 'single_family',
            'Condominium': 'condo',
            'Townhouse': 'townhouse',
            'Multi-Family': 'multi_family',
            'Commercial': 'commercial',
            'Industrial': 'industrial',
            'Land': 'land'
        }
        
        prop_type_lower = prop_type.lower()
        for key, value in type_mapping.items():
            if key.lower() in prop_type_lower:
                return value
        
        return 'other'
    
    def _extract_area(self, area_data: Dict[str, Any], area_type: str) -> Optional[int]:
        """Extract area value from nested structure."""
        if area_data and area_type in area_data:
            return area_data.get(area_type)
        return None
    
    def _convert_pool_to_bool(self, pool_type: Optional[str]) -> bool:
        """Convert pool type to boolean."""
        if not pool_type:
            return False
        return pool_type.lower() != 'none'
    
    def _parse_date(self, date_str: Optional[str]) -> Optional[str]:
        """Parse date string to ISO format."""
        if not date_str:
            return None
        try:
            dt = datetime.strptime(date_str, '%Y-%m-%d')
            return dt.isoformat()
        except ValueError:
            return None
    
    def _get_target_table(self) -> str:
        """Get target table for ATTOM property data."""
        return "attom_properties"
    
    def _get_conflict_columns(self) -> List[str]:
        """Get columns for conflict detection."""
        return ['property_id']


class ATTOMSalesHistoryAdapter(BaseAdapter):
    """Specific adapter for ATTOM sales history data."""
    
    def __init__(self, config: Dict[str, Any]):
        super().__init__(config)
        self.api_key = config.get('attom_api_key')
        self.base_url = "https://api.developer.attomdata.com"
    
    def _get_default_headers(self) -> Dict[str, str]:
        return {
            'apikey': self.api_key,
            'accept': 'application/json'
        }
    
    def fetch_property(self, property_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Not applicable for sales history adapter."""
        return None
    
    def transform_to_canonical(self, raw_data: Dict[str, Any]) -> Dict[str, Any]:
        """Not applicable for sales history adapter."""
        return {}
    
    def validate_data(self, data: Dict[str, Any]) -> bool:
        """Not applicable for sales history adapter."""
        return True
    
    def fetch_and_save_sales_history(
        self,
        attom_property_id: str,
        canonical_property_id: str,
        start_year: int = 2010,
        end_year: int = 2024
    ) -> int:
        """
        Fetch and save sales history for a property.
        
        Args:
            attom_property_id: ATTOM property ID
            canonical_property_id: Canonical property ID
            start_year: Start year for history
            end_year: End year for history
            
        Returns:
            Number of sales records saved
        """
        endpoint = "/v4/transaction/saleshistory"
        params = {
            'propertyId': attom_property_id,
            'startYear': start_year,
            'endYear': end_year
        }
        
        response = self.fetch_with_retry(endpoint, params)
        
        if response.success and response.data:
            transactions = response.data.get('transaction', [])
            
            for transaction in transactions:
                canonical_sale = {
                    'property_id': canonical_property_id,
                    'sale_date': self._parse_date(transaction.get('saleDate')),
                    'sale_price': transaction.get('price'),
                    'document_type': transaction.get('documentType'),
                    'seller_name': transaction.get('sellerName'),
                    'buyer_name': transaction.get('buyerName'),
                    'mortgage_amount': transaction.get('mortgageAmount'),
                    'loan_type': transaction.get('loanType'),
                    'raw_response': json.dumps(transaction)
                }
                
                self.save_to_database(
                    'attom_sales_history',
                    canonical_sale,
                    ['property_id', 'sale_date']
                )
            
            return len(transactions)
        
        return 0
    
    def batch_fetch_sales_history(
        self,
        property_ids: List[Tuple[str, str]],
        start_year: int = 2010,
        end_year: int = 2024
    ) -> Dict[str, int]:
        """
        Fetch sales history for multiple properties.
        
        Args:
            property_ids: List of (attom_property_id, canonical_property_id) tuples
            start_year: Start year for history
            end_year: End year for history
            
        Returns:
            Dictionary mapping property_id to number of sales records fetched
        """
        results = {}
        
        for attom_id, canonical_id in property_ids:
            try:
                count = self.fetch_and_save_sales_history(
                    attom_id, canonical_id, start_year, end_year
                )
                results[canonical_id] = count
                self.logger.info(f"Fetched {count} sales records for {canonical_id}")
            except Exception as e:
                self.logger.error(f"Failed to fetch sales history for {canonical_id}: {str(e)}")
                results[canonical_id] = 0
        
        return results
    
    def _parse_date(self, date_str: Optional[str]) -> Optional[str]:
        """Parse date string to ISO format."""
        if not date_str:
            return None
        try:
            dt = datetime.strptime(date_str, '%Y-%m-%d')
            return dt.isoformat()
        except ValueError:
            return None
    
    def _get_target_table(self) -> str:
        """Get target table for sales history."""
        return "attom_sales_history"
    
    def _get_conflict_columns(self) -> List[str]:
        """Get columns for conflict detection."""
        return ['property_id', 'sale_date']