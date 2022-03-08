# Tech Store API

-

## Getting started

-

### Scripts

-

### Usage

-

#### DB Schema

- Tables are as follow :

  - users :
    u_id of type UUID - u_name - password

  - orders :
    o_id of type SERIAL - order_status - user_id REFERENCES (users.u_id)

  - products :
    p_id of type UUID - category of type ENUM - p_name - brand - maker - price - popular of type ENUM
  - ordered_products :
    op_id of type SERIAL - order_id REFERENCES (orders.o_id) | product_id REFERENCES (products.p_id) | p_quantity | created_in of type DATE

- ENUMs are as follow :
  - column order_status ('new','active','complete')
  - column category ('mobiles','electronics')
  - column popular ('no','yes')

##### ENV

- ENV = dev
- PG_DB = tech_store
- PG_DB_TEST = tech_store_test
- PG_USER = udacity
- PG_PASSWORD = 123
- PG_HOST = 127.0.0.1
- PG_PORT = 5432
- SERVER_PORT = 3000
- SALT = 10
- PEPPER = pass-$1$2$3$-word
- SECRET_TOKEN = secret-$1$2$3$-token
