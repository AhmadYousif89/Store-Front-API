import { schema } from "./../testingSchema";
import { productModel } from "../../api/models/products";
import { OPT } from "../../api/models/order_details";
import { orderModel } from "../../api/models/orders";
import { userModel } from "../../api/models/users";
import pgDB from "../../db/database";

let pId = "";
let userId = "";
let orderId = "";
let opId = "";
let time = "";

describe("OrderedProducts Model functions: \n", () => {
  it("should be a method to get all data", () => {
    expect(OPT.index).toBeDefined();
  });

  it("should be a method to get one row by id", () => {
    expect(OPT.show).toBeDefined();
  });

  it("should be a method to add products to existing orders", () => {
    expect(OPT.addProducts).toBeDefined();
  });

  it("should be method an update for product quantity", () => {
    expect(OPT.updateUserOrderedProduct).toBeDefined();
  });

  it("should be a method to delete a row by id", () => {
    expect(OPT.delUserOrderedProduct).toBeDefined();
  });

  describe("Testing op SQL functions: \n ", () => {
    it("should create user and extract its id", async () => {
      await userModel.create(schema);
      const user = await userModel.index();
      userId = user[0]._id as string;
    });

    it("should create product and extract its id", async () => {
      await productModel.create(schema);
      const product = await productModel.index();
      pId = product[0]._id as string;
      console.log("product added to order");
    });

    it(`should create new order`, async () => {
      await orderModel.create({ user_id: userId });
      const order = await orderModel.index();
      orderId = order[0]._id as string;
    });

    it(`should add product to order number ${orderId}`, async () => {
      const op = await OPT.addProducts(
        {
          product_id: pId,
          order_id: orderId,
          quantity: schema.quantity,
        },
        userId
      );
      const created_at = op?.created_at;
      opId = op?._id as string;
      time = created_at as string;
      expect(op).toEqual({
        _id: opId,
        order_id: orderId,
        product_id: pId,
        quantity: schema.quantity,
        created_at: time,
      });
    });

    it(`should get all ordered products`, async () => {
      const op = await OPT.index();
      expect(op).toEqual([
        {
          _id: opId,
          order_id: orderId,
          product_id: pId,
          quantity: schema.quantity,
          created_at: time,
        },
      ]);
      console.log("all ordered product");
    });

    it(`should get one ordered product by id`, async () => {
      const op = await OPT.show({ _id: opId });
      expect(op).toEqual({
        _id: opId,
        order_id: orderId,
        product_id: pId,
        quantity: schema.quantity,
        created_at: time,
      });
      console.log("one ordered product");
    });

    it(`should update the quantity of one ordered products by id`, async () => {
      const op = await OPT.updateUserOrderedProduct(
        { order_id: orderId, product_id: pId, quantity: 50 },
        userId
      );
      expect(op).toEqual({
        _id: opId,
        order_id: orderId,
        product_id: pId,
        quantity: 50,
        created_at: time,
      });
      console.log("update ordered product");
    });

    it(`should delete one ordered products by id`, async () => {
      const op = await OPT.delUserOrderedProduct({ order_id: orderId }, userId);
      expect(op).toEqual({
        _id: opId,
        order_id: orderId,
        product_id: pId,
        quantity: 50,
        created_at: time,
      });
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
