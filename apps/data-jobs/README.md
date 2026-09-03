# Data Jobs - Property Data Ingestion Pipeline

A comprehensive data ingestion system for property data from multiple sources including ATTOM Data Solutions, RentCast API, and U.S. Census Bureau. This implementation follows the technical specification outlined in `data_source_specification.md`.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Usage](#usage)
- [Data Sources](#data-sources)
- [Monitoring](#monitoring)
- [Development](#development)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

This data ingestion pipeline provides a robust, scalable solution for acquiring property data from multiple external APIs, transforming it to a canonical format, and storing it in a centralized database. The system is designed with production-ready features including:

- **Multi-source data ingestion** (ATTOM, RentCast, Census)
- **Rate limiting and API budget management**
- **Data quality monitoring and validation**
- **Automatic retry logic with exponential backoff**
- **Caching for cost optimization**
- **Geographic enrichment with census data**
- **Comprehensive logging and error handling**

## 🏗️ Architecture

### Component Structure

```
data-jobs/
├── config/                 # Configuration management
│   └── config_manager.py
├── database/              # Database schemas and migrations
│   └── schema.sql
├── examples/              # Example usage scripts
│   ├── example_property_ingestion.py
│   └── example_census_ingestion.py
├── monitoring/            # Data quality monitoring
│   └── data_quality_monitor.py
├── pipelines/             # Main orchestration logic
│   └── data_ingestion_pipeline.py
├── sources/               # Data source adapters
│   ├── base_adapter.py
│   ├── attom_adapter.py
│   ├── rentcast_adapter.py
│   └── census_adapter.py
├── requirements.txt       # Python dependencies
└── .env.example          # Environment variables template
```

### Data Flow

```
External APIs → Adapters → Transformation → Validation → Database
                    ↓                    ↓              ↓
               Rate Limiting      Quality Scoring   Monitoring
                    ↓                    ↓
               Caching              Logging
```

## ✨ Features

### Phase 1: Core Property Data ✅
- **ATTOM Property Detail Endpoint**: Fetch comprehensive property information
- **ATTOM Property Search Endpoint**: Bulk property discovery by geographic criteria
- **RentCast Property Detail Endpoint**: Property details with rental estimates
- **RentCast Property Search Endpoint**: Market-wide property discovery

### Phase 2: Transaction Data ✅
- **ATTOM Sales History**: Comprehensive sales transaction history
- **RentCast Rental Listings**: Current rental market listings

### Phase 3: Market Data ✅
- **Census ACS Data**: Demographic and housing information
- **FHFA HPI Data**: House price index trends
- **Redfin Market Data**: Market statistics and metrics

### Phase 4: Geographic Data ✅
- **Census TIGER/Line Boundaries**: Precise geographic boundaries
- **Geographic Enrichment**: Point-in-polygon property-tract linking

### Phase 5: Specialized Data 🚧
- **Building Permit Data**: Property improvement tracking
- **Environmental Risk Data**: FEMA flood zones and hazards

## 🚀 Installation

### Prerequisites

- Python 3.8+
- PostgreSQL 12+ with PostGIS extension (for geographic features)
- Redis (optional, for caching)
- API keys for ATTOM and RentCast

### Setup Steps

1. **Clone the repository**
   ```bash
   cd /Users/karma/Desktop/qurasion/platform/apps/data-jobs
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your actual API keys and database credentials
   ```

5. **Set up database**
   ```bash
   # Create database
   createdb qurasion
   
   # Run schema migration
   psql -d qurasion -f database/schema.sql
   ```

## ⚙️ Configuration

### Environment Variables

The system can be configured using environment variables or a configuration file. Key variables include:

```bash
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=qurasion
DB_USER=postgres
DB_PASSWORD=your_password

# API Keys
ATTOM_API_KEY=your_attom_key
RENTCAST_API_KEY=your_rentcast_key
CENSUS_API_KEY=  # Optional

# Cache
REDIS_HOST=localhost
REDIS_PORT=6379

# Budget
MONTHLY_BUDGET_USD=1000.0

# Logging
LOG_LEVEL=INFO
```

### Configuration File

Alternatively, use a JSON configuration file:

```python
from config.config_manager import ConfigManager

config_manager = ConfigManager('config.json')
config = config_manager.get_config()
```

Generate a sample configuration file:

```python
config_manager = ConfigManager()
config_manager.save_sample_config('config.json')
```

## 🗄️ Database Setup

### Initial Setup

1. **Create database**
   ```sql
   CREATE DATABASE qurasion;
   ```

2. **Enable extensions**
   ```sql
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
   CREATE EXTENSION IF NOT EXISTS "postgis";
   ```

3. **Run schema migration**
   ```bash
   psql -d qurasion -f database/schema.sql
   ```

### Schema Overview

The database includes tables for:

- **Property Data**: `attom_properties`, `rentcast_properties`
- **Transaction Data**: `attom_sales_history`, `rentcast_listings`
- **Census Data**: `census_tract_data`, `census_tract_boundaries`
- **Market Data**: `fhfa_hpi_data`, `redfin_market_data`
- **Monitoring**: `data_ingestion_log`, `data_quality_metrics`

## 📖 Usage

### Basic Property Ingestion

```python
from pipelines.data_ingestion_pipeline import DataIngestionPipeline, PipelineConfig
from config.config_manager import ConfigManager

# Load configuration
config_manager = ConfigManager()
pipeline_config = PipelineConfig(
    database_url=config_manager.get_database_url(),
    attom_api_key=config_manager.get_config().api.attom_api_key,
    rentcast_api_key=config_manager.get_config().api.rentcast_api_key
)

# Initialize pipeline
pipeline = DataIngestionPipeline(pipeline_config)

# Ingest specific properties
properties = [
    {
        'address': '123 Main St',
        'city': 'Dallas',
        'state_code': 'TX',
        'zip': '75201'
    }
]

results = pipeline.run_property_ingestion(
    property_list=properties,
    sources=['attom', 'rentcast']
)
```

### City-Wide Ingestion

```python
# Ingest all properties in a city
results = pipeline.run_city_wide_ingestion(
    city='Dallas',
    state='TX',
    sources=['attom', 'rentcast']
)
```

### Census Data Update

```python
# Update census data for a county
results = pipeline.run_census_update(
    state_fips='48',  # Texas
    county_fips='113'  # Dallas County
)
```

### Data Quality Monitoring

```python
from monitoring.data_quality_monitor import DataQualityMonitor

monitor = DataQualityMonitor(database_url)

# Run quality check
quality_results = monitor.run_quality_check('attom', 'attom_properties')

print(f"Quality Score: {quality_results['quality_score']}")
print(f"Alerts: {len(quality_results['alerts'])}")
```

## 🔌 Data Sources

### ATTOM Data Solutions

**Endpoints Implemented:**
- Property Detail (`/v4/property/extendedprofile`)
- Property Search (`/v4/property/advancedsearch`)
- Sales History (`/v4/transaction/saleshistory`)

**Rate Limit:** 10 requests/second

**Cost:** ~$0.001 per request

### RentCast API

**Endpoints Implemented:**
- Property Lookup (`/properties/lookup`)
- Property Search (`/properties/search`)
- Rental Listings (`/listings`)

**Rate Limit:** 100 requests/minute

**Cost:** ~$0.0005 per request

### U.S. Census Bureau

**Endpoints Implemented:**
- ACS 5-Year Data (`/2022/acs/acs5`)

**Rate Limit:** 50 requests/minute

**Cost:** Free

## 📊 Monitoring

### Data Quality Metrics

The system automatically monitors:

- **Field Completeness**: Percentage of non-null critical fields
- **Data Validity**: Invalid coordinates, dates, prices
- **Duplicate Detection**: Duplicate property IDs
- **Data Freshness**: Age of ingested data
- **Overall Quality Score**: Composite metric (0.0 - 1.0)

### Budget Tracking

Monitor API usage and costs:

```python
budget_summary = pipeline.get_budget_summary()
print(f"Budget Utilization: {budget_summary['budget_utilization']:.2f}%")
```

### Logging

Logs are structured with the following format:

```
%(asctime)s - %(name)s - %(levelname)s - %(message)s
```

Configure log level via environment variable `LOG_LEVEL`.

## 🛠️ Development

### Running Tests

```bash
pytest tests/
pytest --cov=. tests/
```

### Code Style

```bash
black .
flake8 .
mypy .
```

### Adding New Data Sources

1. Create a new adapter in `sources/` extending `BaseAdapter`
2. Implement required abstract methods:
   - `_get_default_headers()`
   - `fetch_property()`
   - `transform_to_canonical()`
   - `validate_data()`
   - `_get_target_table()`
   - `_get_conflict_columns()`
3. Add database schema to `database/schema.sql`
4. Update configuration in `config/config_manager.py`
5. Add adapter to pipeline initialization

## 🔧 Troubleshooting

### Common Issues

**Issue: Database connection failed**
```
Solution: Check database credentials in .env file and ensure PostgreSQL is running
```

**Issue: API rate limit exceeded**
```
Solution: The system automatically handles rate limits with retry logic. 
Check budget configuration and consider increasing rate limits in config.
```

**Issue: Invalid API keys**
```
Solution: Verify API keys in .env file and ensure they have required permissions
```

**Issue: Redis connection failed**
```
Solution: Ensure Redis is running or disable caching by setting CACHE_ENABLED=false
```

### Debug Mode

Enable debug logging:

```bash
LOG_LEVEL=DEBUG python your_script.py
```

## 📚 Additional Resources

- [Data Source Specification](../data_source_specification.md)
- [ATTOM API Documentation](https://api.developer.attomdata.com/docs)
- [RentCast API Documentation](https://developers.rentcast.io/)
- [Census API Documentation](https://census.gov/data/software.html)

## 🤝 Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update documentation
4. Submit pull requests for review

## 📄 License

This project is part of the Qurasion platform. See main project LICENSE for details.

## 🆘 Support

For issues and questions:
- Check existing documentation
- Review troubleshooting section
- Contact development team