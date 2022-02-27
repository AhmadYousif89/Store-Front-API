"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPw = exports.userId = exports.mobId = exports.route = void 0;
const app_1 = __importDefault(require("../app"));
const supertest_1 = __importDefault(require("supertest"));
const users_1 = require("./../models/users");
const mobile_1 = require("../models/mobile");
const port = process.env.SERVER_PORT;
exports.route = (0, supertest_1.default)(app_1.default);
describe("Testing Application Functionality: \n", () => {
    describe("Testing app end points: \n", () => {
        it("should extract user Id and password", async () => {
            const user = await users_1.userStore.getAllUsers();
            if (user) {
                exports.userId = user[0].u_uid;
                exports.userPw = user[0].u_password;
            }
            expect(user[0].u_uid).toEqual(exports.userId);
            expect(user[0].u_password).toEqual(exports.userPw);
            setTimeout(() => {
                console.log(`user id extracted: ${exports.userId}`);
                console.log(`user pw extracted: ${exports.userPw} \n`);
            }, 1);
        });
        it("should extract mobile Id", async () => {
            const mob = await mobile_1.mobileStore.getAllMobs();
            if (mob) {
                exports.mobId = mob[0].mob_uid;
            }
            expect(mob[0].mob_uid).toEqual(exports.mobId);
            setTimeout(() => {
                console.log(`mob id extracted: ${exports.mobId} \n`);
            }, 0);
        });
        it(`server should be running on http://localhost:${port} with status code 200`, async () => {
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
        beforeAll(async () => {
            const response = await exports.route.post("/products/mobiles/create/Galaxy/S20/1100/SAMSUNG/SK");
            expect(response.statusCode).toBe(201);
            console.log(`mobile has been created \n`);
        });
        it(`should get all data from table mobiles`, async () => {
            const response = await exports.route.get(`/products/mobiles`);
            expect(response.body).toEqual([
                {
                    mob_uid: exports.mobId,
                    brand_name: "Galaxy",
                    model_name: "S20",
                    manufacturer: "SAMSUNG",
                    price: 1100,
                    made_in: "SK",
                },
            ]);
        });
        it(`should get one item from table mobiles by ID`, async () => {
            const response = await exports.route.get(`/products/mobiles/${exports.mobId}`);
            expect(response.body).toEqual([
                {
                    mob_uid: exports.mobId,
                    brand_name: "Galaxy",
                    model_name: "S20",
                    manufacturer: "SAMSUNG",
                    price: 1100,
                    made_in: "SK",
                },
            ]);
        });
        it(`should update one item price to (900) by ID`, async () => {
            const response = await exports.route.put(`/products/mobiles/update/${exports.mobId}/900`);
            expect(response.body).toEqual([
                {
                    mob_uid: exports.mobId,
                    brand_name: "Galaxy",
                    model_name: "S20",
                    manufacturer: "SAMSUNG",
                    price: 900,
                    made_in: "SK",
                },
            ]);
        });
        beforeAll(async () => {
            const response = await exports.route.post("/users/create/Ali/123");
            expect(response.statusCode).toBe(201);
            console.log(`user has been created \n`);
        });
        it("should get all users from table users", async () => {
            const result = await exports.route.get(`/users`);
            expect(result.body).toEqual([
                {
                    u_uid: exports.userId,
                    u_name: "Ali",
                    u_password: exports.userPw,
                },
            ]);
        });
        it("should get one user from table users by ID", async () => {
            const result = await exports.route.get(`/users/${exports.userId}`);
            expect(result.body).toEqual([
                {
                    u_uid: exports.userId,
                    u_name: "Ali",
                    u_password: exports.userPw,
                },
            ]);
        });
        it("should update one user and SET password to = (abc)", async () => {
            const user = await exports.route.put(`/users/update/${exports.userId}/abc`);
            exports.userPw = user.body[0].u_password;
            expect(user.body).toEqual([
                {
                    u_uid: exports.userId,
                    u_name: "Ali",
                    u_password: exports.userPw,
                },
            ]);
        });
        it(`should authenticate user and retrive password`, async () => {
            const user = await users_1.userStore.getAllUsers();
            if (user) {
                const userPw = user[0].u_password;
                const response = await exports.route.get(`/auth/Ali/abc`);
                expect(response.body).toEqual({
                    u_password: userPw,
                });
            }
        });
        it(`should not authenticate user and display error message`, async () => {
            const response = await exports.route.get(`/auth/Ali/123`);
            expect(response.body).toEqual("Invalid password or User Name");
        });
        it(`should not authenticate user and display error message`, async () => {
            const response = await exports.route.get(`/auth/Ali/abc`);
            expect(response.body).not.toEqual("Invalid password or User Name");
        });
    });
});
