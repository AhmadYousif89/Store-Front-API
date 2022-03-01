"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("./../models/users");
const appSpec_1 = require("./appSpec");
let userId = "";
let userPw = "";
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
        it("should create new user", async () => {
            const result = await users_1.userStore.createUser(appSpec_1.user);
            expect(result).toEqual({
                msg: "User created successfuly",
                ...result,
            });
            console.log("user has been created");
        });
        it("should get all data and extract user Id", async () => {
            const result = await users_1.userStore.getAllUsers();
            userId = result[0].u_uid;
            userPw = result[0].u_password;
            expect(result).toEqual([
                {
                    u_uid: userId,
                    u_name: appSpec_1.user.u_name,
                    u_password: userPw,
                },
            ]);
            console.log("all users");
        });
        it("should get the count of rows in users table to equal (1) user", async () => {
            const result = await users_1.userStore.getAllUsers();
            expect(result.length).toEqual(1);
        });
        it("should return the correct user by ID", async () => {
            const result = await users_1.userStore.getUserById(userId);
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
            const result = await users_1.userStore.updateUser(userId, "123");
            expect(result).toEqual({
                msg: "User updated successfuly",
                data: {
                    u_uid: userId,
                    u_name: appSpec_1.user.u_name,
                },
            });
            console.log("update user");
        });
        it(`should authenticate user by name and password`, async () => {
            const result = await users_1.userStore.validateUser(appSpec_1.user.u_name, "123");
            const upw = result?.u_password;
            expect(result).toEqual({
                u_uid: userId,
                u_name: appSpec_1.user.u_name,
                u_password: upw,
            });
            console.log("validate user");
        });
        it(`should not authenticate user and return null`, async () => {
            const result = await users_1.userStore.validateUser(appSpec_1.user.u_name, "abc");
            expect(result).toBeNull();
        });
        it("should delete the selected user by ID", async () => {
            const result = await users_1.userStore.delUser(userId);
            expect(result).toEqual({
                msg: "User deleted successfuly",
                data: {
                    u_uid: userId,
                    u_name: appSpec_1.user.u_name,
                },
            });
            console.log("delete user");
        });
    });
});
