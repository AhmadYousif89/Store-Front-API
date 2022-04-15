import { OPT } from "../../api/models/ordered_products";
import { orderModel } from "../../api/models/orders";
import { productModel } from "../../api/models/products";
import { userModel } from "../../api/models/users";
import { schema } from "../test.server.routes/server.spec";
import { dashBoard } from "../../api/__services__/dashboard";

let pId: string | undefined;
let userId: string | undefined;
let time = "";
describe("Testing dashboard Model functions: \n", () => {
  it("should be a method to get all products related to a user", () => {
    expect(dashBoard.getUserProducts).toBeDefined();
  });

  it("should be a method to get all products related to a user for specific orders", () => {
    expect(dashBoard.getUserProductsByOid).toBeDefined();
  });

  it("should be a method to get all user's purachases that he/she made, list is sorted by most recent date", () => {
    expect(dashBoard.getUserMostPurchases).toBeDefined();
  });

  describe("Testing dashboard SQL functions: \n ", () => {
    it("should create user and a product and extract their ids", async () => {
      await userModel.create(schema);
      const user = await userModel.index();
      userId = user[0].user_id;

      await productModel.create({ ...schema });
      const product = await productModel.index();
      pId = product[0].p_id;
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

    it(`should add product to order`, async () => {
      const op = await OPT.addProducts({
        ...schema,
        product_id: pId,
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

    it(`should update order status`, async () => {
      const order = await orderModel.update({
        order_id: schema.order_id,
        order_status: "complete",
      });
      expect(order).toEqual({
        order_id: schema.order_id,
        order_status: "complete",
        user_id: userId,
      });
    });

    it("should get all products related to a user", async () => {
      const result = await dashBoard.getUserProducts(userId as string);
      expect(result).not.toBeNull();
    });

    it("should get all products related to a user for specific order id", async () => {
      const result = await dashBoard.getUserProductsByOid(
        userId as string,
        schema.order_id as number
      );
      expect(result).not.toBeNull();
    });

    it("should get all purchases related to a user", async () => {
      const result = await dashBoard.getUserMostPurchases(userId as string);
      expect(result).not.toBeNull();
    });
  });
});
