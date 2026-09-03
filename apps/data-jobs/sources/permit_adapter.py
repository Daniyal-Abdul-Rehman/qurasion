"""
Building Permit Data Adapter
Implements data fetching and transformation for building permit data
"""

from typing import Dict, Any, Optional, List
from datetime import datetime, timedelta
import requests
from .base_adapter import BaseAdapter, APIResponse

class PermitAdapter(BaseAdapter):
    """
    Building Permit Data Adapter
    
    Handles:
    - Building permit data from local government sources
    - Property improvement tracking
    - Data transformation to canonical format
    """
    
    def __init__(self, config: Dict[str, Any]):
        super().__init__(config)
        self.base_url = config.get('base_url', '')
        # Building permit data sources vary by jurisdiction
        # This adapter provides a framework for different permit APIs
        
    def _get_default_headers(self) -> Dict[str, str]:
        """Get default headers for permit API requests."""
        return {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'application/json'
        }
    
    def fetch_property(self, property_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """
        Fetch permit data for a specific property.
        
        Args:
            property_data: Dictionary containing address, city, state
            
        Returns:
            Raw permit data or None if failed
        """
        address = property_data.get('address')
        city = property_data.get('city')
        state = property_data.get('state_code')
        
        if not all([address, city, state]):
            self.logger.error("Missing required address fields")
            return None
        
        # This would be implemented based on specific jurisdiction APIs
        # For now, return a placeholder structure
        self.logger.warning("Permit data fetching requires jurisdiction-specific API integration")
        return None
    
    def fetch_permits_by_address(
        self,
        address: str,
        city: str,
        state: str,
        start_date: Optional[str] = None,
        end_date: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        """
        Fetch permits for a specific address.
        
        Args:
            address: Street address
            city: City name
            state: State code
            start_date: Start date for permit search (YYYY-MM-DD)
            end_date: End date for permit search (YYYY-MM-DD)
            
        Returns:
            List of permit records
        """
        # Placeholder implementation
        # In production, this would call jurisdiction-specific APIs
        self.logger.warning("Permit data fetching requires jurisdiction-specific API integration")
        return []
    
    def fetch_permits_by_property_id(
        self,
        property_id: str,
        jurisdiction: str
    ) -> List[Dict[str, Any]]:
        """
        Fetch permits for a property ID from a specific jurisdiction.
        
        Args:
            property_id: Property identifier
            jurisdiction: Jurisdiction name/code
            
        Returns:
            List of permit records
        """
        # This would be implemented based on jurisdiction APIs
        # Example jurisdictions: Dallas, TX; Los Angeles, CA; etc.
        self.logger.warning(f"Permit data for {jurisdiction} requires specific API integration")
        return []
    
    def transform_to_canonical(self, raw_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Transform permit raw data to canonical format.
        
        Args:
            raw_data: Raw permit data
            
        Returns:
            Canonical permit data
        """
        try:
            canonical_data = {
                'permit_id': raw_data.get('permit_id'),
                'property_id': raw_data.get('property_id'),
                'permit_type': self._normalize_permit_type(raw_data.get('permit_type')),
                'permit_date': self._parse_date(raw_data.get('permit_date')),
                'description': raw_data.get('description'),
                'estimated_cost': self._safe_int(raw_data.get('estimated_cost')),
                'contractor_name': raw_data.get('contractor_name'),
                'permit_status': self._normalize_permit_status(raw_data.get('status')),
                'completion_date': self._parse_date(raw_data.get('completion_date')),
                'raw_response': raw_data
            }
            
            return canonical_data
            
        except Exception as e:
            self.logger.error(f"Permit transformation failed: {str(e)}")
            return {}
    
    def validate_data(self, data: Dict[str, Any]) -> bool:
        """
        Validate permit data quality.
        
        Args:
            data: Canonical permit data
            
        Returns:
            True if valid, False otherwise
        """
        # Check critical fields
        critical_fields = ['permit_id', 'property_id', 'permit_type']
        for field in critical_fields:
            if not data.get(field):
                self.logger.warning(f"Missing critical field: {field}")
                return False
        
        # Validate permit date
        permit_date = data.get('permit_date')
        if permit_date:
            try:
                parsed_date = datetime.fromisoformat(permit_date)
                if parsed_date > datetime.now() + timedelta(days=30):
                    self.logger.warning(f"Future permit date: {permit_date}")
                    return False
            except ValueError:
                self.logger.warning(f"Invalid permit date format: {permit_date}")
                return False
        
        # Validate estimated cost
        estimated_cost = data.get('estimated_cost')
        if estimated_cost and (estimated_cost < 0 or estimated_cost > 10000000):
            self.logger.warning(f"Invalid estimated cost: {estimated_cost}")
            return False
        
        return True
    
    def fetch_and_save_permits(
        self,
        property_ids: List[str],
        jurisdiction: str
    ) -> int:
        """
        Fetch and save permits for multiple properties.
        
        Args:
            property_ids: List of property IDs
            jurisdiction: Jurisdiction name/code
            
        Returns:
            Number of permits saved
        """
        saved_count = 0
        
        for property_id in property_ids:
            try:
                permits = self.fetch_permits_by_property_id(property_id, jurisdiction)
                
                for permit in permits:
                    canonical = self.transform_to_canonical(permit)
                    if self.validate_data(canonical):
                        self.save_to_database(
                            self._get_target_table(),
                            canonical,
                            self._get_conflict_columns()
                        )
                        saved_count += 1
                    
            except Exception as e:
                self.logger.error(f"Failed to fetch permits for {property_id}: {str(e)}")
        
        self.logger.info(f"Saved {saved_count} permit records")
        return saved_count
    
    def calculate_permit_features(
        self,
        property_id: str,
        years_back: int = 5
    ) -> Dict[str, Any]:
        """
        Calculate derived permit features for ML models.
        
        Args:
            property_id: Property ID
            years_back: Number of years to look back
            
        Returns:
            Dictionary of derived permit features
        """
        from sqlalchemy import text
        from datetime import datetime, timedelta
        
        session = self.Session()
        try:
            cutoff_date = datetime.now() - timedelta(days=years_back * 365)
            
            query = text("""
                SELECT 
                    permit_type,
                    permit_date,
                    estimated_cost,
                    completion_date,
                    permit_status
                FROM property_permits
                WHERE property_id = :property_id
                AND permit_date >= :cutoff_date
                ORDER BY permit_date DESC
            """)
            
            result = session.execute(query, {
                'property_id': property_id,
                'cutoff_date': cutoff_date
            }).fetchall()
            
            if not result:
                return {}
            
            # Calculate features
            recent_permits = len(result)
            renovation_value = sum(p.estimated_cost or 0 for p in result)
            
            # Check for recent renovation (completed in last 5 years)
            recent_renovation = any(
                p.completion_date and 
                datetime.fromisoformat(p.completion_date) >= cutoff_date
                for p in result
            )
            
            # Assess property condition based on work types
            improvement_types = set(p.permit_type for p in result)
            property_condition = self._assess_property_condition(improvement_types)
            
            # Calculate improvement rate (permits per year)
            improvement_rate = recent_permits / years_back if years_back > 0 else 0
            
            return {
                'recent_renovation': recent_renovation,
                'renovation_value': renovation_value,
                'property_condition': property_condition,
                'improvement_rate': improvement_rate,
                'total_recent_permits': recent_permits
            }
            
        except Exception as e:
            self.logger.error(f"Failed to calculate permit features: {str(e)}")
            return {}
        finally:
            session.close()
    
    def _normalize_permit_type(self, permit_type: Optional[str]) -> str:
        """Normalize permit type to canonical values."""
        if not permit_type:
            return 'unknown'
        
        type_mapping = {
            'residential addition': 'addition',
            'garage': 'garage',
            'renovation': 'renovation',
            'electrical': 'electrical',
            'plumbing': 'plumbing',
            'hvac': 'hvac',
            'roofing': 'roofing',
            'demolition': 'demolition',
            'new construction': 'new_construction'
        }
        
        permit_type_lower = permit_type.lower()
        for key, value in type_mapping.items():
            if key in permit_type_lower:
                return value
        
        return 'other'
    
    def _normalize_permit_status(self, status: Optional[str]) -> str:
        """Normalize permit status to canonical values."""
        if not status:
            return 'unknown'
        
        status_mapping = {
            'completed': 'completed',
            'approved': 'approved',
            'pending': 'pending',
            'in progress': 'in_progress',
            'denied': 'denied',
            'expired': 'expired',
            'closed': 'completed'
        }
        
        status_lower = status.lower()
        for key, value in status_mapping.items():
            if key in status_lower:
                return value
        
        return 'other'
    
    def _assess_property_condition(self, improvement_types: set) -> str:
        """Assess property condition based on improvement types."""
        if not improvement_types:
            return 'unknown'
        
        # Recent major improvements suggest good condition
        major_improvements = {'renovation', 'addition', 'new_construction', 'roofing'}
        
        if any(imp in improvement_types for imp in major_improvements):
            return 'excellent'
        elif len(improvement_types) >= 2:
            return 'good'
        elif len(improvement_types) == 1:
            return 'fair'
        else:
            return 'poor'
    
    def _parse_date(self, date_str: Optional[str]) -> Optional[str]:
        """Parse date string to ISO format."""
        if not date_str:
            return None
        try:
            dt = datetime.strptime(date_str, '%Y-%m-%d')
            return dt.isoformat()
        except ValueError:
            return None
    
    def _safe_int(self, value: Any) -> Optional[int]:
        """Safely convert to integer."""
        try:
            return int(value) if value is not None else None
        except (ValueError, TypeError):
            return None
    
    def _get_target_table(self) -> str:
        """Get target table for permit data."""
        return "property_permits"
    
    def _get_conflict_columns(self) -> List[str]:
        """Get columns for conflict detection."""
        return ['permit_id']