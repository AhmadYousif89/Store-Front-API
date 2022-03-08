"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ops = exports.product = exports.order = exports.user = exports.route = void 0;
const app_1 = __importDefault(require("../../app"));
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
exports.user = {
    u_name: "Ali",
    password: "123",
};
exports.order = {
    o_id: 1,
    order_status: "new",
};
exports.product = {
    category: "mobiles",
    p_name: "S20",
    brand: "Galaxy",
    maker: "Samsung",
    price: 1000,
    popular: "no",
};
exports.ops = {
    op_id: 1,
    quantity: 10,
    order_id: 1,
};
describe("Testing Application Functionality: \n", () => {
    it("test", () => {
        expect(1).toBe(1);
    });
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
        expect(response.body.msg).toEqual("No Products Were Found !");
    });
    it(`should get end point /products/most/popular with status code 404 and error message`, async () => {
        const response = await exports.route.get("/products/most/popular");
        expect(response.statusCode).toBe(404);
        expect(response.body.msg).toEqual("No Popular Products Were Found !");
    });
    it(`should get end point /user/account/orders with status code 404 and error message`, async () => {
        const response = await exports.route.get("/user/account/orders");
        expect(response.statusCode).toBe(404);
        expect(response.body.msg).toEqual("No Orders Were Found !");
    });
    it(`should get end point /user/account/ordered-products with status code 404 and error message`, async () => {
        const response = await exports.route.get("/user/account/ordered-products");
        expect(response.statusCode).toBe(404);
        expect(response.body.msg).toEqual("No Data Were Found !");
    });
    it(`should get end point /users/:uid/account/most-recent/purchases with status code 404 and error message`, async () => {
        const response = await exports.route.get(`/user/${userId}/account/ordered-products`);
        expect(response.statusCode).toBe(404);
    });
    it(`should get end point /users/:id/account/review/ordered-products with status code 404 and error message`, async () => {
        const response = await exports.route.get(`/users/${userId}/account/review/ordered-products`);
        expect(response.statusCode).toBe(404);
    });
    it(`should get end point /users/:uid/orders/:oid/account/review/ordered-products with status code 404 and error message`, async () => {
        const response = await exports.route.get(`/users/${userId}/orders/${exports.order.o_id}/account/review/ordered-products`);
        expect(response.statusCode).toBe(404);
    });
    describe("Testing app end points: \n", () => {
        beforeAll(async () => {
            const createUser = await users_1.userModel.create(exports.user);
            expect(createUser?.msg).toEqual("User created successfully");
            console.log(`user has been created \n`);
            const createProduct = await products_1.productModel.create(exports.product);
            expect(createProduct?.msg).toEqual("Product created successfully");
            console.log(`product has been created \n`);
        });
        it("should extract user Id ", async () => {
            const user = await users_1.userModel.index();
            userId = user[0].u_id;
            expect(user[0].u_id).toEqual(userId);
            setTimeout(() => {
                console.log(`user id extracted: ${userId}`);
            }, 1);
        });
        it("should extract product Id", async () => {
            const product = await products_1.productModel.index();
            pId = product[0].p_id;
            expect(product[0].p_id).toEqual(pId);
            setTimeout(() => {
                console.log(`product id extracted: ${pId} \n`);
            }, 1);
        });
        it(`should create new order for user ${userId}`, async () => {
            const createOrder = await orders_1.orderModel.create({
                user_id: userId,
                order_status: exports.order.order_status,
            });
            expect(createOrder?.msg).toEqual("Order created successfully");
            console.log(`order has been created \n`);
        });
        it(`should add product to order number (${exports.order.o_id}) for user (${userId})`, async () => {
            const createOrder = await orderedProducts_1.OPT.addProducts({
                order_id: exports.order.o_id,
                product_id: pId,
                quantity: exports.ops.quantity,
            });
            expect(createOrder?.msg).toEqual(`Product has been added successfully to order number (${exports.order.o_id})`);
            console.log(`product added to order \n`);
        });
        it("should extract time of creation of ordered product", async () => {
            const op = await orderedProducts_1.OPT.index();
            time = JSON.stringify(op[0].created_in).replaceAll(`"`, "");
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
                .send({ name: exports.user.u_name, password: exports.user.password });
            expect(response.status).toEqual(200);
            const { msg, data, token: userToken } = response.body;
            expect(msg).toEqual("User authenticated successfully");
            expect(data).toEqual({
                u_id: userId,
                u_name: exports.user.u_name,
            });
            token = userToken;
        });
        it("should authenticate and allow access to next route", async () => {
            const result = await exports.route.get(`/users/${userId}`).set("Authorization", `Bearer ${token}`);
            expect(result.status).toBe(200);
            expect(result.body).toEqual({
                msg: "User generated successfully",
                data: {
                    u_id: userId,
                    u_name: exports.user.u_name,
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
                msg: "Authentication failed !",
                data: "Invalid password or User Name",
            });
        });
        it("should get all users", async () => {
            const result = await exports.route.get(`/users`).set("Authorization", `Bearer ${token}`);
            expect(result.statusCode).toBe(200);
            expect(result.body).toEqual({
                msg: "Data generated successfully",
                data: [
                    {
                        u_id: userId,
                        u_name: exports.user.u_name,
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
                msg: "User updated successfully",
                data: { u_id: userId, u_name: exports.user.u_name },
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
                msg: "Delete failed !",
                data: `User with id (9586560b-8e75-46b5-bcaf-ebd2d1033308) doesn't exist`,
            });
        });
        it(`should get all data from table products`, async () => {
            const response = await exports.route.get(`/products`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({
                msg: "Data generated successfully",
                data: [
                    {
                        p_id: pId,
                        category: exports.product.category,
                        p_name: exports.product.p_name,
                        brand: exports.product.brand,
                        maker: exports.product.maker,
                        price: exports.product.price,
                        popular: exports.product.popular,
                    },
                ],
            });
        });
        it(`should get one product`, async () => {
            const response = await exports.route.get(`/products/${pId}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({
                msg: "Product generated successfully",
                data: {
                    p_id: pId,
                    category: exports.product.category,
                    p_name: exports.product.p_name,
                    brand: exports.product.brand,
                    maker: exports.product.maker,
                    price: exports.product.price,
                    popular: exports.product.popular,
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
                msg: "Product updated successfully",
                data: {
                    p_id: pId,
                    category: exports.product.category,
                    p_name: exports.product.p_name,
                    brand: exports.product.brand,
                    maker: exports.product.maker,
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
            const result = await exports.route.get("/user/account/orders");
            expect(result.status).toBe(200);
            expect(result.body).toEqual({
                msg: "Data generated successfully",
                data: [
                    {
                        o_id: exports.order.o_id,
                        order_status: exports.order.order_status,
                        user_id: userId,
                    },
                ],
            });
        });
        it("should get one order", async () => {
            const result = await exports.route.get(`/user/account/orders/${exports.order.o_id}`);
            expect(result.status).toBe(200);
            expect(result.body).toEqual({
                msg: "Order generated successfully",
                data: {
                    o_id: exports.order.o_id,
                    order_status: exports.order.order_status,
                    user_id: userId,
                },
            });
        });
        it("should not update order status", async () => {
            const result = await exports.route
                .put(`/user/account/orders`)
                .set("Content-type", "application/json")
                .send({ order_id: 0, status: "" });
            expect(result.status).toBe(400);
            expect(result.body).toEqual({
                status: "Error",
                message: "Please provide a valid order status and id !",
            });
        });
        it(`should not update order status if its already (${exports.order.order_status})`, async () => {
            const result = await exports.route
                .put(`/user/account/orders`)
                .set("Content-type", "application/json")
                .send({ order_id: exports.order.o_id, status: exports.order.order_status });
            expect(result.status).toBe(200);
            expect(result.body).toEqual({
                msg: `Order number (${exports.order.o_id}) already has a status of (${exports.order.order_status}) `,
            });
        });
        it("should update order status to (complete)", async () => {
            const result = await exports.route
                .put(`/user/account/orders`)
                .set("Content-type", "application/json")
                .send({ order_id: exports.order.o_id, status: "complete" });
            expect(result.status).toBe(200);
            expect(result.body).toEqual({
                msg: "Order updated successfully",
                data: {
                    o_id: exports.order.o_id,
                    order_status: "complete",
                    user_id: userId,
                },
            });
        });
        it("should not update order status to any other status if it's already (complete)", async () => {
            const result = await exports.route
                .put(`/user/account/orders`)
                .set("Content-type", "application/json")
                .send({ order_id: exports.order.o_id, status: exports.order.order_status });
            expect(result.status).toBe(200);
            expect(result.body).toEqual({
                msg: `Can not set status of Order number (${exports.order.o_id}) to (${exports.order.order_status}) because it is already (complete) - you may review your order or delete it if you want !`,
            });
        });
        it(`should not delete order because of foregin key constrain`, async () => {
            const response = await exports.route.delete(`/user/account/orders/${exports.order.o_id}`);
            expect(response.status).toBe(500);
            expect(response.body).toEqual({
                message: `Request Failed ! Unable to delete order with id (${exports.order.o_id}) - Please remove any products related to this order first !`,
            });
        });
        it("should get all ordered products", async () => {
            const result = await exports.route.get("/user/account/ordered-products");
            expect(result.status).toBe(200);
            expect(result.body).toEqual({
                msg: "Data generated successfully",
                data: [
                    {
                        op_id: exports.ops.op_id,
                        order_id: exports.ops.order_id,
                        product_id: pId,
                        p_quantity: exports.ops.quantity,
                        created_in: time,
                    },
                ],
            });
        });
        it("should get one ordered products", async () => {
            const result = await exports.route.get(`/user/account/ordered-products/${exports.ops.op_id}`);
            expect(result.status).toBe(200);
            expect(result.body).toEqual({
                msg: "Data generated successfully",
                data: {
                    op_id: exports.ops.op_id,
                    order_id: exports.ops.order_id,
                    product_id: pId,
                    p_quantity: exports.ops.quantity,
                    created_in: time,
                },
            });
        });
        it(`should not update ordered product number ${exports.ops.op_id}`, async () => {
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
        it(`should not update ordered product number ${exports.ops.op_id}`, async () => {
            const result = await exports.route
                .put(`/user/account/ordered-products`)
                .set("Content-type", "application/json")
                .send({ p_id: "325b12e8-9676-4af8-8c12-34816ecb8ce1", quantity: 1 });
            expect(result.status).toBe(404);
            expect(result.body).toEqual({
                msg: "Update failed !",
                data: `Product with id (325b12e8-9676-4af8-8c12-34816ecb8ce1) doesn't exist`,
            });
        });
        it(`should not update ordered product number ${exports.ops.op_id}`, async () => {
            const result = await exports.route
                .put(`/user/account/ordered-products`)
                .set("Content-type", "application/json")
                .send({ p_id: "any id", quantity: 1 });
            expect(result.status).toBe(500);
            expect(result.body).toEqual({
                message: `Request Failed ! Unable to update Product with id (any id) - Please enter a valid product id !`,
            });
        });
        it(`should update quantity of ordered product number ${exports.ops.op_id} to (20)`, async () => {
            const result = await exports.route
                .put(`/user/account/ordered-products`)
                .set("Content-type", "application/json")
                .send({ p_id: pId, quantity: 20 });
            expect(result.status).toBe(200);
            expect(result.body).toEqual({
                msg: "Product quantity updated successfully",
                data: {
                    op_id: exports.ops.op_id,
                    order_id: exports.ops.order_id,
                    product_id: pId,
                    p_quantity: 20,
                    created_in: time,
                },
            });
        });
        it(`should get end point /users/:id/account/review/ordered-products`, async () => {
            const response = await exports.route
                .get(`/users/${userId}/account/review/ordered-products`)
                .set("Authorization", `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({
                msg: `Data generated successfully for user id (${userId})`,
                data: [
                    {
                        op_id: exports.ops.op_id,
                        order_id: exports.ops.order_id,
                        order_status: "complete",
                        product_id: pId,
                        p_quantity: 20,
                        created_in: time,
                    },
                ],
            });
        });
        it(`should get end point /products/most/popular`, async () => {
            const response = await exports.route.get("/products/most/popular");
            expect(response.statusCode).toBe(200);
            expect(response.body.msg).toEqual("Data generated successfully");
        });
        it(`should get end point /users/:uid/orders/:oid/account/review/ordered-products `, async () => {
            const response = await exports.route
                .get(`/users/${userId}/orders/${exports.order.o_id}/account/review/ordered-products`)
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
            const result = await exports.route.delete(`/user/account/ordered-products/${exports.ops.op_id}`);
            expect(result.status).toBe(200);
            expect(result.body.msg).toEqual(`Row number ${exports.ops.op_id} was deleted successfully`);
        });
        it(`should delete product with id ${pId}`, async () => {
            const result = await exports.route.delete(`/products/${pId}`);
            expect(result.status).toBe(200);
            expect(result.body.msg).toEqual(`Product deleted successfully`);
        });
        it(`should delete order number ${exports.order.o_id}`, async () => {
            const response = await exports.route.delete(`/user/account/orders/${exports.order.o_id}`);
            expect(response.status).toBe(200);
            expect(response.body.msg).toEqual(`Order deleted successfully`);
        });
        it(`should delete user with id ${userId}`, async () => {
            const response = await exports.route.delete(`/users/${userId}`);
            expect(response.status).toBe(200);
            expect(response.body.msg).toEqual(`User deleted successfully`);
        });
    });
});
