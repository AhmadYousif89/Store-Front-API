import { schema } from "../test.server.routes/server.spec";
import { productModel } from "../../api/models/products";
import { OPT } from "../../api/models/ordered_products";
import { orderModel } from "../../api/models/orders";
import { userModel } from "../../api/models/users";
import pgDB from "../../database";

let pId: string | undefined;
let userId: string | undefined;
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
    expect(OPT.update).toBeDefined();
  });

  it("should be a method to delete a row by id", () => {
    expect(OPT.delete).toBeDefined();
  });

  describe("Testing op SQL functions: \n ", () => {
    it("should create user and extract its id", async () => {
      await userModel.create(schema);
      const user = await userModel.index();
      userId = user[0].user_id;
    });

    it("should create product and extract its id", async () => {
      await productModel.create(schema);
      const product = await productModel.index();
      pId = product[0].p_id;
      console.log("product added to order");
    });

    it(`should create new order`, async () => {
      const order = await orderModel.create({
        user_id: userId,
        order_status: schema.order_status,
      });
      expect(order).toEqual({
        order_id: schema.order_id,
        order_status: schema.order_status,
        user_id: userId,
      });
    });

    it(`should add product to order number ${schema.order_id}`, async () => {
      const op = await OPT.addProducts({
        product_id: pId,
        order_id: schema.order_id,
        quantity: schema.quantity,
      });
      const created_at = op?.created_at;
      time = created_at as string;
      expect(op).toEqual({
        op_id: schema.op_id,
        order_id: schema.order_id,
        product_id: pId,
        quantity: schema.quantity,
        created_at: time,
      });
    });

    it(`should get all ordered products`, async () => {
      const op = await OPT.index();
      expect(op).toEqual([
        {
          op_id: schema.op_id,
          order_id: schema.order_id,
          product_id: pId,
          quantity: schema.quantity,
          created_at: time,
        },
      ]);
      console.log("all ordered product");
    });

    it(`should get one ordered product by id`, async () => {
      const op = await OPT.show({ op_id: schema.op_id });
      expect(op).toEqual({
        op_id: schema.op_id,
        order_id: schema.order_id,
        product_id: pId,
        quantity: schema.quantity,
        created_at: time,
      });
      console.log("one ordered product");
    });

    it(`should update the quantity of one ordered products by id`, async () => {
      const op = await OPT.update({ product_id: pId, quantity: 50 });
      expect(op).toEqual({
        op_id: schema.op_id,
        order_id: schema.order_id,
        product_id: pId,
        quantity: 50,
        created_at: time,
      });
      console.log("update ordered product");
    });

    it(`should delete one ordered products by id`, async () => {
      const op = await OPT.delete({ op_id: schema.op_id });
      expect(op).toEqual({
        op_id: schema.op_id,
        order_id: schema.order_id,
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
