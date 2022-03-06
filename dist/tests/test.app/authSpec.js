"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database"));
const users_1 = require("../../models/users");
const appSpec_1 = require("./appSpec");
let token = "";
let userId = "";
describe("Testing Authentication route: \n", () => {
    beforeAll(async () => {
        const result = await users_1.userModel.createUser(appSpec_1.user);
        expect(result?.msg).toEqual("User created successfully");
        console.log(`user has been created \n`);
    });
    it("should extract user Id and password", async () => {
        setTimeout(async () => {
            const user = await users_1.userModel.getUsers();
            userId = user[0].u_uid;
            expect(user[0].u_uid).toEqual(userId);
            console.log(`user id extracted: ${userId}`);
        }, 1);
    });
    it(`should authenticate user and create token`, async () => {
        const response = await appSpec_1.route
            .post(`/users/login`)
            .set("Content-type", "application/json")
            .send({ name: appSpec_1.user.u_name, password: appSpec_1.user.password });
        expect(response.status).toEqual(200);
        const { msg, data, token: userToken } = response.body;
        expect(msg).toEqual("User authenticated successfully");
        expect(data).toEqual({
            u_uid: userId,
            u_name: appSpec_1.user.u_name,
        });
        token = userToken;
    });
    it("should authenticate and allow access to one user route", async () => {
        const result = await appSpec_1.route
            .get("/users/id")
            .set("Content-type", "application/json")
            .set("Authorization", `Bearer ${token}`)
            .send({ uid: userId });
        expect(result.status).toBe(200);
        expect(result.body).toEqual({
            msg: "User generated successfully",
            data: {
                u_uid: userId,
                u_name: appSpec_1.user.u_name,
            },
        });
    });
    it(`should not authenticate user and display error message`, async () => {
        const response = await appSpec_1.route
            .post(`/users/login`)
            .set("Content-type", "application/json")
            .send({ name: "X", password: "abc" });
        expect(response.status).toEqual(401);
        expect(response.body).toEqual({
            msg: "Authentication failed !",
            data: "Invalid password or User Name",
        });
    });
    it("should delete all existing users", async () => {
        const conct = await database_1.default.connect();
        await conct.query("DELETE FROM users;");
        conct.release();
    });
});
