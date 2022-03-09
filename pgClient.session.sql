CREATE TABLE IF NOT EXISTS users (
    u_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    u_name VARCHAR(100),
    password VARCHAR
);
DROP TABLE users;

DROP TYPE IF EXISTS status;
CREATE TYPE status AS ENUM ('new','active','complete');
CREATE TABLE IF NOT EXISTS orders (
    o_id SERIAL PRIMARY KEY,
    order_status status NOT NULL,
    user_id uuid REFERENCES users(u_id)  NOT NULL
);
DROP TABLE orders;

DROP TYPE IF EXISTS category, popular;
CREATE TYPE category AS ENUM ('mobiles','electronics');
CREATE TYPE popular AS ENUM ('no','yes');
CREATE TABLE IF NOT EXISTS products (
    p_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category category NOT NULL,
    p_name VARCHAR(100) NOT NULL, 
    brand VARCHAR(100) NOT NULL,
    maker VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL,
    popular popular
);
DROP TABLE products;

CREATE TABLE IF NOT EXISTS ordered_products (
    op_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(o_id) NOT NULL ,
    product_id UUID REFERENCES products(p_id) NOT NULL,
    p_quantity INTEGER NOT NULL,
    created_in TIMESTAMP NOT NULL DEFAULT NOW ()
);
DROP TABLE order_products;

