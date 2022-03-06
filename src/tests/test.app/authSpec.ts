import pgDB from "../../database";
import { userModel } from "../../models/users";
import { route, user } from "./appSpec";

let token = "";
let userId = "";

describe("Testing Authentication route: \n", () => {
  beforeAll(async () => {
    const result = await userModel.createUser(user);
    expect(result?.msg).toEqual("User created successfully");
    console.log(`user has been created \n`);
  });

  it("should extract user Id and password", async () => {
    setTimeout(async () => {
      const user = await userModel.getUsers();
      userId = user[0].u_uid as string;
      expect(user[0].u_uid).toEqual(userId);
      console.log(`user id extracted: ${userId}`);
    }, 1);
  });

  it(`should authenticate user and create token`, async () => {
    const response = await route
      .post(`/users/login`)
      .set("Content-type", "application/json")
      .send({ name: user.u_name, password: user.password });
    expect(response.status).toEqual(200);
    const { msg, data, token: userToken } = response.body;
    expect(msg).toEqual("User authenticated successfully");
    expect(data).toEqual({
      u_uid: userId,
      u_name: user.u_name,
    });
    token = userToken;
  });

  it("should authenticate and allow access to one user route", async () => {
    const result = await route
      .get("/users/id")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({ uid: userId });
    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      msg: "User generated successfully",
      data: {
        u_uid: userId,
        u_name: user.u_name,
      },
    });
  });

  it(`should not authenticate user and display error message`, async () => {
    const response = await route
      .post(`/users/login`)
      .set("Content-type", "application/json")
      .send({ name: "X", password: "abc" });
    expect(response.status).toEqual(401);
    expect(response.body).toEqual({
      msg: "Authentication failed !",
      data: "Invalid password or User Name",
    });
  });

  it("should delete all existing users", async () => {
    const conct = await pgDB.connect();
    await conct.query("DELETE FROM users;");
    conct.release();
  });
});
