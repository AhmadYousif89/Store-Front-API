CREATE TABLE IF NOT EXISTS users (
    u_uid UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    u_name VARCHAR(100),
    password VARCHAR
);
DROP TABLE users;

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    order_status VARCHAR(50),
    user_id REFERENCES users(u_uid) 
);
DROP TABLE orders;

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price INTEGER,
    category VARCHAR(50)
);
DROP TABLE products;

CREATE TABLE IF NOT EXISTS order-products (
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    order_id REFERENCES orders(id) 
    product_id REFERENCES products(id) 
);
DROP TABLE order_products;

CREATE TABLE IF NOT EXISTS mobiles (
    mob_uid UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    maker VARCHAR(100) NOT NULL,
    price integer NOT NULL,
);
DROP TABLE mobiles;

