/* Create users */
CREATE TABLE IF NOT EXISTS users (
    user_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    CONSTRAINT unique_user_email UNIQUE (email)
);
