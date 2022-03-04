CREATE TABLE IF NOT EXISTS products (
    p_uid UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    p_name VARCHAR(100) NOT NULL, 
    brand VARCHAR(100) NOT NULL,
    maker VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL
);