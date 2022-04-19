/* Create User_Tokens */
CREATE TABLE IF NOT EXISTS user_tokens (
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE PRIMARY KEY,
    token VARCHAR NOT NULL,
    i_at TIMESTAMPTZ DEFAULT NOW()
);