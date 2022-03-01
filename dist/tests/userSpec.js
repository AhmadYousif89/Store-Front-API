"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("./../models/users");
let userId;
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
        beforeAll(async () => {
            const result = await users_1.userStore.createUser({
                u_name: "Ali",
                u_password: "123",
            });
            expect(result).toEqual({
                msg: "User created successfuly",
                ...result,
            });
            console.log("user has been created");
        });
        it("should get all data and extract user Id", async () => {
            const result = await users_1.userStore.getAllUsers();
            userId = result[0].u_uid;
            expect(result).toEqual([
                {
                    u_uid: userId,
                    u_name: "Ali",
                },
            ]);
            console.log("all users");
        });
        it("should return the correct user by ID", async () => {
            const result = await users_1.userStore.getUserById(userId);
            expect(result).toEqual({
                msg: "User generated successfully",
                data: {
                    u_uid: userId,
                    u_name: "Ali",
                },
            });
            console.log("one user");
        });
        it(`should update the password to = 123 for specific user by ID`, async () => {
            const result = await users_1.userStore.updateUser(userId, "123");
            expect(result).toEqual({
                msg: "User updated successfuly",
                data: {
                    u_uid: userId,
                    u_name: "Ali",
                },
            });
            console.log("update user");
        });
        it("should delete the selected user by ID", async () => {
            const result = await users_1.userStore.delUser(userId);
            expect(result).toEqual({
                msg: "User deleted successfuly",
                data: {
                    u_uid: userId,
                    u_name: "Ali",
                },
            });
            console.log("delete user");
        });
    });
});
