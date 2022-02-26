CREATE TABLE IF NOT EXISTS mobiles (
    mob_uid UUID PRIMARY KEY,
    brand_name VARCHAR(100) NOT NULL,
    model_name VARCHAR(100) NOT NULL,
    manufacturer VARCHAR(100) NOT NULL,
    price integer NOT NULL,
    made_in VARCHAR(50) NOT NULL
);
INSERT INTO mobiles (mob_uid,brand_name,model_name,manufacturer,price,made_in) VALUES ( uuid_generate_v4(),'Iphone','XI','Apple',1000,'USA');
INSERT INTO mobiles (mob_uid,brand_name,model_name,manufacturer,price,made_in) VALUES (uuid_generate_v4(),'Galaxy','S20','Samsung',1000,'South-Korean');

-- DROP TABLE mobiles;
-- ALTER SEQUENCE mobiles_id_seq RESTART WITH 1;

CREATE TABLE users (
    u_uid UUID PRIMARY KEY,
    username VARCHAR(100),
    u_password VARCHAR
);
-- DROP TABLE users;
