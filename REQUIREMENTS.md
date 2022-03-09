# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

- home : http://localhost:3000
- users :
  - GET /users ==> all users
  - GET /users/:id ==> one user
  - POST /users/signup ==> create user
  - PUT /users/ ==> update user
  - DELETE /users/:id ==> delete user
  - POST /users/login ==> authenticate user
  - GET /users/:id/account/review/ordered-products ==> all user's ordered products
  - GET /users/:uid/account/most-recent/purchases ==> all user's most recent purchases
  - GET /users/:uid/orders/:oid/account/review/ordered-products ==> all user's ordered products by specific order id
- products :
  - GET /products ==> all products
  - GET /products/:id ==> one product
  - POST /products ==> create product
  - PUT /products/ ==> update product
  - DELETE /products/:id ==> delete product
  - GET /products/most/popular ==> most popular products
- orders :
  - GET /user/account/orders ==> all orders
  - GET /user/account/orders/:id ==> one order
  - POST /user/account/orders ==> create order
  - PUT /user/account/orders/ ==> update order
  - DELETE /user/account/orders/:id ==> delete order
- ordered-products :
  - GET /user/account/ordered-products ==> all ordered-products
  - GET /user/account/ordered-products/:id ==> one ordered-product
  - POST /user/account/orders/:id/products ==> add product to order
  - PUT /user/account/ordered-products/ ==> update ordered-product
  - DELETE /user/account/ordered-products/:id ==> delete ordered-product

#### Users

- Index [token
- Show (args: id)[token required]
- Create (args: User)[token required]
- Update
- Delete

#### Products

- Index
- Show (args: product id)
- Create (args: Product)[token required]
- Update
- Delete
- Top 5 most popular products
- Products by category (args: product category)

#### Orders

- Index
- Show
- Create
- Update
- Delete
- Current Order by user (args: user id)[token required]
- Completed Orders by user (args: user id)[token required]

#### Ordered_products

- Index
- Show
- Create
- Update
- Delete

#### DB Schema

- Tables are as follow :

  - users :
    u_id of type UUID - u_name of type VARCHAR- password of type VARCHAR
    .
  - orders :
    o_id of type SERIAL - order_status of type VARCHAR- user_id REFERENCES (users.u_id)
    .
  - products :
    p_id of type UUID - category of type ENUM - p_name of type VARCHAR - brand of type VARCHAR - maker of type VARCHAR - price of type INT - popular of type ENUM
    .
  - ordered_products :
    op_id of type SERIAL - order_id REFERENCES (orders.o_id) | product_id REFERENCES (products.p_id) | p_quantity of type INT | created_in of type DATE

- ENUMs are as follow :

  - column order_status ('new','active','complete')
  - column category ('mobiles','electronics')
  - column popular ('no','yes')
