/* Create ordered_products */
CREATE TABLE IF NOT EXISTS ordered_products (
    op_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id) NOT NULL ,
    product_id UUID REFERENCES products(p_id) NOT NULL,
    quantity INTEGER NOT NULL,
    created_in DATE NOT NULL DEFAULT NOW ()
);