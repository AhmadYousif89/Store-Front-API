import app from "../../server";
import pgDB from "../../database";
import supertest from "supertest";
import { DbSchema } from "../../utils/control";

const { SERVER_PORT } = process.env;
export const route = supertest(app);

let userId = "";
let pId = "";
let time = "";
let token = "";

export const schema = {
  u_name: "Ali",
  u_email: "Ali@gmail.com",
  password: "123",
  order_id: 1,
  order_status: "new",
  category: "mobiles",
  p_name: "S20",
  brand: "Galaxy",
  maker: "Samsung",
  price: 1000,
  popular: "no",
  op_id: 1,
  quantity: 10,
} as DbSchema;

// ======================================== //
/*   Testing routes before creating data    */
// ======================================== //

describe("Testing application end points: \n", () => {
  //  Main route
  it(`server should be running on http://localhost:${SERVER_PORT} with status code 200`, async () => {
    const response = await route.get("/");
    expect(response.statusCode).toBe(200);
    expect(response.body).toContain("Home Page ...");
  });

  it(`should get end point /any-random-route with status code 404 and error message`, async () => {
    const response = await route.get("/any-random-route");
    expect(response.statusCode).toBe(404);
    expect(response.body).toContain("This page doesn't exist, Sorry !");
  });

  // Users routes

  it(`should get end point /api/users with status code 401 and error message`, async () => {
    const response = await route.get("/api/users");
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toEqual("Access denied, Faild to authenticate !");
  });

  it(`should get end point /api/users/:id with status code 401 and error message`, async () => {
    const response = await route.get(`/api/users/${userId}`);
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toEqual("Access denied, Faild to authenticate !");
  });

  it(`should get end point /api/users and not updating user with status code 401 and error message`, async () => {
    const response = await route.put(`/api/users`);
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toEqual("Access denied, Faild to authenticate !");
  });

  it(`should get end point /api/users/:id and not deleting user with status code 401 and error message`, async () => {
    const response = await route.delete(`/api/users/any-user`);
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toEqual("Access denied, Faild to authenticate !");
  });

  it(`should get end point /api/users/:id/account/review/ordered-products with status code 401 and error message`, async () => {
    const response = await route.get(`/api/users/(any user)/account/review/ordered-products`);
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toEqual("Access denied, Faild to authenticate !");
  });

  it(`should get end point /api/users/:uid/orders/:oid/account/review/ordered-products with status code 401 and error message`, async () => {
    const response = await route.get(
      `/api/users/(any user)/orders/${schema.order_id}/account/review/ordered-products`
    );
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toEqual("Access denied, Faild to authenticate !");
  });

  it(`should get end point /api/users/:uid/account/most-recent/purchases with status code 401 and error message`, async () => {
    const response = await route.get(`/api/users/(any user)/account/most-recent/purchases`);
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toEqual("Access denied, Faild to authenticate !");
  });

  // Products routes

  it(`should get end point /api/products with status code 404 and error message`, async () => {
    const response = await route.get("/api/products");
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toEqual("No Products Were Found !");
  });

  it(`should get end point /api/products:id with status code 500 and error message`, async () => {
    const response = await route.get(`/api/products/123`);
    expect(response.statusCode).toBe(500);
    expect(response.body.message).toEqual(
      "Request Failed ! Unable to get Product with id (123) - Please enter a valid product id !"
    );
  });

  it(`should get end point /api/products:id with status code 404 and error message`, async () => {
    const response = await route.get(`/api/products/da0eecd7-2be5-4909-9c86-83728c2f39d5`);
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      message: "Request failed !",
      data: `Product with id (da0eecd7-2be5-4909-9c86-83728c2f39d5) Doesn't Exist !`,
    });
  });

  it(`should get end point /api/products and not creating new product with status code 400 and error message`, async () => {
    const response = await route
      .post("/api/products")
      .set("Content-type", "application/json")
      .send({
        name: "",
        price: schema.price,
        maker: schema.maker,
        brand: schema.brand,
        popular: schema.popular,
        category: schema.category,
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      status: "Error",
      message: "Please enter a valid details before submiting !",
    });
  });

  it(`should get end point /api/products and not creating new product with status code 500 and error message`, async () => {
    const response = await route
      .post("/api/products")
      .set("Content-type", "application/json")
      .send({
        name: schema.p_name,
        price: schema.price,
        maker: schema.maker,
        brand: schema.brand,
        popular: "Idk",
        category: schema.category,
      });
    expect(response.statusCode).toBe(500);
    expect(response.body.message).toEqual(
      "Request Failed ! Unable to create new Product - Please choose popularity between (yes) or (no) !"
    );
  });

  it(`should get end point /api/products and not creating new product with status code 500 and error message`, async () => {
    const response = await route
      .post("/api/products")
      .set("Content-type", "application/json")
      .send({
        name: schema.p_name,
        price: schema.price,
        maker: schema.maker,
        brand: schema.brand,
        popular: schema.popular,
        category: "Food",
      });
    expect(response.statusCode).toBe(500);
    expect(response.body.message).toEqual(
      "Request Failed ! Unable to create new Product - Please enter category between (electronics) and (mobiles) !"
    );
  });

  it(`should get end point /api/products and not updating product with status code 500 and error message`, async () => {
    const response = await route
      .put("/api/products")
      .set("Content-type", "application/json")
      .send({ id: 123, price: schema.price, popular: schema.popular });
    expect(response.statusCode).toBe(500);
    expect(response.body.message).toEqual(
      "Request Failed ! Unable to update Product with id (123) - Please enter a valid product id !"
    );
  });

  it(`should get end point /api/products and not updating product with status code 404 and error message`, async () => {
    const response = await route.put("/api/products").set("Content-type", "application/json").send({
      id: "da0eecd7-2be5-4909-9c86-83728c2f39d5",
      price: schema.price,
      popular: schema.popular,
    });
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      message: "Update failed !",
      data: `Product with id (da0eecd7-2be5-4909-9c86-83728c2f39d5) doesn't exist`,
    });
  });

  it(`should get end point /api/products and not updating product with status code 500 and error message`, async () => {
    const response = await route.put("/api/products").set("Content-type", "application/json").send({
      id: "da0eecd7-2be5-4909-9c86-83728c2f39d5",
      price: schema.price,
      popular: "Idk",
    });
    expect(response.statusCode).toBe(500);
    expect(response.body.message).toEqual(
      "Request Failed ! Unable to update Product with id (da0eecd7-2be5-4909-9c86-83728c2f39d5) - Please enter a value between [ yes | no ] for popular !"
    );
  });

  it(`should get end point /api/products/:id with status code 500 and error message`, async () => {
    const response = await route.delete("/api/products/123");
    expect(response.statusCode).toBe(500);
    expect(response.body.message).toEqual(
      "Request Failed ! Unable to delete Product with id (123) - Please enter a valid product id !"
    );
  });

  it(`should get end point /api/products/:id with status code 404 and error message`, async () => {
    const response = await route.delete(`/api/products/da0eecd7-2be5-4909-9c86-83728c2f39d5`);
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      message: "Delete failed !",
      data: `Product with id (da0eecd7-2be5-4909-9c86-83728c2f39d5) doesn't exist`,
    });
  });

  it(`should get end point /api/products/most/popular with status code 404 and error message`, async () => {
    const response = await route.get("/api/products/most/popular");
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toEqual("No Popular Products Were Found !");
  });

  // Orders routes

  it(`should get end point /api/user/account/orders with status code 401 and error message`, async () => {
    const response = await route.get("/api/user/account/orders");
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toEqual("Access denied, Faild to authenticate !");
  });

  it(`should get end point /api/user/account/orders/:id with status code 401 and error message`, async () => {
    const response = await route.get(`/api/user/account/orders/${schema.order_id}`);
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toEqual("Access denied, Faild to authenticate !");
  });

  it(`should get end point /api/user/account/orders with status code 401 and error message`, async () => {
    const response = await route.put("/api/user/account/orders");
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toEqual("Access denied, Faild to authenticate !");
  });

  it(`should get end point /api/user/account/orders with status code 401 and error message`, async () => {
    const response = await route.post("/api/user/account/orders");
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toEqual("Access denied, Faild to authenticate !");
  });

  it(`should get end point /api/user/account/orders/:id with status code 401 and error message`, async () => {
    const response = await route.delete(`/api/user/account/orders/${schema.order_id}`);
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toEqual("Access denied, Faild to authenticate !");
  });

  // Ordered-products routes

  it(`should get end point /api/user/account/ordered-products with status code 401 and error message`, async () => {
    const response = await route.get("/api/user/account/ordered-products");
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toEqual("Access denied, Faild to authenticate !");
  });

  it(`should get end point /api/user/account/ordered-products/:id with status code 401 and error message`, async () => {
    const response = await route.get(`/api/user/account/ordered-products/${schema.op_id}`);
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toEqual("Access denied, Faild to authenticate !");
  });

  it(`should get end point /api/user/account/ordered-products with status code 401 and error message`, async () => {
    const response = await route.put(`/api/user/account/ordered-products`);
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toEqual("Access denied, Faild to authenticate !");
  });

  it(`should get end point /api/user/account/orders/:id/products with status code 401 and error message`, async () => {
    const response = await route.post(`/api/user/account/orders/${schema.order_id}/products`);
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toEqual("Access denied, Faild to authenticate !");
  });

  it(`should get end point /api/user/account/ordered-products/:id with status code 401 and error message`, async () => {
    const response = await route.delete(`/api/user/account/ordered-products/${schema.op_id}`);
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toEqual("Access denied, Faild to authenticate !");
  });
});

// ======================================== //
/*    Testing routes after creating data    */
// ======================================== //

describe("Testing application routes functionalty: \n", () => {
  // Create a user
  it("should get end point /api/signup and create user and extract id", async () => {
    const response = await route
      .post("/api/signup")
      .set("Content-type", "application/json")
      .send({ name: schema.u_name, email: schema.u_email, password: schema.password });
    const { u_id } = response.body.data;
    userId = u_id as string;
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toEqual("User created successfully");
    expect(response.body.data).toEqual({
      u_id: userId,
      u_name: schema.u_name,
      u_email: schema.u_email,
    });
  });

  it("should not create user and get end point /api/signup with status code 400 and error message", async () => {
    const response = await route
      .post("/api/signup")
      .set("Content-type", "application/json")
      .send({ name: "", email: schema.u_email, password: "" });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      status: "Error",
      message: "Please provide correct information !",
    });
  });

  it("should not create user and get end point /api/signup with status code 400 and error message", async () => {
    const response = await route
      .post("/api/signup")
      .set("Content-type", "application/json")
      .send({ name: schema.u_name, email: "invalid email", password: schema.password });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      status: "Error",
      message: "Please provide a valid email !",
    });
  });

  it("should not create user and get end point /api/signup with status code 500 and error message", async () => {
    const response = await route
      .post("/api/signup")
      .set("Content-type", "application/json")
      .send({ name: schema.u_name, email: schema.u_email, password: schema.password });
    expect(response.statusCode).toBe(500);
    expect(response.body.message).toEqual(
      "Request Failed ! Unable to create user - User already exist with this email !"
    );
  });

  it(`should authenticate user and create token`, async () => {
    const response = await route
      .post(`/api/login`)
      .set("Content-type", "application/json")
      .send({ email: schema.u_email, password: schema.password });
    const { token: userToken } = response.body;
    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual("User authenticated successfully");
    expect(response.body.data).toEqual({
      u_id: userId,
      u_name: schema.u_name,
      u_email: schema.u_email,
    });
    token = userToken;
  });

  it(`should not authenticate user and return status code 400 and error message`, async () => {
    const response = await route
      .post(`/api/login`)
      .set("Content-type", "application/json")
      .send({ email: "", password: schema.password });
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      status: "Error",
      message: "Please provide your email and password !",
    });
  });

  it(`should not authenticate user and return status code 400 and error message`, async () => {
    const response = await route
      .post(`/api/login`)
      .set("Content-type", "application/json")
      .send({ email: "invalid email", password: schema.password });
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      status: "Error",
      message: "Please enter a valid email !",
    });
  });

  it(`should not authenticate user and deny access`, async () => {
    const response = await route
      .post(`/api/login`)
      .set("Content-type", "application/json")
      .send({ email: "XX@xx.com", password: "abc" });
    expect(response.status).toEqual(401);
    expect(response.body).toEqual({
      message: "Authentication failed",
      data: "Invalid password or email !",
    });
  });

  // Create a product

  it(`should get end point /api/products and create product and extract id`, async () => {
    const response = await route
      .post("/api/products")
      .set("Content-type", "application/json")
      .send({
        name: schema.p_name,
        price: schema.price,
        maker: schema.maker,
        brand: schema.brand,
        popular: schema.popular,
        category: schema.category,
      });
    const { p_id } = response.body.data;
    pId = p_id as string;
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toEqual("Product created successfully");
    expect(response.body.data).toEqual({
      p_id: pId,
      p_name: schema.p_name,
      price: schema.price,
      maker: schema.maker,
      brand: schema.brand,
      popular: schema.popular,
      category: schema.category,
    });
  });

  // Create order

  it(`should create order and get end point /api/user/account/orders and create new order for user ${userId}`, async () => {
    const response = await route
      .post("/api/user/account/orders")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({ user_id: userId, status: schema.order_status });
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toEqual("Order created successfully");
    expect(response.body.data).toEqual({
      order_id: schema.order_id,
      order_status: schema.order_status,
      user_id: userId,
    });
  });

  it(`should not create order and get end point /api/user/account/orders with status code 500 and error message`, async () => {
    const response = await route
      .post("/api/user/account/orders")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({ user_id: "123", status: schema.order_status });
    expect(response.statusCode).toBe(500);
    expect(response.body.message).toEqual(
      "Request Failed ! Unable to create new Order - Please enter a valid user id !"
    );
  });

  it(`should not create order and get end point /api/user/account/orders with status code 500 and error message`, async () => {
    const response = await route
      .post("/api/user/account/orders")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({ user_id: userId, status: "anything" });
    expect(response.statusCode).toBe(500);
    expect(response.body.message).toEqual(
      "Request Failed ! Unable to create new Order - Please enter a value between [ new | active ] for order status !"
    );
  });

  it(`should not create order and get end point /api/user/account/orders with status code 400 and error message`, async () => {
    const response = await route
      .post("/api/user/account/orders")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({ user_id: "", status: schema.order_status });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      status: "Error",
      message: "Please provide correct details before submiting !",
    });
  });

  // Add product to order

  it(`should get end point /api/user/account/orders/:id/products and add product to order number ${schema.order_id}`, async () => {
    const response = await route
      .post(`/api/user/account/orders/${schema.order_id}/products`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({ p_id: pId, quantity: schema.quantity });
    const { created_at } = response.body.data;
    time = JSON.stringify(created_at).replaceAll(`"`, "");
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toEqual(
      `Product has been added successfully to order number (${schema.order_id})`
    );
    expect(response.body.data).toEqual({
      op_id: schema.op_id,
      order_id: schema.order_id,
      product_id: pId,
      quantity: schema.quantity,
      created_at: time,
    });
  });

  it(`should not add product and get end point /api/user/account/orders/:id/products with status code 500 and error message`, async () => {
    const response = await route
      .post(`/api/user/account/orders/2/products`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({ p_id: pId, quantity: schema.quantity });
    expect(response.statusCode).toBe(500);
    expect(response.body.message).toEqual("Incorrect order id or order does not exist !");
  });

  it(`should not add product and get end point /api/user/account/orders/:id/products with status code 500 and error message`, async () => {
    const response = await route
      .post(`/api/user/account/orders/${schema.order_id}/products`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({ p_id: "123", quantity: schema.quantity });
    expect(response.statusCode).toBe(500);
    expect(response.body.message).toEqual(
      "Unable to add product to order - Please enter a valid product id !"
    );
  });

  it(`should not add product and get end point /api/user/account/orders/:id/products with status code 500 and error message`, async () => {
    const response = await route
      .post(`/api/user/account/orders/${schema.order_id}/products`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({ p_id: "", quantity: "" });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      status: "Error",
      message: "Please provide correct details before submiting !",
    });
  });

  // Users

  it("should authenticate user and allow access", async () => {
    const result = await route.get(`/api/users/${userId}`).set("Authorization", `Bearer ${token}`);
    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      message: "User generated successfully",
      data: {
        u_id: userId,
        u_name: schema.u_name,
        u_email: schema.u_email,
      },
    });
  });

  it("should not get user with id (123)", async () => {
    const result = await route.get(`/api/users/123`).set("Authorization", `Bearer ${token}`);
    expect(result.status).toBe(500);
    expect(result.body.message).toEqual(
      "Request Failed ! Unable to get user with id (123) - Please enter a valid user id !"
    );
  });

  it("should get all users", async () => {
    const result = await route.get(`/api/users`).set("Authorization", `Bearer ${token}`);
    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual({
      message: "Data generated successfully",
      data: [
        {
          u_id: userId,
          u_name: schema.u_name,
          u_email: schema.u_email,
        },
      ],
    });
  });

  it("should not update user password for missing information", async () => {
    const result = await route
      .put(`/api/users`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({ uid: "", password: "" });
    expect(result.status).toEqual(400);
    expect(result.body).toEqual({
      status: "Error",
      message: "Please provide user id and password !",
    });
  });

  it("should not update user password for wrong user id type", async () => {
    const result = await route
      .put(`/api/users`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({ uid: "ffc1b750-faf5-4a19-97fc-1fcf47d42d51", password: "abc" });
    expect(result.status).toEqual(404);
    expect(result.body).toEqual({
      message: "Update failed !",
      data: `User with id (ffc1b750-faf5-4a19-97fc-1fcf47d42d51) doesn't exist`,
    });
  });

  it("should not update user password for wrong user id", async () => {
    const result = await route
      .put(`/api/users`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({ uid: "123", password: "abc" });
    expect(result.status).toEqual(500);
    expect(result.body.message).toEqual(
      "Request Failed ! Unable to update user with id (123) - Please enter a valid user id !"
    );
  });

  it("should update user and SET password to = (abc)", async () => {
    const result = await route
      .put(`/api/users`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({ uid: userId, password: "abc" });
    expect(result.status).toEqual(200);
    expect(result.body).toEqual({
      message: "User updated successfully",
      data: { u_id: userId, u_email: schema.u_email, u_name: schema.u_name },
    });
  });

  it("should not delete user for wrong user id type", async () => {
    const result = await route.delete(`/api/users/123`).set("Authorization", `Bearer ${token}`);
    expect(result.status).toEqual(500);
    expect(result.body.message).toEqual(
      "Request Failed ! Unable to delete user with id (123) - Please enter a valid user id !"
    );
  });

  it("should not delete user because of foregin key constrain", async () => {
    const result = await route
      .delete(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(result.status).toEqual(500);
    expect(result.body.message).toEqual(
      `Request Failed ! Unable to delete user with id (${userId}) - Please delete any related orders first !`
    );
  });

  it("should not delete user and display error message", async () => {
    const result = await route
      .delete(`/api/users/9586560b-8e75-46b5-bcaf-ebd2d1033308`)
      .set("Authorization", `Bearer ${token}`);
    expect(result.status).toEqual(404);
    expect(result.body).toEqual({
      message: "Delete failed !",
      data: `User with id (9586560b-8e75-46b5-bcaf-ebd2d1033308) doesn't exist`,
    });
  });

  // Products

  it(`should get all data from table products`, async () => {
    const response = await route.get(`/api/products`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: "Data generated successfully",
      data: [
        {
          p_id: pId,
          category: schema.category,
          p_name: schema.p_name,
          brand: schema.brand,
          maker: schema.maker,
          price: schema.price,
          popular: schema.popular,
        },
      ],
    });
  });

  it(`should get one product`, async () => {
    const response = await route.get(`/api/products/${pId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: "Product generated successfully",
      data: {
        p_id: pId,
        category: schema.category,
        p_name: schema.p_name,
        brand: schema.brand,
        maker: schema.maker,
        price: schema.price,
        popular: schema.popular,
      },
    });
  });

  it(`should update the product price and popularity to (900 , yes)`, async () => {
    const response = await route
      .put(`/api/products`)
      .set("Content-type", "application/json")
      .send({ id: pId, price: 900, popular: "yes" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: "Product updated successfully",
      data: {
        p_id: pId,
        category: schema.category,
        p_name: schema.p_name,
        brand: schema.brand,
        maker: schema.maker,
        price: 900,
        popular: "yes",
      },
    });
  });

  it(`should not delete product because of foregin key constrain`, async () => {
    const response = await route.delete(`/api/products/${pId}`);
    expect(response.status).toBe(500);
    expect(response.body.message).toEqual(
      `Request Failed ! Unable to delete Product with id (${pId}) - Product can not be deleted - remove this product from any related orders !`
    );
  });

  // Orders

  it("should get all orders", async () => {
    const result = await route
      .get("/api/user/account/orders")
      .set("Authorization", `Bearer ${token}`);
    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      message: "Data generated successfully",
      data: [
        {
          order_id: schema.order_id,
          order_status: schema.order_status,
          user_id: userId,
        },
      ],
    });
  });

  it(`should get order number ${schema.order_id}`, async () => {
    const result = await route
      .get(`/api/user/account/orders/${schema.order_id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      message: "Order generated successfully",
      data: {
        order_id: schema.order_id,
        order_status: schema.order_status,
        user_id: userId,
      },
    });
  });

  it("should not get order number (2)", async () => {
    const result = await route
      .get(`/api/user/account/orders/2`)
      .set("Authorization", `Bearer ${token}`);
    expect(result.status).toBe(404);
    expect(result.body).toEqual({
      message: "Request failed !",
      data: "Order with id (2) doesn't Exist !",
    });
  });

  it("should not update order status", async () => {
    const result = await route
      .put(`/api/user/account/orders`)
      .set("Authorization", `Bearer ${token}`)
      .set("Content-type", "application/json")
      .send({ order_id: 0, status: "" });
    expect(result.status).toBe(400);
    expect(result.body).toEqual({
      status: "Error",
      message: "Please provide a valid order status and id !",
    });
  });

  it(`should not update order status to it's current status`, async () => {
    const result = await route
      .put(`/api/user/account/orders`)
      .set("Authorization", `Bearer ${token}`)
      .set("Content-type", "application/json")
      .send({ order_id: schema.order_id, status: schema.order_status });
    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      message: `Order number (${schema.order_id}) already has a status of (${schema.order_status}) !`,
    });
  });

  it(`should not update order status to anything but (complete or active)`, async () => {
    const result = await route
      .put(`/api/user/account/orders`)
      .set("Authorization", `Bearer ${token}`)
      .set("Content-type", "application/json")
      .send({ order_id: schema.order_id, status: "anything" });
    expect(result.status).toBe(500);
    expect(result.body.message).toEqual(
      `Request Failed ! Unable to update orders with id (${schema.order_id}) - Please enter value between [ active | complete ] for order status !`
    );
  });

  it("should update order status to (complete)", async () => {
    const result = await route
      .put(`/api/user/account/orders`)
      .set("Authorization", `Bearer ${token}`)
      .set("Content-type", "application/json")
      .send({ order_id: schema.order_id, status: "complete" });
    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      message: "Order updated successfully",
      data: {
        order_id: schema.order_id,
        order_status: "complete",
        user_id: userId,
      },
    });
  });

  it("should not update order status to any other status if it's already (complete)", async () => {
    const result = await route
      .put(`/api/user/account/orders`)
      .set("Authorization", `Bearer ${token}`)
      .set("Content-type", "application/json")
      .send({ order_id: schema.order_id, status: schema.order_status });
    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      message: `Order number (${schema.order_id}) already has a status of (complete) - you may review your order or delete it if you want !`,
    });
  });

  it(`should not delete order for invalid input`, async () => {
    const response = await route
      .delete(`/api/user/account/orders/anything`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      status: "Error",
      message: "Please enter a valid order id !",
    });
  });

  it(`should not delete order because of foregin key constrain`, async () => {
    const response = await route
      .delete(`/api/user/account/orders/${schema.order_id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(500);
    expect(response.body.message).toEqual(
      `Request Failed ! Unable to delete order with id (${schema.order_id}) - Please remove any products related to this order first !`
    );
  });

  // Ordered_Products

  it(`should not add products to order number ${schema.op_id}`, async () => {
    const result = await route
      .post(`/api/user/account/orders/${schema.order_id}/products`)
      .set("Authorization", `Bearer ${token}`)
      .set("Content-type", "application/json")
      .send({ p_id: pId, quantity: 10 });
    expect(result.status).toBe(500);
    expect(result.body).toEqual({
      message: `Error: Unable to add products to order number (${schema.order_id}) because order status is already (complete)`,
    });
  });

  it("should get all ordered products", async () => {
    const result = await route
      .get("/api/user/account/ordered-products")
      .set("Authorization", `Bearer ${token}`);
    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      message: "Data generated successfully",
      data: [
        {
          op_id: schema.op_id,
          order_id: schema.order_id,
          product_id: pId,
          quantity: schema.quantity,
          created_at: time,
        },
      ],
    });
  });

  it("should get one ordered products", async () => {
    const result = await route
      .get(`/api/user/account/ordered-products/${schema.op_id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      message: "Data generated successfully",
      data: {
        op_id: schema.op_id,
        order_id: schema.order_id,
        product_id: pId,
        quantity: schema.quantity,
        created_at: time,
      },
    });
  });

  it("should not get one ordered products for invalid input", async () => {
    const result = await route
      .get(`/api/user/account/ordered-products/anything`)
      .set("Authorization", `Bearer ${token}`);
    expect(result.status).toBe(400);
    expect(result.body).toEqual({
      status: "Error",
      message: "Please enter a valid op id !",
    });
  });

  it(`should not update ordered product number ${schema.op_id}`, async () => {
    const result = await route
      .put(`/api/user/account/ordered-products`)
      .set("Authorization", `Bearer ${token}`)
      .set("Content-type", "application/json")
      .send({ p_id: pId, quantity: 0 });
    expect(result.status).toBe(400);
    expect(result.body).toEqual({
      status: "Error",
      message: "Please provide correct details before updating !",
    });
  });

  it(`should not update ordered product number ${schema.op_id}`, async () => {
    const result = await route
      .put(`/api/user/account/ordered-products`)
      .set("Authorization", `Bearer ${token}`)
      .set("Content-type", "application/json")
      .send({ p_id: "325b12e8-9676-4af8-8c12-34816ecb8ce1", quantity: 20 });
    expect(result.status).toBe(404);
    expect(result.body).toEqual({
      message: "Update failed !",
      data: `Product with id (325b12e8-9676-4af8-8c12-34816ecb8ce1) doesn't exist`,
    });
  });

  it(`should not update ordered product number ${schema.op_id}`, async () => {
    const result = await route
      .put(`/api/user/account/ordered-products`)
      .set("Authorization", `Bearer ${token}`)
      .set("Content-type", "application/json")
      .send({ p_id: "123", quantity: 20 });
    expect(result.status).toBe(500);
    expect(result.body.message).toEqual(
      `Request Failed ! Unable to update Product with id (123) - Please enter a valid product id !`
    );
  });

  it(`should update quantity of ordered product number ${schema.op_id} to (20)`, async () => {
    const result = await route
      .put(`/api/user/account/ordered-products`)
      .set("Authorization", `Bearer ${token}`)
      .set("Content-type", "application/json")
      .send({ p_id: pId, quantity: 20 });
    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      message: "Product quantity updated successfully",
      data: {
        op_id: schema.op_id,
        order_id: schema.order_id,
        product_id: pId,
        quantity: 20,
        created_at: time,
      },
    });
  });

  it(`should not delete ordered product number (2)`, async () => {
    const result = await route
      .delete(`/api/user/account/ordered-products/2`)
      .set("Authorization", `Bearer ${token}`)
      .set("Content-type", "application/json");
    expect(result.status).toBe(404);
    expect(result.body).toEqual({
      message: "Delete failed !",
      data: "Order with id (2) doesn't exist",
    });
  });

  it(`should not delete ordered product for invalid input`, async () => {
    const result = await route
      .delete(`/api/user/account/ordered-products/anything`)
      .set("Authorization", `Bearer ${token}`)
      .set("Content-type", "application/json");
    expect(result.status).toBe(400);
    expect(result.body).toEqual({
      status: "Error",
      message: "Please enter a valid op id !",
    });
  });

  // Services

  it(`should get end point /api/users/:id/account/review/ordered-products`, async () => {
    const response = await route
      .get(`/api/users/${userId}/account/review/ordered-products`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: `Data generated successfully for user id (${userId})`,
      data: [
        {
          op_id: schema.op_id,
          order_id: schema.order_id,
          order_status: "complete",
          product_id: pId,
          quantity: 20,
          created_at: time,
        },
      ],
    });
  });

  it(`should get end point /api/products/most/popular`, async () => {
    const response = await route.get("/api/products/most/popular");
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual("Data generated successfully");
  });

  it(`should get end point /api/users/:uid/orders/:oid/account/review/ordered-products `, async () => {
    const response = await route
      .get(`/api/users/${userId}/orders/${schema.order_id}/account/review/ordered-products`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });

  it(`should get end point /api/users/:uid/account/most-recent/purchases`, async () => {
    const response = await route
      .get(`/api/users/${userId}/account/most-recent/purchases`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });

  // Deleting data

  it("should delete one row from ordered products", async () => {
    const result = await route
      .delete(`/api/user/account/ordered-products/${schema.op_id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(result.status).toBe(200);
    expect(result.body.message).toEqual(`Row number ${schema.op_id} was deleted successfully`);
  });

  it(`should delete one product`, async () => {
    const result = await route.delete(`/api/products/${pId}`);
    expect(result.status).toBe(200);
    expect(result.body.message).toEqual(`Product deleted successfully`);
  });

  it(`should delete order number ${schema.order_id}`, async () => {
    const response = await route
      .delete(`/api/user/account/orders/${schema.order_id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual(`Order deleted successfully`);
  });

  it(`should delete one user`, async () => {
    const response = await route
      .delete(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual(`User deleted successfully`);
  });

  afterAll(async () => {
    const conct = await pgDB.connect();
    await conct.query(`ALTER SEQUENCE orders_order_id_seq RESTART WITH 1`);
    await conct.query(`ALTER SEQUENCE ordered_products_op_id_seq RESTART WITH 1`);
    console.log("Sequence altered successfully");
    conct.release();
  });
});
