"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.product = exports.order = exports.user = exports.route = void 0;
const app_1 = __importDefault(require("../../app"));
const supertest_1 = __importDefault(require("supertest"));
const users_1 = require("../../models/users");
const orders_1 = require("../../models/orders");
const products_1 = require("./../../models/products");
const { SERVER_PORT } = process.env;
exports.route = (0, supertest_1.default)(app_1.default);
let userId = "";
let pId = "";
exports.user = {
    u_name: "Ali",
    password: "123",
};
exports.order = {
    id: 1,
    order_status: "active",
    user_id: userId,
    quantity: 10,
    order_id: 1,
    product_id: pId,
};
exports.product = {
    category: "mobiles",
    p_name: "S20",
    brand: "Galaxy",
    maker: "Samsung",
    price: 1000,
};
describe("Testing Application Functionality: \n", () => {
    it(`server should be running on http://localhost:${SERVER_PORT} with status code 200`, async () => {
        const response = await exports.route.get("/");
        expect(response.statusCode).toBe(200);
    });
    it(`should get end point /users with status code 404 and error message`, async () => {
        const response = await exports.route.get("/users");
        expect(response.statusCode).toBe(404);
        expect(response.body.msg).toEqual("No Users Were Found !");
    });
    it(`should get end point /products with status code 404 and error message`, async () => {
        const response = await exports.route.get("/products");
        expect(response.statusCode).toBe(404);
        expect(response.body.msg).toEqual("No Products Were Found !");
    });
    it(`should get end point /user/cart/orders with status code 404 and error message`, async () => {
        const response = await exports.route.get("/user/cart/orders");
        expect(response.statusCode).toBe(404);
        expect(response.body.msg).toEqual("No Orders Were Found !");
    });
    describe("Testing app end points: \n", () => {
        beforeAll(async () => {
            const createUser = await users_1.userModel.createUser(exports.user);
            expect(createUser?.msg).toEqual("User created successfully");
            console.log(`user has been created \n`);
            const createProduct = await products_1.productModel.createProduct(exports.product);
            expect(createProduct?.msg).toEqual("Product created successfully");
            console.log(`product has been created \n`);
            const createOrder = await orders_1.orderModel.createOrder(exports.order);
            expect(createOrder?.msg).toEqual("Order created successfully");
            console.log(`order has been created \n`);
            const userOrder = await orders_1.orderModel.addProductToOrder(exports.order);
            expect(userOrder?.msg).toEqual(`Product has been added successfully to order number (${exports.order.order_id})`);
            console.log(`product has been added to order (${exports.order.order_id}) \n`);
        });
        it("should extract user Id ", async () => {
            const user = await users_1.userModel.getUsers();
            userId = user[0].u_uid;
            expect(user[0].u_uid).toEqual(userId);
            setTimeout(() => {
                console.log(`user id extracted: ${userId}`);
            }, 1);
        });
        it("should extract product Id", async () => {
            const product = await products_1.productModel.getProducts();
            pId = product[0].p_uid;
            expect(product[0].p_uid).toEqual(pId);
            setTimeout(() => {
                console.log(`product id extracted: ${pId} \n`);
            }, 1);
        });
        it(`should get end point /users with status code 200`, async () => {
            const response = await exports.route.get("/users");
            expect(response.statusCode).toBe(200);
        });
        it(`should get end point /products with status code 200`, async () => {
            const response = await exports.route.get("/products");
            expect(response.statusCode).toBe(200);
        });
        it(`should get end point /user/cart/orders with status code 200`, async () => {
            const response = await exports.route.get("/user/cart/orders");
            expect(response.statusCode).toBe(200);
        });
        it(`should get all data from table products`, async () => {
            const response = await exports.route.get(`/products`);
            expect(response.body).toEqual({
                msg: "Data generated successfully",
                data: [
                    {
                        p_uid: pId,
                        category: exports.product.category,
                        p_name: exports.product.p_name,
                        brand: exports.product.brand,
                        maker: exports.product.maker,
                        price: exports.product.price,
                    },
                ],
            });
        });
        it(`should get one item from table products`, async () => {
            const response = await exports.route.get(`/products/id/${pId}`);
            expect(response.body).toEqual({
                msg: "Product generated successfully",
                data: {
                    p_uid: pId,
                    category: exports.product.category,
                    p_name: exports.product.p_name,
                    brand: exports.product.brand,
                    maker: exports.product.maker,
                    price: exports.product.price,
                },
            });
        });
        it(`should update the price for one item to (900)`, async () => {
            const response = await exports.route
                .put(`/products`)
                .set("Content-type", "application/json")
                .send({ id: pId, price: 900 });
            expect(response.body).toEqual({
                msg: "Product updated successfully",
                data: {
                    p_uid: pId,
                    category: exports.product.category,
                    p_name: exports.product.p_name,
                    brand: exports.product.brand,
                    maker: exports.product.maker,
                    price: 900,
                },
            });
        });
        it(`should delete one item from table Products by ID`, async () => {
            const response = await exports.route
                .delete(`/products/id`)
                .set("Content-type", "application/json")
                .send({ id: pId });
            expect(response.body).toEqual({
                msg: "Product deleted successfully",
                data: {
                    p_uid: pId,
                    category: exports.product.category,
                    p_name: exports.product.p_name,
                    brand: exports.product.brand,
                    maker: exports.product.maker,
                    price: 900,
                },
            });
        });
        it("should get all users from table users", async () => {
            const result = await exports.route.get(`/users`);
            expect(result.body).toEqual({
                msg: "Data generated successfully",
                data: [
                    {
                        u_uid: userId,
                        u_name: exports.user.u_name,
                    },
                ],
            });
        });
        xit("should not get user until authorized", async () => {
            const result = await exports.route.get(`/users/id/${userId}`);
            expect(result.statusCode).toBe(401);
            expect(result.body).toEqual({
                message: "Access denied, Faild to authenticate !",
            });
        });
        it("should update one user and SET password to = (abc)", async () => {
            const result = await exports.route
                .put(`/users`)
                .set("Content-type", "application/json")
                .send({ uid: userId, password: "abc" });
            expect(result.status).toEqual(200);
            expect(result.body).toEqual({
                msg: "User updated successfully",
                data: { u_uid: userId, u_name: exports.user.u_name },
            });
        });
        it("should delete one user from table users by ID", async () => {
            const result = await exports.route
                .delete(`/users/id`)
                .set("Content-type", "application/json")
                .send({ uid: userId });
            expect(result.status).toEqual(200);
            expect(result.body).toEqual({
                msg: "User deleted successfully",
                data: {
                    u_uid: userId,
                    u_name: exports.user.u_name,
                },
            });
        });
        it("should not delete user and display error message", async () => {
            const result = await exports.route
                .delete(`/users/id`)
                .set("Content-type", "application/json")
                .send({ uid: userId });
            expect(result.status).toEqual(404);
            expect(result.body).toEqual({
                msg: "Delete failed !",
                data: `User with id (${userId}) doesn't exist`,
            });
        });
    });
});
