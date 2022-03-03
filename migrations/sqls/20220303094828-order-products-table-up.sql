CREATE TABLE IF NOT EXISTS order_products (
    id SERIAL PRIMARY KEY,
    quantity INTEGER NOT NULL,
    order_id INT REFERENCES orders(id) NOT NULL ,
    product_id INT REFERENCES products(id) NOT NULL
);