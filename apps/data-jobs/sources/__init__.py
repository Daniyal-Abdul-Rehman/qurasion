"""
Data Source Adapters Package
"""

from .base_adapter import (
    BaseAdapter,
    APIResponse,
    IngestionResult,
    APIBudgetManager,
    DataCache
)
from .attom_adapter import (
    ATTOMAdapter,
    ATTOMSalesHistoryAdapter
)
from .rentcast_adapter import (
    RentCastAdapter,
    RentCastListingsAdapter
)
from .census_adapter import (
    CensusAdapter,
    CensusGeographicEnrichment
)
from .fhfa_adapter import FHFAAdapter
from .redfin_adapter import RedfinAdapter
from .permit_adapter import PermitAdapter
from .environmental_adapter import EnvironmentalAdapter

__all__ = [
    'BaseAdapter',
    'APIResponse',
    'IngestionResult',
    'APIBudgetManager',
    'DataCache',
    'ATTOMAdapter',
    'ATTOMSalesHistoryAdapter',
    'RentCastAdapter',
    'RentCastListingsAdapter',
    'CensusAdapter',
    'CensusGeographicEnrichment',
    'FHFAAdapter',
    'RedfinAdapter',
    'PermitAdapter',
    'EnvironmentalAdapter'
]