import app from "../app";
import supertest from "supertest";
import { userStore } from "./../models/users";
import { mobileStore } from "../models/mobile";

const port = process.env.SERVER_PORT;
export const route = supertest(app);

describe("Testing our Application Functionality: \n", () => {
  it("test", () => {
    expect(1).toBe(1);
  });
  beforeAll(async () => {
    await userStore.createUser({
      u_name: "Ali",
      u_password: "123",
    });
    console.log("user has been created");
    await mobileStore.createMob({
      brand_name: "Galaxy",
      model_name: "S20",
      manufacturer: "SAMSUNG",
      price: 1100,
      made_in: "SK",
    });
    console.log("mobile has been created");
  });

  describe("Testing app end points: \n", () => {
    let mobId: string | undefined;
    it("should get all mobiles", async () => {
      const mob = await mobileStore.getAllMobs();
      if (mob) {
        mobId = mob[0].mob_uid;
      }
    });
    it(`server should be running on http://localhost:${port} with status code 200`, async () => {
      const response = await route.get("/");
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

    it(`should get one product from table mobiles /products/mobiles/${mobId}`, async () => {
      const response = await route.get(`/products/mobiles/${mobId}`);
      expect(response.body).toEqual([
        {
          mob_uid: mobId,
          brand_name: "Galaxy",
          model_name: "S20",
          manufacturer: "SAMSUNG",
          price: 1100,
          made_in: "SK",
        },
      ]);
    });

    it(`should update one product price to (900) where id = (${
      mobId as string
    }) /products/mobiles/update/${mobId}/900`, async () => {
      const response = await route.get(`/products/mobiles/update/${mobId}/900`);
      expect(response.body).toEqual({});
    });
  });
});
