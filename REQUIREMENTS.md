# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

- home : `http://localhost:3000`
- users :
  - GET /users ==> all users `token`
  - GET /users/:id ==> one user `token`
  - POST /users/signup ==> create user
  - PUT /users/ ==> update user `token`
  - DELETE /users/:id ==> delete user `token`
  - POST /users/login ==> authenticate user `token`
  - GET /users/:id/account/review/ordered-products ==> all user's ordered products `token`
  - GET /users/:uid/account/most-recent/purchases ==> all user's most recent purchases `token`
  - GET /users/:uid/orders/:oid/account/review/ordered-products ==> all user's ordered products by specific order id `token`
- products :
  - GET /products ==> all products
  - GET /products/:id ==> one product
  - POST /products ==> create product `token`
  - PUT /products/ ==> update product
  - DELETE /products/:id ==> delete product
  - GET /products/most/popular ==> most popular products
- orders :
  - GET /user/account/orders ==> all orders `token`
  - GET /user/account/orders/:id ==> one order `token`
  - POST /user/account/orders ==> create order `token`
  - PUT /user/account/orders/ ==> update order `token`
  - DELETE /user/account/orders/:id ==> delete order `token`
- ordered-products :
  - GET /user/account/ordered-products ==> all ordered-products
  - GET /user/account/ordered-products/:id ==> one ordered-product
  - POST /user/account/orders/:id/products ==> add product to order
  - PUT /user/account/ordered-products/ ==> update ordered-product
  - DELETE /user/account/ordered-products/:id ==> delete ordered-product

#### DB Schema

- For better readability i have provided sql file with the schema | [db-schema.sql](https://github.com/AhmadYousif89/Tech_Store/blob/main/db-schema.sql)

#### Users

- Index
- Show
- Create
- Update
- Delete

#### Products

- Index
- Show
- Create
- Update
- Delete
- Top 5 most popular products
- Products by category

#### Orders

- Index
- Show
- Create
- Update
- Delete
- Current Order by user (args: user id)
- Completed Orders by user (args: user id)

#### Ordered_products

- Index
- Show
- Create
- Update
- Delete
