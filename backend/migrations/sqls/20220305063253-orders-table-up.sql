/* Create orders */
DROP TYPE IF EXISTS status;
CREATE TYPE status AS ENUM ('active','complete');
CREATE TABLE IF NOT EXISTS orders (
    order_id SERIAL PRIMARY KEY,
    order_status status DEFAULT 'active',
    user_id uuid REFERENCES users(user_id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ 
);