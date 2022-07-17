import { User } from "../../api/models/users";
import { Order } from "../../api/models/orders";
import { schema } from "./../testingSchema";
import pgDB from "../../db/database";

let userId = "";
let orderId = "";
let time = "";
const date = new Date().toISOString();

describe("Order Model functions: \n", () => {
  it("should be a method to get all orders", () => {
    expect(Order.index).toBeDefined();
  });

  it("should be a method to get an order by id", () => {
    expect(Order.show).toBeDefined();
  });

  it("should be a method to create orders", () => {
    expect(Order.createOrder).toBeDefined();
  });

  it("should be method an update orders", () => {
    expect(Order.updateUserOrders).toBeDefined();
  });

  it("should be a method to delete orders", () => {
    expect(Order.deleteUserOrders).toBeDefined();
  });
  describe("Testing SQL functions: \n ", () => {
    it("should create a user and extract its id", async () => {
      await User.create(schema);
      const user = await User.index();
      userId = user[0]._id as string;
      console.log("order has been created");
    });

    it(`should create new order`, async () => {
      await Order.createOrder({ user_id: userId });
    });

    it(`should get all orders`, async () => {
      const order = await Order.index();
      time = order[0].created_at as string;
      orderId = order[0]._id as string;
      expect(order).toEqual([
        {
          _id: orderId,
          order_status: schema.order_status,
          user_id: userId,
          created_at: time,
          updated_at: null,
        },
      ]);
      console.log("all order");
    });

    it(`should get one order by id`, async () => {
      const order = await Order.show({ _id: orderId });
      expect(order).toEqual({
        _id: orderId,
        order_status: schema.order_status,
        user_id: userId,
        created_at: time,
        updated_at: null,
      });
      console.log("one order");
    });

    it(`should update the status of one order by id`, async () => {
      const order = await Order.updateUserOrders({
        _id: orderId,
        order_status: "active",
        updated_at: date,
      });
      expect(order).toEqual({
        _id: orderId,
        order_status: "active",
        user_id: userId,
        created_at: time,
        updated_at: date,
      });
      console.log("update order");
    });

    it(`should delete one order by id`, async () => {
      const order = await Order.deleteUserOrders({ _id: orderId });
      expect(order).toEqual({
        _id: orderId,
        order_status: "active",
        user_id: userId,
        created_at: time,
        updated_at: date,
      });
      console.log("delete order");
    });

    afterAll(async () => {
      const conct = await pgDB.connect();
      await conct.query("DELETE FROM users");
      await conct.query("ALTER SEQUENCE orders_order_id_seq RESTART WITH 1");
      console.log("Sequence altered successfully");
      conct.release();
    });
  });
});
