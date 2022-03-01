import { userStore } from "./../models/users";
import { user } from "./appSpec";

let userId = "";
let userPw = "";

describe("Testing user Model functions: \n", () => {
  it("should have a get all users method", () => {
    expect(userStore.getAllUsers).toBeDefined();
  });

  it("should have a get user by Id method", () => {
    expect(userStore.getUserById).toBeDefined();
  });

  it("should have a create method", () => {
    expect(userStore.createUser).toBeDefined();
  });

  it("should have an update user method", () => {
    expect(userStore.updateUser).toBeDefined();
  });

  it("should have a delete user method", () => {
    expect(userStore.delUser).toBeDefined();
  });

  describe("Testing SQL functions: \n ", () => {
    it("should create new user", async () => {
      const result = await userStore.createUser(user);
      expect(result).toEqual({
        msg: "User created successfuly",
        ...result,
      });
      console.log("user has been created");
    });

    it("should get all data and extract user Id", async () => {
      const result = await userStore.getAllUsers();
      userId = result[0].u_uid as string;
      userPw = result[0].u_password as string;
      expect(result).toEqual([
        {
          u_uid: userId,
          u_name: user.u_name,
          u_password: userPw,
        },
      ]);
      console.log("all users");
    });

    it("should get the count of rows in users table to equal (1) user", async () => {
      const result = await userStore.getAllUsers();
      expect(result.length).toEqual(1);
    });

    it("should return the correct user by ID", async () => {
      const result = await userStore.getUserById(userId);
      expect(result).toEqual({
        msg: "User generated successfully",
        data: {
          u_uid: userId,
          u_name: user.u_name,
        },
      });
      console.log("one user");
    });

    it(`should update the password to = 123 for specific user by ID`, async () => {
      const result = await userStore.updateUser(userId, "123");
      expect(result).toEqual({
        msg: "User updated successfuly",
        data: {
          u_uid: userId,
          u_name: user.u_name,
        },
      });
      console.log("update user");
    });

    it(`should authenticate user by name and password`, async () => {
      const result = await userStore.validateUser(user.u_name as string, "123");
      const upw = result?.u_password;
      expect(result).toEqual({
        u_uid: userId,
        u_name: user.u_name,
        u_password: upw,
      });
      console.log("validate user");
    });

    it(`should not authenticate user and return null`, async () => {
      const result = await userStore.validateUser(user.u_name as string, "abc");
      expect(result).toBeNull();
    });

    it("should delete the selected user by ID", async () => {
      const result = await userStore.delUser(userId);
      expect(result).toEqual({
        msg: "User deleted successfuly",
        data: {
          u_uid: userId,
          u_name: user.u_name,
        },
      });
      console.log("delete user");
    });
  });
});
