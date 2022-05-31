/* Create order_details */
CREATE TABLE IF NOT EXISTS order_details (
    _id uuid REFERENCES users(_id) PRIMARY KEY,
    customerId TEXT NOT NULL,
    order_info JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW (),
    updated_at TIMESTAMPTZ
);

