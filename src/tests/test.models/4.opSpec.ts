import { schema } from "../test.app.routes/appSpec";
import { productModel } from "../../api/products/products";
import { OPT } from "../../api/orderedProducts/orderedProducts";
import { orderModel } from "../../api/orders/orders";
import { userModel } from "../../api/users/users";
import pgDB from "../../database";

let pId: string | undefined;
let userId: string | undefined;

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
    it("should create user and a product and extract their ids", async () => {
      await userModel.create(schema);
      const user = await userModel.index();
      userId = user[0].u_id;
      console.log("user id extracted: ", userId);
      await productModel.create(schema);
      const product = await productModel.index();
      pId = product[0].p_id;
      console.log("product id extracted: ", pId);
    });

    it(`should create new order`, async () => {
      const order = await orderModel.create({
        u_id: userId,
        order_status: schema.order_status,
      });
      expect(order?.msg).toEqual("Order created successfully");
    });

    it(`should add product to order`, async () => {
      const op = await OPT.addProducts({
        p_id: pId,
        order_id: schema.order_id,
        quantity: schema.quantity,
      });
      expect(op?.msg).toEqual(
        `Product has been added successfully to order number (${schema.order_id})`
      );
    });

    it(`should get all ordered products`, async () => {
      const op = await OPT.index();
      expect(op[0].op_id).toEqual(schema.op_id);
      expect(op[0].order_id).toEqual(schema.order_id);
      expect(op[0].product_id).toEqual(pId);
      expect(op[0].quantity).toEqual(schema.quantity);
    });

    it(`should get one ordered product by id`, async () => {
      const op = await OPT.show(schema.op_id as number);
      expect(op?.msg).toEqual("Data generated successfully");
    });

    it(`should update the quantity of one ordered products by id`, async () => {
      const op = await OPT.update(pId as string, 50);
      expect(op?.msg).toEqual("Product quantity updated successfully");
    });

    it(`should delete one ordered products by id`, async () => {
      const op = await OPT.delete(schema.op_id as number);
      expect(op?.msg).toEqual(`Row number ${schema.op_id} was deleted successfully`);
    });

    afterAll(async () => {
      const conct = await pgDB.connect();
      await conct.query("DELETE FROM ordered_products");
      await conct.query("DELETE FROM orders");
      await conct.query("DELETE FROM products");
      await conct.query("DELETE FROM users");
      await conct.query("ALTER SEQUENCE orders_order_id_seq RESTART WITH 1");
      await conct.query("ALTER SEQUENCE ordered_products_op_id_seq RESTART WITH 1");
      console.log("seq altered");
      conct.release();
    });
  });
});
