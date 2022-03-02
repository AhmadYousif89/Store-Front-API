"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mobile = exports.user = exports.route = void 0;
const app_1 = __importDefault(require("../app"));
const supertest_1 = __importDefault(require("supertest"));
const users_1 = require("./../models/users");
const mobile_1 = require("../models/mobile");
const { SERVER_PORT } = process.env;
exports.route = (0, supertest_1.default)(app_1.default);
let mobId = "";
let userId = "";
let token = "";
exports.user = {
    u_name: "Ali",
    u_password: "123",
};
exports.mobile = {
    brand_name: "Galaxy",
    model_name: "S20",
    manufacturer: "Samsung",
    price: 1000,
    made_in: "SK",
};
describe("Testing Application Functionality: \n", () => {
    beforeAll(async () => {
        const result = await users_1.userModel.createUser(exports.user);
        expect(result?.msg).toEqual("User created successfully");
        console.log(`user has been created \n`);
    });
    beforeAll(async () => {
        const result = await mobile_1.mobileModel.createMob(exports.mobile);
        expect(result?.msg).toEqual("Mobile created successfully");
        console.log(`mobile has been created \n`);
    });
    it("should extract user Id and password", async () => {
        const user = await users_1.userModel.getAllUsers();
        userId = user[0].u_uid;
        expect(user[0].u_uid).toEqual(userId);
        setTimeout(() => {
            console.log(`user id extracted: ${userId}`);
        }, 1);
    });
    it("should extract mobile Id", async () => {
        const mob = await mobile_1.mobileModel.getAllMobs();
        mobId = mob[0].mob_uid;
        expect(mob[0].mob_uid).toEqual(mobId);
        setTimeout(() => {
            console.log(`mob id extracted: ${mobId} \n`);
        }, 1);
    });
    describe("Testing app end points: \n", () => {
        it(`server should be running on http://localhost:${SERVER_PORT} with status code 200`, async () => {
            const response = await exports.route.get("/");
            expect(response.statusCode).toBe(200);
        });
        it(`should get end point /users with status code 200`, async () => {
            const response = await exports.route.get("/users");
            expect(response.statusCode).toBe(200);
        });
        it(`should get end point /products with status code 200`, async () => {
            const response = await exports.route.get("/products");
            expect(response.statusCode).toBe(200);
        });
        it(`should get end point /products/mobiles with status code 200`, async () => {
            const response = await exports.route.get("/products/mobiles");
            expect(response.statusCode).toBe(200);
        });
        it(`should get all data from table mobiles`, async () => {
            const response = await exports.route.get(`/products/mobiles`);
            expect(response.body).toEqual({
                msg: "Data generated successfully",
                data: [
                    {
                        mob_uid: mobId,
                        brand_name: exports.mobile.brand_name,
                        model_name: exports.mobile.model_name,
                        manufacturer: exports.mobile.manufacturer,
                        price: exports.mobile.price,
                        made_in: exports.mobile.made_in,
                    },
                ],
            });
        });
        it(`should get one item from table mobiles by ID`, async () => {
            const response = await exports.route
                .get(`/products/mobiles/id`)
                .set("Content-type", "application/json")
                .send({ id: mobId });
            expect(response.body).toEqual({
                msg: "Mobile generated successfully",
                data: {
                    mob_uid: mobId,
                    brand_name: exports.mobile.brand_name,
                    model_name: exports.mobile.model_name,
                    manufacturer: exports.mobile.manufacturer,
                    price: exports.mobile.price,
                    made_in: exports.mobile.made_in,
                },
            });
        });
        it(`should update one item price to (900) by ID`, async () => {
            const response = await exports.route
                .put(`/products/mobiles/`)
                .set("Content-type", "application/json")
                .send({ id: mobId, price: 900 });
            expect(response.body).toEqual({
                msg: "Mobile updated successfully",
                data: {
                    mob_uid: mobId,
                    brand_name: exports.mobile.brand_name,
                    model_name: exports.mobile.model_name,
                    manufacturer: exports.mobile.manufacturer,
                    price: 900,
                    made_in: exports.mobile.made_in,
                },
            });
        });
        it(`should delete one item from table mobiles by ID`, async () => {
            const response = await exports.route
                .delete(`/products/mobiles/id`)
                .set("Content-type", "application/json")
                .send({ id: mobId });
            expect(response.body).toEqual({
                msg: "Mobile deleted successfully",
                data: {
                    mob_uid: mobId,
                    brand_name: exports.mobile.brand_name,
                    model_name: exports.mobile.model_name,
                    manufacturer: exports.mobile.manufacturer,
                    price: 900,
                    made_in: exports.mobile.made_in,
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
        it("should get one user from table users by ID", async () => {
            const result = await exports.route
                .get(`/users/id`)
                .set("Content-type", "application/json")
                .send({ uid: userId });
            expect(result.statusCode).toBe(200);
            expect(result.body).toEqual({
                msg: "User generated successfully",
                data: {
                    u_uid: userId,
                    u_name: exports.user.u_name,
                },
            });
        });
        it(`should authenticate user and retrive password`, async () => {
            const response = await exports.route
                .post(`/users/login`)
                .set("Content-type", "application/json")
                .send({ name: exports.user.u_name, password: exports.user.u_password });
            expect(response.status).toEqual(200);
            const { msg, data, token: userToken } = response.body;
            expect(msg).toEqual("User authenticated successfully");
            expect(data).toEqual({
                u_uid: userId,
                u_name: exports.user.u_name,
            });
            token = userToken;
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
        it(`should not authenticate user and display error message`, async () => {
            const response = await exports.route
                .post(`/users/login`)
                .set("Content-type", "application/json")
                .send({ name: exports.user.u_name, password: exports.user.u_password });
            expect(response.status).toEqual(401);
            expect(response.body).toEqual({
                msg: "Authentication failed !",
                data: "Invalid password or User Name",
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
