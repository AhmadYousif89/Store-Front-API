CREATE TABLE IF NOT EXISTS mobiles (
    mob_uid UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    maker VARCHAR(100) NOT NULL,
    price integer NOT NULL
);