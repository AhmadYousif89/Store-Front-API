"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("./../models/users");
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
        let userId, userPw;
        it("should return a list of all users", async () => {
            const result = await users_1.userStore.getAllUsers();
            if (result) {
                userId = result[0].u_uid;
                userPw = result[0].u_password;
                expect(result).toEqual([
                    {
                        u_uid: userId,
                        u_name: "Ali",
                        u_password: userPw,
                    },
                ]);
            }
            console.log("all users");
        });
        it("should return the correct user by ID", async () => {
            const result = await users_1.userStore.getUserById(userId);
            expect(result).toEqual([
                {
                    u_uid: userId,
                    u_name: "Ali",
                    u_password: userPw,
                },
            ]);
            console.log("one user");
        });
        it(`should update the password to = abc for specific user by ID`, async () => {
            await users_1.userStore.updateUser(userId, "abc");
            const user = await users_1.userStore.getUserById(userId);
            if (user) {
                const userPw = user[0].u_password;
                expect(user).toEqual([
                    {
                        u_uid: userId,
                        u_name: "Ali",
                        u_password: userPw,
                    },
                ]);
            }
            console.log("update user");
        });
        it("should delete the selected user by ID", async () => {
            users_1.userStore.delUser(userId);
            const result = await users_1.userStore.getAllUsers();
            expect(result).toEqual([]);
            console.log("delete user");
        });
    });
});
