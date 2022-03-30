import { userModel } from "../../api/models/users";
import { schema } from "../test.server.routes/serverSpec";

let userId = "";
describe("Testing user Model functions: \n", () => {
  it("should be a method to get all users", () => {
    expect(userModel.index).toBeDefined();
  });

  it("should be a method to get user by id", () => {
    expect(userModel.show).toBeDefined();
  });

  it("should be a method to create a users", () => {
    expect(userModel.create).toBeDefined();
  });

  it("should be method an update a users", () => {
    expect(userModel.update).toBeDefined();
  });

  it("should be a method to delete a users", () => {
    expect(userModel.delete).toBeDefined();
  });

  it("should be a method to authenticate users ", () => {
    expect(userModel.authenticateUser).toBeDefined();
  });

  describe("Testing SQL functions: \n ", () => {
    it("should create new user", async () => {
      const result = await userModel.create(schema);
      expect(result?.message).toEqual("User created successfully");
      console.log("user has been created");
    });

    it("should get all data and extract user Id", async () => {
      const result = await userModel.index();
      userId = result[0].u_id as string;
      expect(result).toEqual([
        {
          u_id: userId,
          u_name: schema.u_name,
          u_email: schema.u_email,
        },
      ]);
      console.log("all users");
    });

    it("should return the correct user by id", async () => {
      const result = await userModel.show(userId);
      expect(result?.data).toEqual({
        u_id: userId,
        u_email: schema.u_email,
        u_name: schema.u_name,
      });
      console.log("one user");
    });

    it(`should update the password to = 123 for specific user by id`, async () => {
      const result = await userModel.update(userId, "123");
      expect(result).toEqual({
        message: "User updated successfully",
        data: {
          u_id: userId,
          u_email: schema.u_email,
          u_name: schema.u_name,
        },
      });
      console.log("update user");
    });

    it(`should authenticate user by email and password`, async () => {
      const result = await userModel.authenticateUser(schema.u_email as string, "123");
      expect(result).toEqual({
        u_id: userId,
        u_name: schema.u_name,
        u_email: schema.u_email,
      });
      console.log("validate user");
    });

    it("should delete the selected user by id", async () => {
      const result = await userModel.delete(userId);
      expect(result).toEqual({
        message: "User deleted successfully",
        data: {
          u_id: userId,
          u_email: schema.u_email,
          u_name: schema.u_name,
        },
      });
      console.log("delete user");
    });
  });
});
