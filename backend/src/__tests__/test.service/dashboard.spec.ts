import { schema } from "./../testingSchema";
import { OPT } from "../../api/models/order_details";
import { orderModel } from "../../api/models/orders";
import { productModel } from "../../api/models/products";
import { userModel } from "../../api/models/users";
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
      await userModel.create(schema);
      const user = await userModel.index();
      userId = user[0]._id as string;
    });

    it("should create a product and extract it's id", async () => {
      await productModel.create(schema);
      const product = await productModel.index();
      pId = product[0]._id as string;
    });

    it(`should create new order`, async () => {
      await orderModel.create({ user_id: userId });
      const order = await orderModel.index();
      orderTime = order[0].created_at as string;
      orderId = order[0]._id as string;
    });

    it(`should add product to order`, async () => {
      const op = await OPT.addProducts(
        {
          product_id: pId,
          order_id: orderId,
        },
        userId
      );
      const created_at = op?.created_at;
      const opId = op?._id;
      time = created_at as string;
      expect(op).toEqual({
        _id: opId,
        order_id: orderId,
        product_id: pId,
        quantity: schema.quantity,
        created_at: time,
      });
    });

    it(`should update order status`, async () => {
      const order = await orderModel.updateUserOrders({
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
      const result = await OPT.getUserOrderedProducts(userId as string);
      expect(result).not.toBeNull();
    });

    it("should get all products related to a user for specific order id", async () => {
      const result = await OPT.getUserOrderedProductsByid(userId, orderId);
      expect(result).not.toBeNull();
    });

    it("should get all purchases related to a user", async () => {
      const result = await dashBoard.getUserPurchases(userId as string);
      expect(result).not.toBeNull();
    });
  });
});
