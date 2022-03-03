CREATE TABLE IF NOT EXISTS users (
    u_uid UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    u_name VARCHAR(100),
    password VARCHAR
);