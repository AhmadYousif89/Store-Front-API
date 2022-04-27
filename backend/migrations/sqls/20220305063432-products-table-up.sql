/* Create products */
DROP TYPE IF EXISTS category, popular;
CREATE TYPE category AS ENUM ('mobiles','electronics');
CREATE TABLE IF NOT EXISTS products (
    p_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category category NOT NULL,
    p_name VARCHAR(100) NOT NULL, 
    brand VARCHAR(100) NOT NULL,
    color VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT
);