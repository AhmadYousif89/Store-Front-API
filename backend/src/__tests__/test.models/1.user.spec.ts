import { schema } from "./../testingSchema";
import { User } from "../../api/models/users";

let userId = "";
let userPw = "";
describe("Testing user Model functions: \n", () => {
  it("should be a method to get all users", () => {
    expect(User.index).toBeDefined();
  });

  it("should be a method to get user by id", () => {
    expect(User.show).toBeDefined();
  });

  it("should be a method to create a users", () => {
    expect(User.create).toBeDefined();
  });

  it("should be a method to update user password", () => {
    expect(User.updatePassword).toBeDefined();
  });

  it("should be a method to update admin state", () => {
    expect(User.updateAdminState).toBeDefined();
  });

  it("should be a method to delete a users", () => {
    expect(User.delete).toBeDefined();
  });

  it("should be a method to authenticate users ", () => {
    expect(User.authenticateUser).toBeDefined();
  });

  describe("Testing SQL functions: \n ", () => {
    it("should create new user", async () => {
      const result = await User.create(schema);
      userId = result?._id as string;
      userPw = result?.password as string;
      expect(result?._id).toEqual(userId);
      expect(result?.name).toEqual(schema.name);
      expect(result?.email).toEqual(schema.email);
      expect(result?.password).toEqual(userPw);
      console.log("user has been created");
    });

    it("should get all data and extract user Id", async () => {
      const result = await User.index();
      expect(result).toEqual([
        {
          _id: userId,
          name: schema.name,
          email: schema.email,
        },
      ]);
      console.log("all users");
    });

    it("should return the correct user by id", async () => {
      const result = await User.show({ _id: userId });
      expect(result).toEqual({
        _id: userId,
        email: schema.email,
        name: schema.name,
      });
      console.log("one user");
    });

    it(`should update the password to = 123 for specific user by id`, async () => {
      const result = await User.updatePassword({ _id: userId, password: "123" });
      expect(result).toEqual({
        _id: userId,
        email: schema.email,
        name: schema.name,
      });
      console.log("update user");
    });

    it(`should authenticate user by email and password`, async () => {
      const result = await User.authenticateUser({
        email: schema.email,
        password: "123",
      });
      expect(result).toEqual({
        _id: userId,
        name: schema.name,
        email: schema.email,
      });
      console.log("validate user");
    });

    it("should delete the selected user by id", async () => {
      const result = await User.delete({ _id: userId });
      expect(result).toEqual({
        _id: userId,
        email: schema.email,
        name: schema.name,
      });
      console.log("delete user");
    });
  });
});
