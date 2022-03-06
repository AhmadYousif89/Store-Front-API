/* Create orders */
DROP TYPE IF EXISTS status;
CREATE TYPE status AS ENUM ('new','active','complete');
CREATE TABLE IF NOT EXISTS orders (
    o_id SERIAL PRIMARY KEY,
    order_status status NOT NULL,
    user_id uuid REFERENCES users(u_id) NOT NULL
);