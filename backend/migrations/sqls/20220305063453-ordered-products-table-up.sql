/* Create ordered_products */
CREATE TABLE IF NOT EXISTS ordered_products (
    _id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    quantity INTEGER NOT NULL,
    order_id UUID REFERENCES orders(_id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(_id),
    created_at TIMESTAMPTZ DEFAULT NOW (),
    updated_at TIMESTAMPTZ
);