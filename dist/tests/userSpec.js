"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("./../models/users");
const appSpec_1 = require("./appSpec");
describe("Testing user Model functions: \n", () => {
    it("should have a get all users method", () => {
        expect(users_1.userStore.getAllUsers).toBeDefined();
    });
    it("should have a get user by Id method", () => {
        expect(users_1.userStore.getUserById).toBeDefined();
    });
    it("should have a create method", () => {
        expect(users_1.userStore.createUser).toBeDefined();
    });
    it("should have an update user method", () => {
        expect(users_1.userStore.updateUser).toBeDefined();
    });
    it("should have a delete user method", () => {
        expect(users_1.userStore.delUser).toBeDefined();
    });
    describe("Testing SQL functions: \n ", () => {
        it("should get all data and extract user Id and Password", async () => {
            const result = await users_1.userStore.getAllUsers();
            expect(result).toEqual([
                {
                    u_uid: appSpec_1.userId,
                    u_name: "Ali",
                },
            ]);
            console.log("all users");
        });
        it("should return the correct user by ID", async () => {
            const result = await users_1.userStore.getUserById(appSpec_1.userId);
            expect(result).toEqual({
                u_uid: appSpec_1.userId,
                u_name: "Ali",
            });
            console.log("one user");
        });
        it(`should update the password to = 123 for specific user by ID`, async () => {
            const user = await users_1.userStore.updateUser(appSpec_1.userId, "123");
            expect(user).toEqual({
                msg: "User updated successfuly",
                data: {
                    u_uid: appSpec_1.userId,
                    u_name: "Ali",
                },
            });
            console.log("update user");
        });
        it("should delete the selected user by ID", async () => {
            const result = await users_1.userStore.delUser(appSpec_1.userId);
            expect(result).toEqual({
                u_uid: appSpec_1.userId,
                u_name: "Ali",
            });
            console.log("delete user");
        });
    });
});
