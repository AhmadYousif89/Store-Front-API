import { userModel } from "../../api/users/users";
import { orderModel } from "../../api/orders/orders";
import { schema } from "../test.app.routes/appSpec";
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
        u_id: userId,
        order_status: schema.order_status,
      });
      expect(order).toEqual({
        msg: "Order created successfully",
        data: {
          o_id: schema.o_id,
          order_status: schema.order_status,
          user_id: userId,
        },
      });
    });

    it(`should get all orders`, async () => {
      const order = await orderModel.index();
      expect(order).toEqual([
        {
          o_id: schema.o_id,
          order_status: schema.order_status,
          user_id: userId,
        },
      ]);
    });

    it(`should get one order by id`, async () => {
      const order = await orderModel.show(schema.o_id as number);
      expect(order).toEqual({
        msg: "Order generated successfully",
        data: {
          o_id: schema.o_id,
          order_status: schema.order_status,
          user_id: userId,
        },
      });
    });

    it(`should update the status of one order by id`, async () => {
      const order = await orderModel.update(schema.o_id as number, "active");
      expect(order).toEqual({
        msg: "Order updated successfully",
        data: {
          o_id: schema.o_id,
          order_status: "active",
          user_id: userId,
        },
      });
    });

    it(`should delete one order by id`, async () => {
      const order = await orderModel.delete(schema.o_id as number);
      expect(order).toEqual({
        msg: "Order deleted successfully",
        data: {
          o_id: schema.o_id,
          order_status: "active",
          user_id: userId,
        },
      });
    });

    afterAll(async () => {
      const conct = await pgDB.connect();
      await conct.query("DELETE FROM users");
      await conct.query("ALTER SEQUENCE orders_o_id_seq RESTART WITH 1");
      await conct.query("ALTER SEQUENCE ordered_products_op_id_seq RESTART WITH 1");
      console.log("seq altered");
      conct.release();
    });
  });
});
