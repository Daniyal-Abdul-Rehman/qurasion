"""
RentCast API Adapter
Implements data fetching and transformation for RentCast API
"""

from typing import Dict, Any, Optional, List
from datetime import datetime
import json
from .base_adapter import BaseAdapter, APIResponse

class RentCastAdapter(BaseAdapter):
    """
    RentCast API Adapter
    
    Handles:
    - Property detail fetching
    - Property search and pagination
    - Rental listings retrieval
    - Data transformation to canonical format
    """
    
    def __init__(self, config: Dict[str, Any]):
        super().__init__(config)
        self.api_key = config.get('rentcast_api_key')
        self.base_url = "https://api.rentcast.io/v1"
        
    def _get_default_headers(self) -> Dict[str, str]:
        """Get default headers for RentCast API requests."""
        return {
            'X-API-Key': self.api_key,
            'accept': 'application/json',
            'content-type': 'application/json'
        }
    
    def fetch_property(self, property_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """
        Fetch property details from RentCast API.
        
        Args:
            property_data: Dictionary containing address, city, state, zip
            
        Returns:
            Raw property data from RentCast API or None if failed
        """
        address = property_data.get('address')
        city = property_data.get('city')
        state = property_data.get('state_code')
        zip_code = property_data.get('zip')
        
        if not all([address, city, state]):
            self.logger.error("Missing required address fields")
            return None
        
        # Use property lookup endpoint
        endpoint = "/properties/lookup"
        params = {
            'address': address,
            'city': city,
            'state': state,
            'zipCode': zip_code
        }
        
        response = self.fetch_with_retry(endpoint, params)
        
        if response.success and response.data:
            self.logger.info(f"Successfully fetched property: {address}")
            return response.data
        else:
            self.logger.error(f"Failed to fetch property: {response.error}")
            return None
    
    def search_properties(
        self,
        city: str,
        state: str,
        property_type: str = "Single Family",
        bedrooms: Optional[int] = None,
        bathrooms: Optional[int] = None,
        min_square_footage: Optional[int] = None,
        max_square_footage: Optional[int] = None,
        page: int = 1,
        limit: int = 500
    ) -> List[Dict[str, Any]]:
        """
        Search for properties by geographic criteria.
        
        Args:
            city: City name
            state: State code
            property_type: Property type filter
            bedrooms: Number of bedrooms filter
            bathrooms: Number of bathrooms filter
            min_square_footage: Minimum square footage
            max_square_footage: Maximum square footage
            page: Page number
            limit: Records per page (max 500)
            
        Returns:
            List of properties matching criteria
        """
        endpoint = "/properties/search"
        params = {
            'city': city,
            'state': state,
            'propertyType': property_type,
            'page': page,
            'limit': limit
        }
        
        if bedrooms is not None:
            params['bedrooms'] = bedrooms
        if bathrooms is not None:
            params['bathrooms'] = bathrooms
        if min_square_footage is not None:
            params['minSquareFootage'] = min_square_footage
        if max_square_footage is not None:
            params['maxSquareFootage'] = max_square_footage
        
        response = self.fetch_with_retry(endpoint, params)
        
        if response.success and response.data:
            properties = response.data.get('data', [])
            self.logger.info(f"Found {len(properties)} properties in search")
            return properties
        else:
            self.logger.error(f"Property search failed: {response.error}")
            return []
    
    def fetch_rental_listings(
        self,
        city: str,
        state: str,
        property_type: str = "Single Family",
        status: str = "Active",
        page: int = 1,
        limit: int = 500
    ) -> List[Dict[str, Any]]:
        """
        Fetch current rental listings.
        
        Args:
            city: City name
            state: State code
            property_type: Property type filter
            status: Listing status filter
            page: Page number
            limit: Records per page (max 500)
            
        Returns:
            List of rental listings
        """
        endpoint = "/listings"
        params = {
            'city': city,
            'state': state,
            'propertyType': property_type,
            'status': status,
            'page': page,
            'limit': limit
        }
        
        response = self.fetch_with_retry(endpoint, params)
        
        if response.success and response.data:
            listings = response.data.get('data', [])
            self.logger.info(f"Fetched {len(listings)} rental listings")
            return listings
        else:
            self.logger.error(f"Failed to fetch listings: {response.error}")
            return []
    
    def fetch_all_properties_in_city(
        self,
        city: str,
        state: str,
        property_type: str = "Single Family",
        bedrooms: Optional[int] = None,
        bathrooms: Optional[int] = None
    ) -> List[Dict[str, Any]]:
        """
        Fetch all properties in a city with pagination.
        
        Args:
            city: City name
            state: State code
            property_type: Property type filter
            bedrooms: Number of bedrooms filter
            bathrooms: Number of bathrooms filter
            
        Returns:
            Complete list of properties
        """
        all_properties = []
        page = 1
        limit = 500
        
        while True:
            properties = self.search_properties(
                city=city,
                state=state,
                property_type=property_type,
                bedrooms=bedrooms,
                bathrooms=bathrooms,
                page=page,
                limit=limit
            )
            
            if not properties:
                break
            
            all_properties.extend(properties)
            
            if len(properties) < limit:
                break
            
            page += 1
            self.logger.info(f"Fetched page {page}, total properties: {len(all_properties)}")
        
        self.logger.info(f"Total properties fetched: {len(all_properties)}")
        return all_properties
    
    def transform_to_canonical(self, raw_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Transform RentCast raw data to canonical format.
        
        Args:
            raw_data: Raw RentCast API response
            
        Returns:
            Canonical property data
        """
        try:
            address = raw_data.get('address', {})
            location = raw_data.get('location', {})
            details = raw_data.get('details', {})
            valuation = raw_data.get('valuation', {})
            tax = raw_data.get('tax', {})
            rental = raw_data.get('rental', {})
            
            # Generate canonical property ID
            canonical_id = self.generate_property_id(
                address.get('street', ''),
                address.get('city', ''),
                address.get('state', '')
            )
            
            canonical_data = {
                'property_id': canonical_id,
                'rentcast_property_id': raw_data.get('propertyId'),
                'address': address.get('street'),
                'city': address.get('city'),
                'state_code': address.get('state'),
                'zip': address.get('zipCode'),
                'latitude': location.get('latitude'),
                'longitude': location.get('longitude'),
                'property_type': self._normalize_property_type(details.get('propertyType')),
                'year_built': details.get('yearBuilt'),
                'living_area_sqft': details.get('squareFootage'),
                'lot_size_sqft': details.get('lotSize'),
                'bedrooms': details.get('bedrooms'),
                'bathrooms': details.get('bathrooms'),
                'stories': details.get('stories'),
                'garage': details.get('garage'),
                'pool': details.get('pool'),
                'tax_assessed_value': valuation.get('assessedValue'),
                'last_sale_price': valuation.get('lastSalePrice'),
                'last_sale_date': self._parse_date(valuation.get('lastSaleDate')),
                'estimated_value': valuation.get('estimatedValue'),
                'annual_property_tax': tax.get('annualTax'),
                'estimated_rent': rental.get('estimatedRent'),
                'rent_estimate_low': rental.get('rentRange', {}).get('low'),
                'rent_estimate_high': rental.get('rentRange', {}).get('high'),
                'rent_per_sqft': rental.get('rentPerSquareFoot'),
                'data_quality_score': self.calculate_data_quality_score({})
            }
            
            # Archive raw response
            self.archive_raw_response('rentcast', raw_data, canonical_id)
            
            return canonical_data
            
        except Exception as e:
            self.logger.error(f"Transformation failed: {str(e)}")
            return {}
    
    def transform_rental_listing(self, raw_listing: Dict[str, Any]) -> Dict[str, Any]:
        """
        Transform rental listing to canonical format.
        
        Args:
            raw_listing: Raw RentCast listing data
            
        Returns:
            Canonical listing data
        """
        listing = raw_listing.get('listing', {})
        address = raw_listing.get('address', {})
        
        canonical_listing = {
            'listing_id': raw_listing.get('listingId'),
            'property_id': raw_listing.get('propertyId'),
            'list_price': listing.get('price'),
            'currency': listing.get('currency', 'USD'),
            'period': listing.get('period', 'Monthly'),
            'listing_status': listing.get('status'),
            'list_date': self._parse_date(listing.get('listedDate')),
            'days_on_market': listing.get('daysOnMarket')
        }
        
        return canonical_listing
    
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
        
        # Validate rent estimates
        estimated_rent = data.get('estimated_rent')
        if estimated_rent and (estimated_rent < 100 or estimated_rent > 50000):
            self.logger.warning(f"Invalid estimated rent: {estimated_rent}")
            return False
        
        return True
    
    def _normalize_property_type(self, prop_type: Optional[str]) -> str:
        """Normalize property type to canonical values."""
        if not prop_type:
            return 'unknown'
        
        type_mapping = {
            'Single Family': 'single_family',
            'Condominium': 'condo',
            'Townhouse': 'townhouse',
            'Multi-Family': 'multi_family',
            'Apartment': 'apartment',
            'Commercial': 'commercial',
            'Industrial': 'industrial',
            'Land': 'land'
        }
        
        prop_type_lower = prop_type.lower()
        for key, value in type_mapping.items():
            if key.lower() in prop_type_lower:
                return value
        
        return 'other'
    
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
        """Get target table for RentCast property data."""
        return "rentcast_properties"
    
    def _get_conflict_columns(self) -> List[str]:
        """Get columns for conflict detection."""
        return ['property_id']


class RentCastListingsAdapter(BaseAdapter):
    """Specific adapter for RentCast rental listings data."""
    
    def __init__(self, config: Dict[str, Any]):
        super().__init__(config)
        self.api_key = config.get('rentcast_api_key')
        self.base_url = "https://api.rentcast.io/v1"
    
    def _get_default_headers(self) -> Dict[str, str]:
        return {
            'X-API-Key': self.api_key,
            'accept': 'application/json'
        }
    
    def fetch_property(self, property_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Not applicable for listings adapter."""
        return None
    
    def transform_to_canonical(self, raw_data: Dict[str, Any]) -> Dict[str, Any]:
        """Not applicable for listings adapter."""
        return {}
    
    def validate_data(self, data: Dict[str, Any]) -> bool:
        """Not applicable for listings adapter."""
        return True
    
    def fetch_and_save_listings(
        self,
        city: str,
        state: str,
        property_type: str = "Single Family",
        status: str = "Active"
    ) -> int:
        """
        Fetch and save rental listings for a city.
        
        Args:
            city: City name
            state: State code
            property_type: Property type filter
            status: Listing status filter
            
        Returns:
            Number of listings saved
        """
        all_listings = []
        page = 1
        limit = 500
        
        while True:
            endpoint = "/listings"
            params = {
                'city': city,
                'state': state,
                'propertyType': property_type,
                'status': status,
                'page': page,
                'limit': limit
            }
            
            response = self.fetch_with_retry(endpoint, params)
            
            if response.success and response.data:
                listings = response.data.get('data', [])
                
                for listing in listings:
                    canonical_listing = self._transform_listing(listing)
                    self.save_to_database(
                        'rentcast_listings',
                        canonical_listing,
                        ['listing_id']
                    )
                
                all_listings.extend(listings)
                
                if len(listings) < limit:
                    break
                
                page += 1
            else:
                break
        
        self.logger.info(f"Saved {len(all_listings)} rental listings")
        return len(all_listings)
    
    def batch_fetch_listings_by_zip(
        self,
        zip_codes: List[str],
        property_type: str = "Single Family",
        status: str = "Active"
    ) -> Dict[str, int]:
        """
        Fetch rental listings for multiple zip codes.
        
        Args:
            zip_codes: List of zip codes
            property_type: Property type filter
            status: Listing status filter
            
        Returns:
            Dictionary mapping zip code to number of listings fetched
        """
        results = {}
        
        for zip_code in zip_codes:
            try:
                endpoint = "/listings"
                params = {
                    'zipCode': zip_code,
                    'propertyType': property_type,
                    'status': status,
                    'page': 1,
                    'limit': 500
                }
                
                response = self.fetch_with_retry(endpoint, params)
                
                if response.success and response.data:
                    listings = response.data.get('data', [])
                    
                    for listing in listings:
                        canonical_listing = self._transform_listing(listing)
                        self.save_to_database(
                            'rentcast_listings',
                            canonical_listing,
                            ['listing_id']
                        )
                    
                    results[zip_code] = len(listings)
                    self.logger.info(f"Fetched {len(listings)} listings for zip {zip_code}")
                else:
                    results[zip_code] = 0
                    
            except Exception as e:
                self.logger.error(f"Failed to fetch listings for zip {zip_code}: {str(e)}")
                results[zip_code] = 0
        
        return results
    
    def _transform_listing(self, raw_listing: Dict[str, Any]) -> Dict[str, Any]:
        """Transform individual listing to canonical format."""
        listing = raw_listing.get('listing', {})
        
        return {
            'listing_id': raw_listing.get('listingId'),
            'property_id': raw_listing.get('propertyId'),
            'list_price': listing.get('price'),
            'currency': listing.get('currency', 'USD'),
            'period': listing.get('period', 'Monthly'),
            'listing_status': listing.get('status'),
            'list_date': self._parse_date(listing.get('listedDate')),
            'days_on_market': listing.get('daysOnMarket')
        }
    
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
        """Get target table for rental listings."""
        return "rentcast_listings"
    
    def _get_conflict_columns(self) -> List[str]:
        """Get columns for conflict detection."""
        return ['listing_id']