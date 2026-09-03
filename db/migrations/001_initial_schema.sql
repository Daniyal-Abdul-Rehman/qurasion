-- Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;

-- Properties table
CREATE TABLE properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  canonical_address text NOT NULL,
  city text,
  state_code char(2),
  postal_code text,
  latitude numeric(9, 6),
  longitude numeric(9, 6),
  location geography(Point, 4326),
  parcel_id text,
  property_type text,
  bedrooms numeric,
  bathrooms numeric,
  building_sqft integer,
  lot_sqft integer,
  year_built integer,
  estimated_value numeric(14, 2),
  investment_score numeric(5, 2),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes for properties
CREATE INDEX properties_location_gix ON properties USING gist (location);
CREATE INDEX properties_city_state_idx ON properties (city, state_code);
CREATE INDEX properties_property_type_idx ON properties (property_type);
CREATE INDEX properties_bedrooms_idx ON properties (bedrooms);
CREATE INDEX properties_bathrooms_idx ON properties (bathrooms);
CREATE INDEX properties_building_sqft_idx ON properties (building_sqft);
CREATE INDEX properties_year_built_idx ON properties (year_built);
CREATE INDEX properties_estimated_value_idx ON properties (estimated_value);

-- Owners table
CREATE TABLE owners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  display_name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Property owners junction table
CREATE TABLE property_owners (
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  owner_id uuid NOT NULL REFERENCES owners(id) ON DELETE CASCADE,
  ownership_percent numeric(5, 2),
  valid_from date,
  valid_to date,
  PRIMARY KEY (property_id, owner_id, valid_from)
);

-- Sales table
CREATE TABLE sales (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  sale_price numeric(14, 2),
  sale_date date,
  source_observation_id uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX sales_property_id_idx ON sales (property_id);
CREATE INDEX sales_sale_date_idx ON sales (sale_date);

-- Source observations table (for data provenance)
CREATE TABLE source_observations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider text NOT NULL,
  dataset text,
  external_record_id text,
  property_id uuid REFERENCES properties(id) ON DELETE SET NULL,
  raw_object_uri text NOT NULL,
  observed_at timestamptz NOT NULL,
  normalization_version text,
  resolution_version text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX source_observations_provider_idx ON source_observations (provider);
CREATE INDEX source_observations_property_id_idx ON source_observations (property_id);
CREATE INDEX source_observations_observed_at_idx ON source_observations (observed_at);

-- Users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  first_name text,
  last_name text,
  role text NOT NULL DEFAULT 'investor',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX users_email_idx ON users (email);
CREATE INDEX users_role_idx ON users (role);

-- Investor profiles table
CREATE TABLE investor_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  display_name text NOT NULL,
  capital_min numeric(14, 2),
  capital_max numeric(14, 2),
  strategy text NOT NULL,
  target_return numeric(5, 2),
  risk_tolerance text NOT NULL DEFAULT 'medium',
  renovation_appetite text NOT NULL DEFAULT 'none',
  property_types text[],
  preferred_states text[],
  preferred_cities text[],
  preferred_zip_codes text[],
  notification_email boolean DEFAULT true,
  notification_sms boolean DEFAULT false,
  notification_push boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX investor_profiles_user_id_idx ON investor_profiles (user_id);
CREATE INDEX investor_profiles_strategy_idx ON investor_profiles (strategy);

-- Property analyses table
CREATE TABLE property_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'pending',
  estimated_value numeric(14, 2),
  confidence numeric(3, 2),
  model_name text,
  model_version text,
  comparable_count integer,
  comparable_criteria jsonb,
  assumptions jsonb,
  results jsonb,
  job_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX property_analyses_property_id_idx ON property_analyses (property_id);
CREATE INDEX property_analyses_user_id_idx ON property_analyses (user_id);
CREATE INDEX property_analyses_status_idx ON property_analyses (status);

-- Property matches table
CREATE TABLE property_matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  investor_id uuid NOT NULL REFERENCES investor_profiles(id) ON DELETE CASCADE,
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  score numeric(3, 2) NOT NULL,
  reasons text[],
  rule_version text,
  is_viewed boolean DEFAULT false,
  is_saved boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX property_matches_investor_id_idx ON property_matches (investor_id);
CREATE INDEX property_matches_property_id_idx ON property_matches (property_id);
CREATE INDEX property_matches_score_idx ON property_matches (score);
CREATE UNIQUE INDEX property_matches_unique_idx ON property_matches (investor_id, property_id);

-- Offers table
CREATE TABLE offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  investor_id uuid NOT NULL REFERENCES investor_profiles(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'draft',
  offered_price numeric(14, 2) NOT NULL,
  terms jsonb,
  expires_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX offers_property_id_idx ON offers (property_id);
CREATE INDEX offers_investor_id_idx ON offers (investor_id);
CREATE INDEX offers_status_idx ON offers (status);

-- Deals table
CREATE TABLE deals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  offer_id uuid NOT NULL REFERENCES offers(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'initiated',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX deals_property_id_idx ON deals (property_id);
CREATE INDEX deals_offer_id_idx ON deals (offer_id);
CREATE INDEX deals_status_idx ON deals (status);

-- Deal milestones table
CREATE TABLE deal_milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id uuid NOT NULL REFERENCES deals(id) ON DELETE CASCADE,
  name text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  due_date timestamptz,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX deal_milestones_deal_id_idx ON deal_milestones (deal_id);
CREATE INDEX deal_milestones_status_idx ON deal_milestones (status);

-- Deal participants table
CREATE TABLE deal_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id uuid NOT NULL REFERENCES deals(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX deal_participants_deal_id_idx ON deal_participants (deal_id);
CREATE INDEX deal_participants_user_id_idx ON deal_participants (user_id);

-- Documents table
CREATE TABLE documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) ON DELETE SET NULL,
  deal_id uuid REFERENCES deals(id) ON DELETE SET NULL,
  uploader_id uuid NOT NULL REFERENCES users(id) ON DELETE SET NULL,
  document_type text NOT NULL,
  file_name text NOT NULL,
  file_size integer NOT NULL,
  content_type text NOT NULL,
  s3_key text NOT NULL,
  s3_bucket text NOT NULL,
  checksum text,
  is_public boolean DEFAULT false,
  expires_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX documents_property_id_idx ON documents (property_id);
CREATE INDEX documents_deal_id_idx ON documents (deal_id);
CREATE INDEX documents_uploader_id_idx ON documents (uploader_id);
CREATE INDEX documents_document_type_idx ON documents (document_type);

-- Jobs table (for background job tracking)
CREATE TABLE jobs (
  id text PRIMARY KEY,
  job_type text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  input_data jsonb,
  result_data jsonb,
  error_message text,
  progress integer DEFAULT 0,
  attempt_count integer DEFAULT 0,
  max_attempts integer DEFAULT 3,
  requested_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  started_at timestamptz,
  completed_at timestamptz
);

CREATE INDEX jobs_status_idx ON jobs (status);
CREATE INDEX jobs_job_type_idx ON jobs (job_type);
CREATE INDEX jobs_requested_by_idx ON jobs (requested_by);

-- Audit log table
CREATE TABLE audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id uuid,
  changes jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX audit_logs_user_id_idx ON audit_logs (user_id);
CREATE INDEX audit_logs_entity_idx ON audit_logs (entity_type, entity_id);
CREATE INDEX audit_logs_created_at_idx ON audit_logs (created_at);

-- Add trigger for updated_at on properties
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_investor_profiles_updated_at BEFORE UPDATE ON investor_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_property_analyses_updated_at BEFORE UPDATE ON property_analyses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_offers_updated_at BEFORE UPDATE ON offers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deals_updated_at BEFORE UPDATE ON deals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
