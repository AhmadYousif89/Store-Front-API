"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const app_1 = __importDefault(require("../app"));
const supertest_1 = __importDefault(require("supertest"));
const users_1 = require("./../models/users");
const mobile_1 = require("../models/mobile");
const port = process.env.SERVER_PORT;
exports.route = (0, supertest_1.default)(app_1.default);
describe("Testing Application Functionality: \n", () => {
    beforeAll(async () => {
        await users_1.userStore.createUser({
            u_name: "Ali",
            u_password: "123",
        });
        console.log("user has been created");
        await mobile_1.mobileStore.createMob({
            brand_name: "Galaxy",
            model_name: "S20",
            manufacturer: "SAMSUNG",
            price: 1100,
            made_in: "SK",
        });
        console.log("mobile has been created");
    });
    describe("Testing app end points: \n", () => {
        let mobId;
        it("should extract mobile Id", async () => {
            const mob = await mobile_1.mobileStore.getAllMobs();
            if (mob) {
                mobId = mob[0].mob_uid;
            }
            expect(mob[0].mob_uid).toEqual(mobId);
            console.log(`mob id extracted: ${mobId}`);
        });
        it(`server should be running on http://localhost:${port} with status code 200`, async () => {
            const response = await exports.route.get("/");
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
        it(`should get one product from table mobiles /products/mobiles/${mobId}`, async () => {
            const response = await exports.route.get(`/products/mobiles/${mobId}`);
            expect(response.body).toEqual([
                {
                    mob_uid: mobId,
                    brand_name: "Galaxy",
                    model_name: "S20",
                    manufacturer: "SAMSUNG",
                    price: 1100,
                    made_in: "SK",
                },
            ]);
        });
        it(`should update one product price to (900) by Id /products/mobiles/update/${mobId}/900`, async () => {
            const response = await exports.route.get(`/products/mobiles/update/${mobId}/900`);
            expect(response.body).toEqual({});
        });
        it(`should authenticate user and retrive password`, async () => {
            const user = await users_1.userStore.getAllUsers();
            if (user) {
                const userPw = user[0].u_password;
                const response = await exports.route.get(`/auth/Ali/123`);
                expect(response.body).toEqual({
                    u_password: userPw,
                });
            }
        });
        it(`should not authenticate user and display error message`, async () => {
            const response = await exports.route.get(`/auth/Ali/abc`);
            expect(response.body).toEqual("Invalid password or User Name");
        });
        it(`should not authenticate user and display error message`, async () => {
            const response = await exports.route.get(`/auth/Mido/123`);
            expect(response.body).toEqual("Invalid password or User Name");
        });
    });
});
