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
      expect(result?.message).toEqual("user created successfully");
      console.log("user has been created");
    });

    it("should get all data and extract user Id", async () => {
      const result = await userModel.index();
      userId = result[0].user_id as string;
      expect(result).toEqual([
        {
          user_id: userId,
          name: schema.name,
          email: schema.email,
        },
      ]);
      console.log("all users");
    });

    it("should return the correct user by id", async () => {
      const result = await userModel.show({ user_id: userId });
      expect(result).toEqual({
        message: `User generated successfully`,
        data: {
          user_id: userId,
          email: schema.email,
          name: schema.name,
        },
      });
      console.log("one user");
    });

    it(`should update the password to = 123 for specific user by id`, async () => {
      const result = await userModel.update({ user_id: userId, password: "123" });
      expect(result).toEqual({
        message: "user updated successfully",
        data: {
          user_id: userId,
          email: schema.email,
          name: schema.name,
        },
      });
      console.log("update user");
    });

    it(`should authenticate user by email and password`, async () => {
      const result = await userModel.authenticateUser({
        email: schema.email,
        password: "123",
      });
      expect(result).toEqual({
        user_id: userId,
        name: schema.name,
        email: schema.email,
      });
      console.log("validate user");
    });

    it("should delete the selected user by id", async () => {
      const result = await userModel.delete({ user_id: userId });
      expect(result).toEqual({
        message: "User deleted successfully",
        data: {
          user_id: userId,
          email: schema.email,
          name: schema.name,
        },
      });
      console.log("delete user");
    });
  });
});
