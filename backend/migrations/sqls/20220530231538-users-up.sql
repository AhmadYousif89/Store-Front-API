/* Create users */
CREATE TABLE IF NOT EXISTS users (
    _id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    isadmin BOOLEAN DEFAULT false,
    token TEXT,
    CONSTRAINT unique_user_email UNIQUE (email)
);

