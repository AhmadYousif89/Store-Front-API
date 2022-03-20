"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../../api/users/users");
const appSpec_1 = require("../test.app.routes/appSpec");
let userId = "";
describe("Testing user Model functions: \n", () => {
    it("should be a method to get all users", () => {
        expect(users_1.userModel.index).toBeDefined();
    });
    it("should be a method to get user by id", () => {
        expect(users_1.userModel.show).toBeDefined();
    });
    it("should be a method to create a users", () => {
        expect(users_1.userModel.create).toBeDefined();
    });
    it("should be method an update a users", () => {
        expect(users_1.userModel.update).toBeDefined();
    });
    it("should be a method to delete a users", () => {
        expect(users_1.userModel.delete).toBeDefined();
    });
    it("should be a method to authenticate users ", () => {
        expect(users_1.userModel.authenticateUser).toBeDefined();
    });
    describe("Testing SQL functions: \n ", () => {
        it("should create new user", async () => {
            const result = await users_1.userModel.create(appSpec_1.schema);
            expect(result?.msg).toEqual("User created successfully");
            console.log("user has been created");
        });
        it("should get all data and extract user Id", async () => {
            const result = await users_1.userModel.index();
            userId = result[0].u_id;
            expect(result).toEqual([
                {
                    u_id: userId,
                    u_name: appSpec_1.schema.u_name,
                },
            ]);
            console.log("all users");
        });
        it("should return the correct user by id", async () => {
            const result = await users_1.userModel.show(userId);
            expect(result?.data).toEqual({
                u_id: userId,
                u_name: appSpec_1.schema.u_name,
            });
            console.log("one user");
        });
        it(`should update the password to = 123 for specific user by id`, async () => {
            const result = await users_1.userModel.update(userId, "123");
            expect(result).toEqual({
                msg: "User updated successfully",
                data: {
                    u_id: userId,
                    u_name: appSpec_1.schema.u_name,
                },
            });
            console.log("update user");
        });
        it(`should authenticate user by name and password`, async () => {
            const result = await users_1.userModel.authenticateUser(appSpec_1.schema.u_name, "123");
            expect(result).toEqual({
                u_id: userId,
                u_name: appSpec_1.schema.u_name,
            });
            console.log("validate user");
        });
        it("should delete the selected user by id", async () => {
            const result = await users_1.userModel.delete(userId);
            expect(result).toEqual({
                msg: "User deleted successfully",
                data: {
                    u_id: userId,
                    u_name: appSpec_1.schema.u_name,
                },
            });
            console.log("delete user");
        });
    });
});
