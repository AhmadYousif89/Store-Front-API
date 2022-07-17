import { schema } from "./../testingSchema";
import { Product } from "../../api/models/products";
import { OrderDetails } from "../../api/models/order_details";
import { Order } from "../../api/models/orders";
import { User } from "../../api/models/users";
import pgDB from "../../db/database";

let pId = "";
let userId = "";
let orderId = "";
let opId = "";
let time = "";

describe("OrderedProducts Model functions: \n", () => {
  it("should be a method to get all data", () => {
    expect(OrderDetails.index).toBeDefined();
  });

  it("should be a method to get one row by id", () => {
    expect(OrderDetails.show).toBeDefined();
  });

  it("should be a method to add products to existing orders", () => {
    expect(OrderDetails.createOrderDetails).toBeDefined();
  });

  it("should be method an update for product quantity", () => {
    expect(OrderDetails.updateUserOrderDetails).toBeDefined();
  });

  it("should be a method to delete a row by id", () => {
    expect(OrderDetails.delUserOrderDetails).toBeDefined();
  });

  describe("Testing op SQL functions: \n ", () => {
    it("should create user and extract its id", async () => {
      await User.create(schema);
      const user = await User.index();
      userId = user[0]._id as string;
    });

    it("should create product and extract its id", async () => {
      await Product.create(schema);
      const product = await Product.index();
      pId = product[0]._id as string;
      console.log("product added to order");
    });

    it(`should create new order`, async () => {
      await Order.createOrder({ user_id: userId });
      const order = await Order.index();
      orderId = order[0]._id as string;
    });

    it(`should add product to order number ${orderId}`, async () => {
      const op = await OrderDetails.createOrderDetails({});
      const created_at = op?.created_at;
      opId = op?._id as string;
      time = created_at as string;
      expect(op).toEqual({});
    });

    it(`should get all ordered products`, async () => {
      const op = await OrderDetails.index();
      expect(op).toEqual([]);
      console.log("all ordered product");
    });

    it(`should get one ordered product by id`, async () => {
      const op = await OrderDetails.show({ _id: opId });
      expect(op).toEqual({});
      console.log("one ordered product");
    });

    it(`should update the quantity of one ordered products by id`, async () => {
      const op = await OrderDetails.updateUserOrderDetails({}, userId);
      expect(op).toEqual({});
      console.log("update ordered product");
    });

    it(`should delete one ordered products by id`, async () => {
      const op = await OrderDetails.delUserOrderDetails({}, userId);
      expect(op).toEqual({});
      console.log("delete ordered product");
    });

    afterAll(async () => {
      const conct = await pgDB.connect();
      await conct.query("DELETE FROM ordered_products");
      await conct.query("DELETE FROM orders");
      await conct.query("DELETE FROM products");
      await conct.query("DELETE FROM users");
      await conct.query("ALTER SEQUENCE orders_order_id_seq RESTART WITH 1");
      await conct.query("ALTER SEQUENCE ordered_products_op_id_seq RESTART WITH 1");
      console.log("Sequence altered successfully");
      conct.release();
    });
  });
});
