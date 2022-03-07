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
exports.user = {
    u_name: "Ali",
    password: "123",
};
exports.order = {
    o_id: 1,
    order_status: "new",
    user_id: userId,
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
    product_id: pId,
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
    it(`should get end point /user/cart/ordered-products with status code 404 and error message`, async () => {
        const response = await exports.route.get("/user/cart/ordered-products");
        expect(response.statusCode).toBe(404);
        expect(response.body.msg).toEqual("No Data Were Found !");
    });
    describe("Testing app end points: \n", () => {
        beforeAll(async () => {
            const createUser = await users_1.userModel.create(exports.user);
            expect(createUser?.msg).toEqual("User created successfully");
            console.log(`user has been created \n`);
            const createProduct = await products_1.productModel.create(exports.product);
            expect(createProduct?.msg).toEqual("Product created successfully");
            console.log(`product has been created \n`);
            const createOrder = await orders_1.orderModel.create(exports.order);
            expect(createOrder?.msg).toEqual("Order created successfully");
            console.log(`order has been created \n`);
            const userOrder = await orderedProducts_1.OPT.addProducts(exports.ops);
            expect(userOrder?.msg).toEqual(`Product has been added successfully to order number (${exports.order.o_id})`);
            console.log(`product has been added to order (${exports.order.o_id}) \n`);
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
        it(`should get one item from table products`, async () => {
            const response = await exports.route.get(`/products/id/${pId}`);
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
        it(`should update the price and popular for one product to (900 , yes)`, async () => {
            const response = await exports.route
                .put(`/products`)
                .set("Content-type", "application/json")
                .send({ id: pId, price: 900, popular: "yes" });
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
        it(`should delete one item from table Products by ID`, async () => {
            const response = await exports.route
                .delete(`/products/id`)
                .set("Content-type", "application/json")
                .send({ id: pId });
            expect(response.body).toEqual({
                msg: "Product deleted successfully",
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
        it("should not get user until authorized", async () => {
            const result = await exports.route.get(`/users/${userId}`);
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
                data: { u_id: userId, u_name: exports.user.u_name },
            });
        });
        it("should delete one user from table users by id", async () => {
            const result = await exports.route.delete(`/users/${userId}`);
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
            const result = await exports.route.delete(`/users/9586560b-8e75-46b5-bcaf-ebd2d1033308`);
            expect(result.status).toEqual(404);
            expect(result.body).toEqual({
                msg: "Delete failed !",
                data: `User with id (${userId}) doesn't exist`,
            });
        });
    });
});
