CREATE TABLE IF NOT EXISTS mobiles (
    mob_uid UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    brand_name VARCHAR(100) NOT NULL,
    model_name VARCHAR(100) NOT NULL,
    manufacturer VARCHAR(100) NOT NULL,
    price integer NOT NULL,
    made_in VARCHAR(50) NOT NULL
);