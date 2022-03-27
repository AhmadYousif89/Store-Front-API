/* Create ordered_products */
CREATE TABLE IF NOT EXISTS ordered_products (
    op_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id),
    product_id UUID REFERENCES products(p_id),
    quantity INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW ()
);