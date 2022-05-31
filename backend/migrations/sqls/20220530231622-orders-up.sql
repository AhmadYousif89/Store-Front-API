/* Create orders */
DROP TYPE IF EXISTS status;
CREATE TYPE status AS ENUM ('active','pending','complete');
CREATE TABLE IF NOT EXISTS orders (
    _id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES users(_id),
    stripe_customerId TEXT NOT NULL,
    order_status status DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);