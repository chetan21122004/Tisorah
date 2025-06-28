-- Add price range fields to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS price_min NUMERIC;
ALTER TABLE products ADD COLUMN IF NOT EXISTS price_max NUMERIC;
ALTER TABLE products ADD COLUMN IF NOT EXISTS has_price_range BOOLEAN DEFAULT false;

-- Convert existing moq from string to numeric
ALTER TABLE products 
  ALTER COLUMN moq TYPE NUMERIC USING (moq::numeric);

-- Update has_price_range for existing products
-- This sets price ranges for featured products as an example
UPDATE products 
SET price_min = price * 0.8,
    price_max = price * 1.2,
    has_price_range = true
WHERE featured = true;

-- Set default MOQ for products that don't have it
UPDATE products
SET moq = 25
WHERE moq IS NULL OR moq = 0; 