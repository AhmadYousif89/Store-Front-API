import { userStore } from "./../models/users";

let userId: string;
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
      const result = await userStore.createUser({
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
      const result = await userStore.getAllUsers();
      userId = result[0].u_uid as string;
      expect(result).toEqual([
        {
          u_uid: userId,
          u_name: "Ali",
        },
      ]);
      console.log("all users");
    });

    it("should return the correct user by ID", async () => {
      const result = await userStore.getUserById(userId);
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
      const result = await userStore.updateUser(userId, "123");
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
      const result = await userStore.delUser(userId);
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
