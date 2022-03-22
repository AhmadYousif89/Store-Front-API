"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = exports.route = void 0;
const app_1 = __importDefault(require("../../app"));
const database_1 = __importDefault(require("../../database"));
const supertest_1 = __importDefault(require("supertest"));
const users_1 = require("../../api/users/users");
const orders_1 = require("../../api/orders/orders");
const products_1 = require("../../api/products/products");
const orderedProducts_1 = require("../../api/orderedProducts/orderedProducts");
const { SERVER_PORT } = process.env;
exports.route = (0, supertest_1.default)(app_1.default);
let userId = "";
let pId = "";
let time = "";
let token = "";
exports.schema = {
    u_name: "Ali",
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
};
describe("Testing Application Functionality: \n", () => {
    it(`server should be running on http://localhost:${SERVER_PORT} with status code 200`, async () => {
        const response = await exports.route.get("/");
        expect(response.statusCode).toBe(200);
    });
    it(`should get end point /users with status code 401 and error message`, async () => {
        const response = await exports.route.get("/users");
        expect(response.statusCode).toBe(401);
        expect(response.body).toEqual({ message: "Access denied, Faild to authenticate !" });
    });
    it(`should get end point /products with status code 404 and error message`, async () => {
        const response = await exports.route.get("/products");
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toEqual("No Products Were Found !");
    });
    it(`should get end point /products/most/popular with status code 404 and error message`, async () => {
        const response = await exports.route.get("/products/most/popular");
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toEqual("No Popular Products Were Found !");
    });
    it(`should get end point /user/account/orders with status code 404 and error message`, async () => {
        const response = await exports.route.get("/user/account/orders");
        expect(response.statusCode).toBe(401);
        expect(response.body).toEqual({ message: "Access denied, Faild to authenticate !" });
    });
    it(`should get end point /user/account/ordered-products with status code 404 and error message`, async () => {
        const response = await exports.route.get("/user/account/ordered-products");
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toEqual("No Data Were Found !");
    });
    it(`should get end point /users/:id/account/review/ordered-products with status code 401 and error message`, async () => {
        const response = await exports.route.get(`/users/(any user)/account/review/ordered-products`);
        expect(response.statusCode).toBe(401);
        expect(response.body).toEqual({ message: "Access denied, Faild to authenticate !" });
    });
    it(`should get end point /users/:uid/orders/:oid/account/review/ordered-products with status code 401 and error message`, async () => {
        const response = await exports.route.get(`/users/(any user)/orders/${exports.schema.order_id}/account/review/ordered-products`);
        expect(response.statusCode).toBe(401);
        expect(response.body).toEqual({ message: "Access denied, Faild to authenticate !" });
    });
    it(`should get end point /users/:uid/account/most-recent/purchases with status code 401 and error message`, async () => {
        const response = await exports.route.get(`/users/(any user)/account/most-recent/purchases`);
        expect(response.statusCode).toBe(401);
        expect(response.body).toEqual({ message: "Access denied, Faild to authenticate !" });
    });
    describe("Testing app end points: \n", () => {
        it("should create user and extract id", async () => {
            const createUser = await users_1.userModel.create(exports.schema);
            expect(createUser?.message).toEqual("User created successfully");
            console.log(`user has been created \n`);
            const user = await users_1.userModel.index();
            userId = user[0].u_id;
            console.log(`user id extracted: ${userId}`);
        });
        it(`should create product and extract id`, async () => {
            const createProduct = await products_1.productModel.create(exports.schema);
            expect(createProduct?.message).toEqual("Product created successfully");
            console.log(`product has been created \n`);
            const product = await products_1.productModel.index();
            pId = product[0].p_id;
            console.log(`product id extracted: ${pId} \n`);
        });
        it(`should create new order for user ${userId}`, async () => {
            const createOrder = await orders_1.orderModel.create({
                u_id: userId,
                order_status: exports.schema.order_status,
            });
            expect(createOrder?.message).toEqual("Order created successfully");
            console.log(`order has been created \n`);
        });
        it(`should add product to order number (${exports.schema.order_id})`, async () => {
            const createOrder = await orderedProducts_1.OPT.addProducts({
                p_id: pId,
                order_id: exports.schema.order_id,
                quantity: exports.schema.quantity,
            });
            expect(createOrder?.message).toEqual(`Product has been added successfully to order number (${exports.schema.order_id})`);
            console.log(`product added to order \n`);
        });
        it("should extract time of creation of ordered product", async () => {
            const op = await orderedProducts_1.OPT.index();
            time = JSON.stringify(op[0].created_at).replaceAll(`"`, "");
            console.log(`time extracted: ${time} \n`);
        });
        it("should not get user until authorized", async () => {
            const result = await exports.route.get(`/users/${userId}`);
            expect(result.statusCode).toBe(401);
            expect(result.body).toEqual({
                message: "Access denied, Faild to authenticate !",
            });
        });
        it(`should authenticate user and create token`, async () => {
            const response = await exports.route
                .post(`/users/login`)
                .set("Content-type", "application/json")
                .send({ name: exports.schema.u_name, password: exports.schema.password });
            expect(response.status).toEqual(200);
            const { message, data, token: userToken } = response.body;
            expect(message).toEqual("User authenticated successfully");
            expect(data).toEqual({
                u_id: userId,
                u_name: exports.schema.u_name,
            });
            token = userToken;
        });
        it("should authenticate and allow access to next route", async () => {
            const result = await exports.route.get(`/users/${userId}`).set("Authorization", `Bearer ${token}`);
            expect(result.status).toBe(200);
            expect(result.body).toEqual({
                message: "User generated successfully",
                data: {
                    u_id: userId,
                    u_name: exports.schema.u_name,
                },
            });
        });
        it(`should not authenticate user and display error message`, async () => {
            const response = await exports.route
                .post(`/users/login`)
                .set("Content-type", "application/json")
                .send({ name: "X", password: "abc" });
            expect(response.status).toEqual(401);
            expect(response.body).toEqual({
                message: "Authentication failed !",
                data: "Invalid password or User Name",
            });
        });
        it("should get all users", async () => {
            const result = await exports.route.get(`/users`).set("Authorization", `Bearer ${token}`);
            expect(result.statusCode).toBe(200);
            expect(result.body).toEqual({
                message: "Data generated successfully",
                data: [
                    {
                        u_id: userId,
                        u_name: exports.schema.u_name,
                    },
                ],
            });
        });
        it("should update one user and SET password to = (abc)", async () => {
            const result = await exports.route
                .put(`/users`)
                .set("Content-type", "application/json")
                .set("Authorization", `Bearer ${token}`)
                .send({ uid: userId, password: "abc" });
            expect(result.status).toEqual(200);
            expect(result.body).toEqual({
                message: "User updated successfully",
                data: { u_id: userId, u_name: exports.schema.u_name },
            });
        });
        it("should not delete user because of foregin key constrain", async () => {
            const result = await exports.route.delete(`/users/${userId}`);
            expect(result.status).toEqual(500);
            expect(result.body).toEqual({
                message: `Request Failed ! Unable to delete user with id (${userId}) - User can not be deleted - delete any related orders first !`,
            });
        });
        it("should not delete user and display error message", async () => {
            const result = await exports.route.delete(`/users/9586560b-8e75-46b5-bcaf-ebd2d1033308`);
            expect(result.status).toEqual(404);
            expect(result.body).toEqual({
                message: "Delete failed !",
                data: `User with id (9586560b-8e75-46b5-bcaf-ebd2d1033308) doesn't exist`,
            });
        });
        it(`should get all data from table products`, async () => {
            const response = await exports.route.get(`/products`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({
                message: "Data generated successfully",
                data: [
                    {
                        p_id: pId,
                        category: exports.schema.category,
                        p_name: exports.schema.p_name,
                        brand: exports.schema.brand,
                        maker: exports.schema.maker,
                        price: exports.schema.price,
                        popular: exports.schema.popular,
                    },
                ],
            });
        });
        it(`should get one product`, async () => {
            const response = await exports.route.get(`/products/${pId}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({
                message: "Product generated successfully",
                data: {
                    p_id: pId,
                    category: exports.schema.category,
                    p_name: exports.schema.p_name,
                    brand: exports.schema.brand,
                    maker: exports.schema.maker,
                    price: exports.schema.price,
                    popular: exports.schema.popular,
                },
            });
        });
        it(`should update the product price and popularity to (900 , yes)`, async () => {
            const response = await exports.route
                .put(`/products`)
                .set("Content-type", "application/json")
                .send({ id: pId, price: 900, popular: "yes" });
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({
                message: "Product updated successfully",
                data: {
                    p_id: pId,
                    category: exports.schema.category,
                    p_name: exports.schema.p_name,
                    brand: exports.schema.brand,
                    maker: exports.schema.maker,
                    price: 900,
                    popular: "yes",
                },
            });
        });
        it(`should not delete product because of foregin key constrain`, async () => {
            const response = await exports.route.delete(`/products/${pId}`);
            expect(response.status).toBe(500);
            expect(response.body).toEqual({
                message: `Request Failed ! Unable to delete Product with id (${pId}) - Product can not be deleted - remove this product from any related orders !`,
            });
        });
        it("should get all orders", async () => {
            const result = await exports.route
                .get("/user/account/orders")
                .set("Authorization", `Bearer ${token}`);
            expect(result.status).toBe(200);
            expect(result.body).toEqual({
                message: "Data generated successfully",
                data: [
                    {
                        order_id: exports.schema.order_id,
                        order_status: exports.schema.order_status,
                        user_id: userId,
                    },
                ],
            });
        });
        it("should get one order", async () => {
            const result = await exports.route
                .get(`/user/account/orders/${exports.schema.order_id}`)
                .set("Authorization", `Bearer ${token}`);
            expect(result.status).toBe(200);
            expect(result.body).toEqual({
                message: "Order generated successfully",
                data: {
                    order_id: exports.schema.order_id,
                    order_status: exports.schema.order_status,
                    user_id: userId,
                },
            });
        });
        it("should not update order status", async () => {
            const result = await exports.route
                .put(`/user/account/orders`)
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
            const result = await exports.route
                .put(`/user/account/orders`)
                .set("Authorization", `Bearer ${token}`)
                .set("Content-type", "application/json")
                .send({ order_id: exports.schema.order_id, status: exports.schema.order_status });
            expect(result.status).toBe(200);
            expect(result.body).toEqual({
                message: `Order number (${exports.schema.order_id}) already has a status of (${exports.schema.order_status}) !`,
            });
        });
        it("should update order status to (complete)", async () => {
            const result = await exports.route
                .put(`/user/account/orders`)
                .set("Authorization", `Bearer ${token}`)
                .set("Content-type", "application/json")
                .send({ order_id: exports.schema.order_id, status: "complete" });
            expect(result.status).toBe(200);
            expect(result.body).toEqual({
                message: "Order updated successfully",
                data: {
                    order_id: exports.schema.order_id,
                    order_status: "complete",
                    user_id: userId,
                },
            });
        });
        it("should not update order status to any other status if it's already (complete)", async () => {
            const result = await exports.route
                .put(`/user/account/orders`)
                .set("Authorization", `Bearer ${token}`)
                .set("Content-type", "application/json")
                .send({ order_id: exports.schema.order_id, status: exports.schema.order_status });
            expect(result.status).toBe(200);
            expect(result.body).toEqual({
                message: `Order number (${exports.schema.order_id}) already has a status of (complete) - you may review your order or delete it if you want !`,
            });
        });
        it(`should not delete order because of foregin key constrain`, async () => {
            const response = await exports.route
                .delete(`/user/account/orders/${exports.schema.order_id}`)
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(500);
            expect(response.body).toEqual({
                message: `Request Failed ! Unable to delete order with id (${exports.schema.order_id}) - Please remove any products related to this order first !`,
            });
        });
        it("should get all ordered products", async () => {
            const result = await exports.route.get("/user/account/ordered-products");
            expect(result.status).toBe(200);
            expect(result.body).toEqual({
                message: "Data generated successfully",
                data: [
                    {
                        op_id: exports.schema.op_id,
                        order_id: exports.schema.order_id,
                        product_id: pId,
                        quantity: exports.schema.quantity,
                        created_at: time,
                    },
                ],
            });
        });
        it("should get one ordered products", async () => {
            const result = await exports.route.get(`/user/account/ordered-products/${exports.schema.op_id}`);
            expect(result.status).toBe(200);
            expect(result.body).toEqual({
                message: "Data generated successfully",
                data: {
                    op_id: exports.schema.op_id,
                    order_id: exports.schema.order_id,
                    product_id: pId,
                    quantity: exports.schema.quantity,
                    created_at: time,
                },
            });
        });
        it(`should not update ordered product number ${exports.schema.op_id}`, async () => {
            const result = await exports.route
                .put(`/user/account/ordered-products`)
                .set("Content-type", "application/json")
                .send({ p_id: pId, quantity: 0 });
            expect(result.status).toBe(400);
            expect(result.body).toEqual({
                status: "Error",
                message: "Please provide correct details before updating !",
            });
        });
        it(`should not update ordered product number ${exports.schema.op_id}`, async () => {
            const result = await exports.route
                .put(`/user/account/ordered-products`)
                .set("Content-type", "application/json")
                .send({ p_id: "325b12e8-9676-4af8-8c12-34816ecb8ce1", quantity: 1 });
            expect(result.status).toBe(404);
            expect(result.body).toEqual({
                message: "Update failed !",
                data: `Product with id (325b12e8-9676-4af8-8c12-34816ecb8ce1) doesn't exist`,
            });
        });
        it(`should not update ordered product number ${exports.schema.op_id}`, async () => {
            const result = await exports.route
                .put(`/user/account/ordered-products`)
                .set("Content-type", "application/json")
                .send({ p_id: "any id", quantity: 1 });
            expect(result.status).toBe(500);
            expect(result.body).toEqual({
                message: `Request Failed ! Unable to update Product with id (any id) - Please enter a valid product id !`,
            });
        });
        it(`should not add products to order number ${exports.schema.op_id}`, async () => {
            const result = await exports.route
                .post(`/user/account/orders/${exports.schema.order_id}/products`)
                .set("Authorization", `Bearer ${token}`)
                .set("Content-type", "application/json")
                .send({ p_id: pId, quantity: 10 });
            expect(result.status).toBe(500);
            expect(result.body).toEqual({
                message: `Error: Unable to add product (${pId}) to order (${exports.schema.order_id}) because order status is already (complete)`,
            });
        });
        it(`should update quantity of ordered product number ${exports.schema.op_id} to (20)`, async () => {
            const result = await exports.route
                .put(`/user/account/ordered-products`)
                .set("Content-type", "application/json")
                .send({ p_id: pId, quantity: 20 });
            expect(result.status).toBe(200);
            expect(result.body).toEqual({
                message: "Product quantity updated successfully",
                data: {
                    op_id: exports.schema.op_id,
                    order_id: exports.schema.order_id,
                    product_id: pId,
                    quantity: 20,
                    created_at: time,
                },
            });
        });
        it(`should get end point /users/:id/account/review/ordered-products`, async () => {
            const response = await exports.route
                .get(`/users/${userId}/account/review/ordered-products`)
                .set("Authorization", `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({
                message: `Data generated successfully for user id (${userId})`,
                data: [
                    {
                        op_id: exports.schema.op_id,
                        order_id: exports.schema.order_id,
                        order_status: "complete",
                        product_id: pId,
                        quantity: 20,
                        created_at: time,
                    },
                ],
            });
        });
        it(`should get end point /products/most/popular`, async () => {
            const response = await exports.route.get("/products/most/popular");
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toEqual("Data generated successfully");
        });
        it(`should get end point /users/:uid/orders/:oid/account/review/ordered-products `, async () => {
            const response = await exports.route
                .get(`/users/${userId}/orders/${exports.schema.order_id}/account/review/ordered-products`)
                .set("Authorization", `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
        });
        it(`should get end point /users/:uid/account/most-recent/purchases`, async () => {
            const response = await exports.route
                .get(`/users/${userId}/account/most-recent/purchases`)
                .set("Authorization", `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
        });
        it("should delete one row from ordered products", async () => {
            const result = await exports.route.delete(`/user/account/ordered-products/${exports.schema.op_id}`);
            expect(result.status).toBe(200);
            expect(result.body.message).toEqual(`Row number ${exports.schema.op_id} was deleted successfully`);
        });
        it(`should delete one product`, async () => {
            const result = await exports.route.delete(`/products/${pId}`).set("Authorization", `Bearer ${token}`);
            expect(result.status).toBe(200);
            expect(result.body.message).toEqual(`Product deleted successfully`);
        });
        it(`should delete order number ${exports.schema.order_id}`, async () => {
            const response = await exports.route
                .delete(`/user/account/orders/${exports.schema.order_id}`)
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body.message).toEqual(`Order deleted successfully`);
        });
        it(`should delete one user`, async () => {
            const response = await exports.route.delete(`/users/${userId}`);
            expect(response.status).toBe(200);
            expect(response.body.message).toEqual(`User deleted successfully`);
        });
        afterAll(async () => {
            const conct = await database_1.default.connect();
            await conct.query(`ALTER SEQUENCE orders_order_id_seq RESTART WITH 1`);
            await conct.query(`ALTER SEQUENCE ordered_products_op_id_seq RESTART WITH 1`);
            console.log("seq altered");
            conct.release();
        });
    });
});
