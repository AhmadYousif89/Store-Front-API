/* Create users */
CREATE TABLE IF NOT EXISTS users (
    u_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    u_name VARCHAR(100) NOT NULL,
    u_email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    CONSTRAINT unique_user_email UNIQUE (u_email)
);
