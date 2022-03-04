import app from "../../app";
import supertest from "supertest";
import { userModel } from "../../models/users";
import { mobileModel } from "../../models/mobile";
import { Users } from "../../utils/control";
import { Mobile } from "../../utils/control";

const { SERVER_PORT } = process.env;
export const route = supertest(app);
let mobId = "";
let userId = "";
export const user = {
  u_name: "Ali",
  password: "123",
} as Users;
export const mobile = {
  brand: "Galaxy",
  model: "S20",
  maker: "Samsung",
  price: 1000,
} as Mobile;

describe("Testing Application Functionality: \n", () => {
  it(`server should be running on http://localhost:${SERVER_PORT} with status code 200`, async () => {
    const response = await route.get("/");
    expect(response.statusCode).toBe(200);
  });

  it(`should get end point /users with status code 404 and error message`, async () => {
    const response = await route.get("/users");
    expect(response.statusCode).toBe(404);
    expect(response.body.msg).toEqual("No Users Were Found !");
  });

  it(`should get end point /products with status code 404 and error message`, async () => {
    const response = await route.get("/products");
    expect(response.statusCode).toBe(404);
    expect(response.body.msg).toEqual("No Products Were Found !");
  });

  it(`should get end point /products/mobiles with status code 404 and error message`, async () => {
    const response = await route.get("/products/mobiles");
    expect(response.statusCode).toBe(404);
    expect(response.body.msg).toEqual("No Mobiles Were Found !");
  });

  it(`should get end point /user/account/orders with status code 404 and error message`, async () => {
    const response = await route.get("/user/account/orders");
    expect(response.statusCode).toBe(404);
    expect(response.body.msg).toEqual("No Orders Were Found !");
  });

  describe("Testing app end points: \n", () => {
    beforeAll(async () => {
      const result = await userModel.createUser(user);
      expect(result?.msg).toEqual("User created successfully");
      console.log(`user has been created \n`);
    });

    beforeAll(async () => {
      const result = await mobileModel.createMob(mobile);
      expect(result?.msg).toEqual("Mobile created successfully");
      console.log(`mobile has been created \n`);
    });

    it("should extract user Id and password", async () => {
      const user = await userModel.getAllUsers();
      userId = user[0].u_uid as string;
      expect(user[0].u_uid).toEqual(userId);
      setTimeout(() => {
        console.log(`user id extracted: ${userId}`);
      }, 1);
    });

    it("should extract mobile Id", async () => {
      const mob = await mobileModel.getAllMobs();
      mobId = mob[0].mob_uid as string;
      expect(mob[0].mob_uid).toEqual(mobId);
      setTimeout(() => {
        console.log(`mob id extracted: ${mobId} \n`);
      }, 1);
    });

    it(`should get end point /users with status code 200`, async () => {
      const response = await route.get("/users");
      expect(response.statusCode).toBe(200);
    });

    // it(`should get end point /products with status code 200`, async () => {
    //   const response = await route.get("/products");
    //   expect(response.statusCode).toBe(200);
    // });

    it(`should get end point /products/mobiles with status code 200`, async () => {
      const response = await route.get("/products/mobiles");
      expect(response.statusCode).toBe(200);
    });

    it(`should get all data from table mobiles`, async () => {
      const response = await route.get(`/products/mobiles`);
      expect(response.body).toEqual({
        msg: "Data generated successfully",
        data: [
          {
            mob_uid: mobId,
            brand: mobile.brand,
            model: mobile.model,
            maker: mobile.maker,
            price: mobile.price,
          },
        ],
      });
    });

    it(`should get one item from table mobiles by ID`, async () => {
      const response = await route
        .get(`/products/mobiles/id`)
        .set("Content-type", "application/json")
        .send({ id: mobId });
      expect(response.body).toEqual({
        msg: "Mobile generated successfully",
        data: {
          mob_uid: mobId,
          brand: mobile.brand,
          model: mobile.model,
          maker: mobile.maker,
          price: mobile.price,
        },
      });
    });

    it(`should update one item price to (900) by ID`, async () => {
      const response = await route
        .put(`/products/mobiles/`)
        .set("Content-type", "application/json")
        .send({ id: mobId, price: 900 });
      expect(response.body).toEqual({
        msg: "Mobile updated successfully",
        data: {
          mob_uid: mobId,
          brand: mobile.brand,
          model: mobile.model,
          maker: mobile.maker,
          price: 900,
        },
      });
    });

    it(`should delete one item from table mobiles by ID`, async () => {
      const response = await route
        .delete(`/products/mobiles/id`)
        .set("Content-type", "application/json")
        .send({ id: mobId });
      expect(response.body).toEqual({
        msg: "Mobile deleted successfully",
        data: {
          mob_uid: mobId,
          brand: mobile.brand,
          model: mobile.model,
          maker: mobile.maker,
          price: 900,
        },
      });
    });

    it("should get all users from table users", async () => {
      const result = await route.get(`/users`);
      expect(result.body).toEqual({
        msg: "Data generated successfully",
        data: [
          {
            u_uid: userId,
            u_name: user.u_name,
          },
        ],
      });
    });

    it("should not get user until authorized", async () => {
      const result = await route
        .get(`/users/id`)
        .set("Content-type", "application/json")
        .send({ uid: userId });
      expect(result.statusCode).toBe(401);
      expect(result.body).toEqual({
        message: "Access denied, Faild to authenticate !",
      });
    });

    it("should update one user and SET password to = (abc)", async () => {
      const result = await route
        .put(`/users`)
        .set("Content-type", "application/json")
        .send({ uid: userId, password: "abc" });
      expect(result.status).toEqual(200);
      expect(result.body).toEqual({
        msg: "User updated successfully",
        data: { u_uid: userId, u_name: user.u_name },
      });
    });

    it("should delete one user from table users by ID", async () => {
      const result = await route
        .delete(`/users/id`)
        .set("Content-type", "application/json")
        .send({ uid: userId });
      expect(result.status).toEqual(200);
      expect(result.body).toEqual({
        msg: "User deleted successfully",
        data: {
          u_uid: userId,
          u_name: user.u_name,
        },
      });
    });

    it("should not delete user and display error message", async () => {
      const result = await route
        .delete(`/users/id`)
        .set("Content-type", "application/json")
        .send({ uid: userId });
      expect(result.status).toEqual(404);
      expect(result.body).toEqual({
        msg: "Delete failed !",
        data: `User with id (${userId}) doesn't exist`,
      });
    });
  });
});
