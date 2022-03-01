import app from "../app";
import JWT from "jsonwebtoken";
import supertest from "supertest";
import { userStore } from "./../models/users";
import { mobileStore } from "../models/mobile";

const { SERVER_PORT, SECRET_TOKEN } = process.env;
export const route = supertest(app);
let mobId: string | undefined;
let userId: string | undefined;

describe("Testing Application Functionality: \n", () => {
  describe("Testing app end points: \n", () => {
    it("should extract user Id and password", async () => {
      const user = await userStore.getAllUsers();
      userId = user[0].u_uid;
      expect(user[0].u_uid).toEqual(userId);
      setTimeout(() => {
        console.log(`user id extracted: ${userId}`);
      }, 1);
    });

    it("should extract mobile Id", async () => {
      const mob = await mobileStore.getAllMobs();
      mobId = mob[0].mob_uid;
      expect(mob[0].mob_uid).toEqual(mobId);
      setTimeout(() => {
        console.log(`mob id extracted: ${mobId} \n`);
      }, 1);
    });

    it(`server should be running on http://localhost:${SERVER_PORT} with status code 200`, async () => {
      const response = await route.get("/");
      expect(response.statusCode).toBe(200);
    });

    it(`should get end point /users with status code 200`, async () => {
      const response = await route.get("/users");
      expect(response.statusCode).toBe(200);
    });

    it(`should get end point /products with status code 200`, async () => {
      const response = await route.get("/products");
      expect(response.statusCode).toBe(200);
    });

    it(`should get end point /products/mobiles with status code 200`, async () => {
      const response = await route.get("/products/mobiles");
      expect(response.statusCode).toBe(200);
    });

    beforeAll(async () => {
      const response = await route.post("/products/mobiles/Galaxy/S20/1100/SAMSUNG/SK");
      expect(response.statusCode).toBe(201);
      console.log(`mobile has been created \n`);
    });

    it(`should get all data from table mobiles`, async () => {
      const response = await route.get(`/products/mobiles`);
      expect(response.body).toEqual({
        msg: "data generated successfuly",
        data: [
          {
            mob_uid: mobId,
            brand_name: "Galaxy",
            model_name: "S20",
            manufacturer: "SAMSUNG",
            price: 1100,
            made_in: "SK",
          },
        ],
      });
    });

    it(`should get one item from table mobiles by ID`, async () => {
      const response = await route.get(`/products/mobiles/${mobId}`);
      expect(response.body).toEqual({
        msg: "mobile generated successfuly",
        data: {
          mob_uid: mobId,
          brand_name: "Galaxy",
          model_name: "S20",
          manufacturer: "SAMSUNG",
          price: 1100,
          made_in: "SK",
        },
      });
    });

    it(`should update one item price to (900) by ID`, async () => {
      const response = await route.put(`/products/mobiles/${mobId}/900`);
      expect(response.body).toEqual({
        msg: "Mobile updated successfuly",
        data: {
          mob_uid: mobId,
          brand_name: "Galaxy",
          model_name: "S20",
          manufacturer: "SAMSUNG",
          price: 900,
          made_in: "SK",
        },
      });
    });

    it(`should delete one item from table mobiles by ID`, async () => {
      const response = await route.delete(`/products/mobiles/${mobId}`);
      expect(response.body).toEqual({
        msg: "Mobile deleted successfuly",
        data: {
          mob_uid: mobId,
          brand_name: "Galaxy",
          model_name: "S20",
          manufacturer: "SAMSUNG",
          price: 900,
          made_in: "SK",
        },
      });
    });

    beforeAll(async () => {
      const response = await route.post("/users/Ali/123");
      expect(response.statusCode).toBe(201);
      console.log(`user has been created \n`);
    });

    it("should get all users from table users", async () => {
      const result = await route.get(`/users`);
      expect(result.body).toEqual({
        msg: "Data generated successfully",
        data: [
          {
            u_uid: userId,
            u_name: "Ali",
          },
        ],
      });
    });

    it("should get one user from table users by ID", async () => {
      const result = await route.get(`/users/${userId}`);
      expect(result.body).toEqual({
        msg: "User generated successfully",
        data: {
          u_uid: userId,
          u_name: "Ali",
        },
      });
    });

    it("should update one user and SET password to = (abc)", async () => {
      const user = await route.put(`/users/${userId}/abc`);
      expect(user.body).toEqual({
        msg: "User updated successfuly",
        data: { u_uid: userId, u_name: "Ali" },
      });
    });

    it(`should authenticate user and retrive password`, async () => {
      const user = await userStore.validateUser("Ali", "abc");
      const token = JWT.sign({ user }, SECRET_TOKEN as string);
      const response = await route.post(`/users/auth/Ali/abc`);
      expect(response.body).toEqual({
        msg: "User authenticated successfully",
        token,
      });
    });

    it(`should not authenticate user and display error message`, async () => {
      const response = await route.post(`/users/auth/Ali/123`);
      expect(response.body).toEqual({
        msg: "Authentication failed !",
        data: "Invalid password or User Name",
      });
    });

    it("should delete one user from table users by ID", async () => {
      const result = await route.delete(`/users/${userId}`);
      expect(result.body).toEqual({
        msg: "User deleted successfuly",
        data: {
          u_uid: userId,
          u_name: "Ali",
        },
      });
    });
  });
});
