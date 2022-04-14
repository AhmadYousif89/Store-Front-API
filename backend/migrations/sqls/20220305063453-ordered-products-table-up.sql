/* Create ordered_products */
CREATE TABLE IF NOT EXISTS ordered_products (
    op_id SERIAL PRIMARY KEY,
    quantity INTEGER NOT NULL,
    order_id INT REFERENCES orders(order_id),
    product_id UUID REFERENCES products(p_id),
    created_at TIMESTAMPTZ DEFAULT NOW ()
);