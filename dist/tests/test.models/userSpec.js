"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../../api/users/users");
const appSpec_1 = require("../test.app.routes/appSpec");
let userId = "";
describe("Testing user Model functions: \n", () => {
    it("should have a get all users method", () => {
        expect(users_1.userModel.index).toBeDefined();
    });
    it("should have a get user by Id method", () => {
        expect(users_1.userModel.show).toBeDefined();
    });
    it("should have a create method", () => {
        expect(users_1.userModel.create).toBeDefined();
    });
    it("should have an update user method", () => {
        expect(users_1.userModel.update).toBeDefined();
    });
    it("should have a delete user method", () => {
        expect(users_1.userModel.delete).toBeDefined();
    });
    describe("Testing SQL functions: \n ", () => {
        it("should create new user", async () => {
            const result = await users_1.userModel.create(appSpec_1.user);
            expect(result).toEqual({
                msg: "User created successfuly",
                ...result,
            });
            console.log("user has been created");
        });
        it("should get all data and extract user Id", async () => {
            const result = await users_1.userModel.index();
            userId = result[0].u_id;
            expect(result).toEqual([
                {
                    u_id: userId,
                    u_name: appSpec_1.user.u_name,
                },
            ]);
            console.log("all users");
        });
        it("should get the count of rows in users table to equal (1) user", async () => {
            const result = await users_1.userModel.index();
            expect(result.length).toEqual(1);
        });
        it("should return the correct user by ID", async () => {
            const result = await users_1.userModel.show(userId);
            expect(result).toEqual({
                msg: "User generated successfully",
                data: {
                    u_uid: userId,
                    u_name: appSpec_1.user.u_name,
                },
            });
            console.log("one user");
        });
        it(`should update the password to = 123 for specific user by ID`, async () => {
            const result = await users_1.userModel.update(userId, "123");
            expect(result).toEqual({
                msg: "User updated successfully",
                data: {
                    u_uid: userId,
                    u_name: appSpec_1.user.u_name,
                },
            });
            console.log("update user");
        });
        it(`should authenticate user by name and password`, async () => {
            const result = await users_1.userModel.authenticateUser(appSpec_1.user.u_name, "123");
            expect(result).toEqual({
                u_id: userId,
                u_name: appSpec_1.user.u_name,
            });
            console.log("validate user");
        });
        it(`should not authenticate user and return null`, async () => {
            const result = await users_1.userModel.authenticateUser(appSpec_1.user.u_name, "abc");
            expect(result).toBeNull();
        });
        it("should delete the selected user by ID", async () => {
            const result = await users_1.userModel.delete(userId);
            expect(result).toEqual({
                msg: "User deleted successfully",
                data: {
                    u_uid: userId,
                    u_name: appSpec_1.user.u_name,
                },
            });
            console.log("delete user");
        });
    });
});
