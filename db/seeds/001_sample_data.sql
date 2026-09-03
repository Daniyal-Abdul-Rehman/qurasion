-- Sample data for development and testing

-- Insert sample owners
INSERT INTO owners (id, display_name) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'John Smith'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Jane Doe'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Real Estate Holdings LLC');

-- Insert sample properties
INSERT INTO properties (id, canonical_address, city, state_code, postal_code, latitude, longitude, property_type, bedrooms, bathrooms, building_sqft, lot_sqft, year_built, estimated_value) VALUES
  ('P1001', '123 Main Street', 'Dallas', 'TX', '75201', 32.7767, -96.7970, 'single_family', 3, 2, 2000, 5000, 1995, 318000),
  ('P1002', '456 Oak Avenue', 'Austin', 'TX', '78701', 30.2672, -97.7431, 'single_family', 4, 3, 2500, 6000, 2000, 450000),
  ('P1003', '789 Pine Road', 'Houston', 'TX', '77001', 29.7604, -95.3698, 'condo', 2, 2, 1200, 0, 2010, 225000),
  ('P1004', '321 Elm Street', 'San Antonio', 'TX', '78201', 29.4241, -98.4936, 'single_family', 3, 2, 1800, 4500, 1985, 285000),
  ('P1005', '654 Maple Drive', 'Fort Worth', 'TX', '76101', 32.7254, -97.3208, 'townhouse', 3, 2, 1600, 2000, 2015, 265000);

-- Insert property-owner relationships
INSERT INTO property_owners (property_id, owner_id, ownership_percent, valid_from) VALUES
  ('P1001', '550e8400-e29b-41d4-a716-446655440001', 100.0, '2020-01-01'),
  ('P1002', '550e8400-e29b-41d4-a716-446655440002', 100.0, '2019-06-15'),
  ('P1003', '550e8400-e29b-41d4-a716-446655440003', 100.0, '2021-03-01'),
  ('P1004', '550e8400-e29b-41d4-a716-446655440001', 100.0, '2018-11-20'),
  ('P1005', '550e8400-e29b-41d4-a716-446655440002', 100.0, '2022-07-10');

-- Insert sample sales data
INSERT INTO sales (property_id, sale_price, sale_date) VALUES
  ('P1001', 310000, '2020-01-15'),
  ('P1002', 435000, '2019-07-01'),
  ('P1003', 220000, '2021-04-01'),
  ('P1004', 275000, '2018-12-01'),
  ('P1005', 260000, '2022-08-01');

-- Insert sample user (password: password123 - use bcrypt in production)
INSERT INTO users (id, email, password_hash, first_name, last_name, role) VALUES
  ('U1001', 'investor@example.com', '$2b$10$abcdefghijklmnopqrstuvwxyz', 'Test', 'Investor', 'investor'),
  ('U1002', 'admin@example.com', '$2b$10$abcdefghijklmnopqrstuvwxyz', 'Admin', 'User', 'administrator');

-- Insert sample investor profile
INSERT INTO investor_profiles (id, user_id, display_name, capital_min, capital_max, strategy, target_return, risk_tolerance, renovation_appetite, property_types, preferred_states, preferred_cities) VALUES
  ('I1001', 'U1001', 'Test Investor', 100000, 500000, 'fix_and_flip', 15.0, 'medium', 'moderate', ARRAY['single_family', 'townhouse'], ARRAY['TX'], ARRAY['Dallas', 'Austin', 'Houston']);
