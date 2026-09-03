-- Database Schema for Data Source Implementation
-- Based on data_source_specification.md Phase 1 requirements
-- Includes ATTOM and RentCast property tables

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- ============================================
-- DATA INGESTION LOGGING
-- ============================================

CREATE TABLE IF NOT EXISTS data_ingestion_log (
    id SERIAL PRIMARY KEY,
    source VARCHAR(50) NOT NULL,
    endpoint VARCHAR(255) NOT NULL,
    records_processed INTEGER NOT NULL,
    records_successful INTEGER NOT NULL,
    records_failed INTEGER NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    status VARCHAR(20) NOT NULL,
    error_message TEXT,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ingestion_log_source ON data_ingestion_log(source);
CREATE INDEX idx_ingestion_log_time ON data_ingestion_log(start_time, end_time);

-- ============================================
-- ATTOM DATA SOLUTIONS TABLES
-- ============================================

-- ATTOM Properties Table
CREATE TABLE IF NOT EXISTS attom_properties (
    id SERIAL PRIMARY KEY,
    property_id VARCHAR(50) UNIQUE NOT NULL,
    attom_property_id VARCHAR(50),
    parcel_id VARCHAR(50),
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state_code CHAR(2) NOT NULL,
    zip VARCHAR(10) NOT NULL,
    latitude DECIMAL(10, 7),
    longitude DECIMAL(10, 7),
    property_type VARCHAR(50),
    year_built INTEGER,
    living_area_sqft INTEGER,
    lot_size_sqft INTEGER,
    bedrooms INTEGER,
    bathrooms DECIMAL(3, 1),
    stories INTEGER,
    garage INTEGER,
    pool BOOLEAN,
    tax_assessed_value INTEGER,
    annual_property_tax INTEGER,
    last_sale_price INTEGER,
    last_sale_date DATE,
    data_quality_score DECIMAL(3, 2),
    raw_response JSONB,
    ingested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_attom_property_id ON attom_properties(property_id);
CREATE INDEX idx_attom_address ON attom_properties(address, city, state_code);
CREATE INDEX idx_attom_location ON attom_properties(latitude, longitude);
CREATE INDEX idx_attom_ingested_at ON attom_properties(ingested_at);

-- ATTOM Sales History Table
CREATE TABLE IF NOT EXISTS attom_sales_history (
    id SERIAL PRIMARY KEY,
    property_id VARCHAR(50) NOT NULL,
    sale_date DATE NOT NULL,
    sale_price INTEGER NOT NULL,
    document_type VARCHAR(100),
    seller_name VARCHAR(255),
    buyer_name VARCHAR(255),
    mortgage_amount INTEGER,
    loan_type VARCHAR(50),
    raw_response JSONB,
    ingested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES attom_properties(property_id) ON DELETE CASCADE
);

CREATE INDEX idx_attom_sales_property_id ON attom_sales_history(property_id);
CREATE INDEX idx_attom_sales_date ON attom_sales_history(sale_date);
CREATE INDEX idx_attom_sales_property_date ON attom_sales_history(property_id, sale_date);

-- ============================================
-- RENTCAST API TABLES
-- ============================================

-- RentCast Properties Table
CREATE TABLE IF NOT EXISTS rentcast_properties (
    id SERIAL PRIMARY KEY,
    property_id VARCHAR(50) UNIQUE NOT NULL,
    rentcast_property_id VARCHAR(50),
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state_code CHAR(2) NOT NULL,
    zip VARCHAR(10) NOT NULL,
    latitude DECIMAL(10, 7),
    longitude DECIMAL(10, 7),
    property_type VARCHAR(50),
    year_built INTEGER,
    living_area_sqft INTEGER,
    lot_size_sqft INTEGER,
    bedrooms INTEGER,
    bathrooms DECIMAL(3, 1),
    stories INTEGER,
    garage INTEGER,
    pool BOOLEAN,
    tax_assessed_value INTEGER,
    last_sale_price INTEGER,
    last_sale_date DATE,
    estimated_value INTEGER,
    annual_property_tax INTEGER,
    estimated_rent INTEGER,
    rent_estimate_low INTEGER,
    rent_estimate_high INTEGER,
    rent_per_sqft DECIMAL(5, 2),
    data_quality_score DECIMAL(3, 2),
    raw_response JSONB,
    ingested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_rentcast_property_id ON rentcast_properties(property_id);
CREATE INDEX idx_rentcast_address ON rentcast_properties(address, city, state_code);
CREATE INDEX idx_rentcast_ingested_at ON rentcast_properties(ingested_at);

-- RentCast Rental Listings Table
CREATE TABLE IF NOT EXISTS rentcast_listings (
    id SERIAL PRIMARY KEY,
    listing_id VARCHAR(50) UNIQUE NOT NULL,
    property_id VARCHAR(50) NOT NULL,
    list_price INTEGER NOT NULL,
    currency CHAR(3) DEFAULT 'USD',
    period VARCHAR(20) DEFAULT 'Monthly',
    listing_status VARCHAR(20),
    list_date DATE,
    days_on_market INTEGER,
    raw_response JSONB,
    ingested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_rentcast_listing_id ON rentcast_listings(listing_id);
CREATE INDEX idx_rentcast_property_id ON rentcast_listings(property_id);
CREATE INDEX idx_rentcast_status ON rentcast_listings(listing_status);
CREATE INDEX idx_rentcast_list_date ON rentcast_listings(list_date);

-- ============================================
-- CENSUS DATA TABLES (Phase 3)
-- ============================================

-- Census Tract Data Table
CREATE TABLE IF NOT EXISTS census_tract_data (
    id SERIAL PRIMARY KEY,
    state_fips CHAR(2) NOT NULL,
    county_fips CHAR(3) NOT NULL,
    tract_fips CHAR(6) NOT NULL,
    tract_name VARCHAR(255),
    geo_id VARCHAR(11) UNIQUE NOT NULL,
    median_income INTEGER,
    total_housing_units INTEGER,
    total_vacancy INTEGER,
    owner_occupied_units INTEGER,
    median_home_value INTEGER,
    median_age INTEGER,
    unemployment_rate INTEGER,
    white_population INTEGER,
    black_population INTEGER,
    asian_population INTEGER,
    hispanic_population INTEGER,
    total_minority_population INTEGER,
    vacancy_rate DECIMAL(5, 4),
    owner_occupancy_rate DECIMAL(5, 4),
    income_affordability DECIMAL(5, 2),
    raw_response JSONB,
    ingested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(state_fips, county_fips, tract_fips)
);

CREATE INDEX idx_census_tract ON census_tract_data(state_fips, county_fips, tract_fips);
CREATE INDEX idx_census_geoid ON census_tract_data(geo_id);

-- Census Tract Boundaries Table (for PostGIS)
CREATE TABLE IF NOT EXISTS census_tract_boundaries (
    id SERIAL PRIMARY KEY,
    state_fips CHAR(2) NOT NULL,
    county_fips CHAR(3) NOT NULL,
    tract_code CHAR(6) NOT NULL,
    tract_name VARCHAR(50),
    geo_id VARCHAR(11) UNIQUE NOT NULL,
    geometry GEOMETRY(POLYGON, 4326),
    raw_response JSONB,
    ingested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_census_tract_geo ON census_tract_boundaries USING GIST(geometry);
CREATE INDEX idx_census_tract_boundaries_geoid ON census_tract_boundaries(geo_id);

-- ============================================
-- FHFA HPI DATA TABLE (Phase 3)
-- ============================================

CREATE TABLE IF NOT EXISTS fhfa_hpi_data (
    id SERIAL PRIMARY KEY,
    state_fips CHAR(2) NOT NULL,
    state_name VARCHAR(50),
    msa_id INTEGER,
    msa_name VARCHAR(255),
    year INTEGER NOT NULL,
    quarter INTEGER NOT NULL,
    hpi_index DECIMAL(10, 2),
    hpi_growth DECIMAL(5, 2),
    raw_response JSONB,
    ingested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(state_fips, msa_id, year, quarter)
);

CREATE INDEX idx_fhfa_hpi ON fhfa_hpi_data(state_fips, msa_id, year, quarter);

-- ============================================
-- REDFIN MARKET DATA TABLE (Phase 3)
-- ============================================

CREATE TABLE IF NOT EXISTS redfin_market_data (
    id SERIAL PRIMARY KEY,
    month_end_date DATE NOT NULL,
    msa_id INTEGER NOT NULL,
    msa_name VARCHAR(255),
    median_sale_price INTEGER,
    median_list_price INTEGER,
    median_price_per_sqft INTEGER,
    active_listings INTEGER,
    supply_demand_ratio DECIMAL(5, 2),
    days_on_market_median INTEGER,
    raw_response JSONB,
    ingested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(msa_id, month_end_date)
);

CREATE INDEX idx_redfin_market ON redfin_market_data(msa_id, month_end_date);

-- ============================================
-- PROPERTY PERMITS TABLE (Phase 5)
-- ============================================

CREATE TABLE IF NOT EXISTS property_permits (
    id SERIAL PRIMARY KEY,
    permit_id VARCHAR(50) UNIQUE NOT NULL,
    property_id VARCHAR(50) NOT NULL,
    permit_type VARCHAR(50),
    permit_date DATE,
    description TEXT,
    estimated_cost INTEGER,
    contractor_name VARCHAR(255),
    permit_status VARCHAR(20),
    completion_date DATE,
    raw_response JSONB,
    ingested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_permits_property_id ON property_permits(property_id);
CREATE INDEX idx_permits_date ON property_permits(permit_date);

-- ============================================
-- FEMA FLOOD ZONES TABLE (Phase 5)
-- ============================================

CREATE TABLE IF NOT EXISTS fema_flood_zones (
    id SERIAL PRIMARY KEY,
    fema_id VARCHAR(50),
    flood_zone CHAR(5),
    in_flood_hazard_area BOOLEAN,
    zone_status VARCHAR(20),
    geometry GEOMETRY(POLYGON, 4326),
    raw_response JSONB,
    ingested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_fema_geometry ON fema_flood_zones USING GIST(geometry);

-- ============================================
-- CANONICAL PROPERTY VIEW
-- ============================================

-- Create a unified view of property data from all sources
CREATE OR REPLACE VIEW canonical_properties AS
SELECT 
    'attom' as source,
    property_id,
    address,
    city,
    state_code,
    zip,
    latitude,
    longitude,
    property_type,
    year_built,
    living_area_sqft,
    lot_size_sqft,
    bedrooms,
    bathrooms,
    stories,
    garage,
    pool,
    tax_assessed_value,
    annual_property_tax,
    last_sale_price,
    last_sale_date,
    data_quality_score,
    ingested_at,
    updated_at
FROM attom_properties

UNION ALL

SELECT 
    'rentcast' as source,
    property_id,
    address,
    city,
    state_code,
    zip,
    latitude,
    longitude,
    property_type,
    year_built,
    living_area_sqft,
    lot_size_sqft,
    bedrooms,
    bathrooms,
    stories,
    garage,
    pool,
    tax_assessed_value,
    annual_property_tax,
    last_sale_price,
    last_sale_date,
    data_quality_score,
    ingested_at,
    updated_at
FROM rentcast_properties;

-- ============================================
-- FUNCTIONS AND TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to tables with updated_at
CREATE TRIGGER update_attom_properties_updated_at BEFORE UPDATE ON attom_properties
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rentcast_properties_updated_at BEFORE UPDATE ON rentcast_properties
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rentcast_listings_updated_at BEFORE UPDATE ON rentcast_listings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_census_tract_data_updated_at BEFORE UPDATE ON census_tract_data
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- DATA QUALITY MONITORING TABLES
-- ============================================

CREATE TABLE IF NOT EXISTS data_quality_metrics (
    id SERIAL PRIMARY KEY,
    source VARCHAR(50) NOT NULL,
    metric_date DATE NOT NULL,
    total_records INTEGER NOT NULL,
    missing_critical_fields INTEGER DEFAULT 0,
    invalid_coordinates INTEGER DEFAULT 0,
    date_anomalies INTEGER DEFAULT 0,
    price_anomalies INTEGER DEFAULT 0,
    quality_score DECIMAL(3, 2),
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_quality_metrics_source_date ON data_quality_metrics(source, metric_date);

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON TABLE attom_properties IS 'Property data from ATTOM Data Solutions API';
COMMENT ON TABLE attom_sales_history IS 'Sales history data from ATTOM Data Solutions API';
COMMENT ON TABLE rentcast_properties IS 'Property data from RentCast API';
COMMENT ON TABLE rentcast_listings IS 'Rental listings data from RentCast API';
COMMENT ON TABLE census_tract_data IS 'Demographic and housing data from U.S. Census Bureau ACS';
COMMENT ON TABLE census_tract_boundaries IS 'Geographic boundaries for census tracts from TIGER/Line';
COMMENT ON TABLE fhfa_hpi_data IS 'House Price Index data from Federal Housing Finance Agency';
COMMENT ON TABLE redfin_market_data IS 'Market statistics from Redfin Data Center';
COMMENT ON TABLE property_permits IS 'Building permit data from local governments';
COMMENT ON TABLE fema_flood_zones IS 'Flood zone data from FEMA';
COMMENT ON TABLE data_ingestion_log IS 'Log of all data ingestion operations';
COMMENT ON TABLE data_quality_metrics IS 'Data quality monitoring metrics';
COMMENT ON VIEW canonical_properties IS 'Unified view of property data from all sources';