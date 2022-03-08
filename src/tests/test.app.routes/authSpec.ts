import pgDB from "../../database";
import { userModel } from "../../api/users/users";
import { route, user } from "./appSpec";

let token = "";
let userId = "";

describe("Testing Authentication route: \n", () => {
  beforeAll(async () => {
    const result = await userModel.create(user);
    expect(result?.msg).toEqual("User created successfully");
    console.log(`user has been created \n`);
  });

  it("should extract user Id and password", async () => {
    setTimeout(async () => {
      const user = await userModel.index();
      userId = user[0].u_id as string;
      expect(user[0].u_id).toEqual(userId);
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
      u_id: userId,
      u_name: user.u_name,
    });
    token = userToken;
  });

  it("should authenticate and allow access to one user route", async () => {
    const result = await route.get(`/users/${userId}`).set("Authorization", `Bearer ${token}`);
    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      msg: "User generated successfully",
      data: {
        u_id: userId,
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
