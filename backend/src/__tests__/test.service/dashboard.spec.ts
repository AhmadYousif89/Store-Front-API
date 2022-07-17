import { schema } from "./../testingSchema";
import { OrderDetails } from "../../api/models/order_details";
import { Order } from "../../api/models/orders";
import { Product } from "../../api/models/products";
import { User } from "../../api/models/users";
import { dashBoard } from "../../api/__services__/dashboard";

let userId = "";
let pId = "";
let orderId = "";
let time = "";
let orderTime = "";
const updateTime = new Date().toISOString();

describe("Testing dashboard Model functions: \n", () => {
  it("should be a method to get all user's purachases that he/she made, list is sorted by most recent date", () => {
    expect(dashBoard.getUserPurchases).toBeDefined();
  });

  describe("Testing dashboard SQL functions: \n ", () => {
    it("should create user and extract it's id", async () => {
      await User.create(schema);
      const user = await User.index();
      userId = user[0]._id as string;
    });

    it("should create a product and extract it's id", async () => {
      await Product.create(schema);
      const product = await Product.index();
      pId = product[0]._id as string;
    });

    it(`should create new order`, async () => {
      await Order.createOrder({ user_id: userId });
      const order = await Order.index();
      orderTime = order[0].created_at as string;
      orderId = order[0]._id as string;
    });

    it(`should add product to order`, async () => {
      const op = await OrderDetails.createOrderDetails({});
      const created_at = op?.created_at;
      const opId = op?._id;
      time = created_at as string;
      expect(op).toEqual({});
    });

    it(`should update order status`, async () => {
      const order = await Order.updateUserOrders({
        _id: orderId,
        order_status: "complete",
      });
      expect(order).toEqual({
        _id: orderId,
        order_status: "complete",
        user_id: userId,
        created_at: orderTime,
        updated_at: updateTime,
      });
    });

    it("should get all products related to a user", async () => {
      const result = await OrderDetails.getUserOrderDetails({});
      expect(result).not.toBeNull();
    });

    it("should get all products related to a user for specific order id", async () => {
      const result = await OrderDetails.getUserOrderDetailsByid(userId, orderId);
      expect(result).not.toBeNull();
    });

    it("should get all purchases related to a user", async () => {
      const result = await dashBoard.getUserPurchases(userId as string);
      expect(result).not.toBeNull();
    });
  });
});
