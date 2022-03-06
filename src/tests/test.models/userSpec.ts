import { userModel } from "../../api/users/users";
import { user } from "../test.app.routes/appSpec";

let userId = "";
describe("Testing user Model functions: \n", () => {
  it("should have a get all users method", () => {
    expect(userModel.getUsers).toBeDefined();
  });

  it("should have a get user by Id method", () => {
    expect(userModel.getUserById).toBeDefined();
  });

  it("should have a create method", () => {
    expect(userModel.createUser).toBeDefined();
  });

  it("should have an update user method", () => {
    expect(userModel.updateUser).toBeDefined();
  });

  it("should have a delete user method", () => {
    expect(userModel.delUser).toBeDefined();
  });

  describe("Testing SQL functions: \n ", () => {
    it("should create new user", async () => {
      const result = await userModel.createUser(user);
      expect(result).toEqual({
        msg: "User created successfuly",
        ...result,
      });
      console.log("user has been created");
    });

    it("should get all data and extract user Id", async () => {
      const result = await userModel.getUsers();
      userId = result[0].u_id as string;
      expect(result).toEqual([
        {
          u_id: userId,
          u_name: user.u_name,
        },
      ]);
      console.log("all users");
    });

    it("should get the count of rows in users table to equal (1) user", async () => {
      const result = await userModel.getUsers();
      expect(result.length).toEqual(1);
    });

    it("should return the correct user by ID", async () => {
      const result = await userModel.getUserById(userId);
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
      const result = await userModel.updateUser(userId, "123");
      expect(result).toEqual({
        msg: "User updated successfully",
        data: {
          u_uid: userId,
          u_name: user.u_name,
        },
      });
      console.log("update user");
    });

    it(`should authenticate user by name and password`, async () => {
      const result = await userModel.authenticateUser(user.u_name as string, "123");
      expect(result).toEqual({
        u_id: userId,
        u_name: user.u_name,
      });
      console.log("validate user");
    });

    it(`should not authenticate user and return null`, async () => {
      const result = await userModel.authenticateUser(user.u_name as string, "abc");
      expect(result).toBeNull();
    });

    it("should delete the selected user by ID", async () => {
      const result = await userModel.delUser(userId);
      expect(result).toEqual({
        msg: "User deleted successfully",
        data: {
          u_uid: userId,
          u_name: user.u_name,
        },
      });
      console.log("delete user");
    });
  });
});
