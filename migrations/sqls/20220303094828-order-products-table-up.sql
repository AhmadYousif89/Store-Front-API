CREATE TABLE IF NOT EXISTS ordered_products (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id) NOT NULL ,
    product_id UUID REFERENCES products(p_uid) NOT NULL,
    p_quantity INTEGER NOT NULL
);