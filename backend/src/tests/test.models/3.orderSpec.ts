import { userModel } from "../../api/models/users";
import { orderModel } from "../../api/models/orders";
import { schema } from "../test.server.routes/serverSpec";
import pgDB from "../../database";

let userId: string | undefined;
describe("Order Model functions: \n", () => {
  it("should be a method to get all orders", () => {
    expect(orderModel.index).toBeDefined();
  });

  it("should be a method to get an order by id", () => {
    expect(orderModel.show).toBeDefined();
  });

  it("should be a method to create orders", () => {
    expect(orderModel.create).toBeDefined();
  });

  it("should be method an update orders", () => {
    expect(orderModel.update).toBeDefined();
  });

  it("should be a method to delete orders", () => {
    expect(orderModel.delete).toBeDefined();
  });
  describe("Testing SQL functions: \n ", () => {
    it("should create a user and extract its id", async () => {
      await userModel.create(schema);
      const user = await userModel.index();
      userId = user[0].u_id;
      console.log("user id extracted: ", userId);
    });

    it(`should create new order`, async () => {
      const order = await orderModel.create({
        order_status: schema.order_status,
        u_id: userId,
      });
      expect(order).toEqual({
        message: "Order created successfully",
        data: {
          order_id: schema.order_id,
          order_status: schema.order_status,
          user_id: userId,
        },
      });
    });

    it(`should get all orders`, async () => {
      const order = await orderModel.index();
      expect(order).toEqual([
        {
          order_id: schema.order_id,
          order_status: schema.order_status,
          user_id: userId,
        },
      ]);
    });

    it(`should get one order by id`, async () => {
      const order = await orderModel.show(schema.order_id as number);
      expect(order).toEqual({
        message: "Order generated successfully",
        data: {
          order_id: schema.order_id,
          order_status: schema.order_status,
          user_id: userId,
        },
      });
    });

    it(`should update the status of one order by id`, async () => {
      const order = await orderModel.update(schema.order_id as number, "active");
      expect(order).toEqual({
        message: "Order updated successfully",
        data: {
          order_id: schema.order_id,
          order_status: "active",
          user_id: userId,
        },
      });
    });

    it(`should delete one order by id`, async () => {
      const order = await orderModel.delete(schema.order_id as number);
      expect(order).toEqual({
        message: "Order deleted successfully",
        data: {
          order_id: schema.order_id,
          order_status: "active",
          user_id: userId,
        },
      });
    });

    afterAll(async () => {
      const conct = await pgDB.connect();
      await conct.query("DELETE FROM users");
      await conct.query("ALTER SEQUENCE orders_order_id_seq RESTART WITH 1");
      console.log("seq altered");
      conct.release();
    });
  });
});
