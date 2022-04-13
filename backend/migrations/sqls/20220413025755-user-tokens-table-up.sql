/* Create User_Tokens */
CREATE TABLE IF NOT EXISTS user_tokens (
    user_id UUID REFERENCES users(u_id) PRIMARY KEY,
    token VARCHAR NOT NULL,
    i_at VARCHAR(100)
);