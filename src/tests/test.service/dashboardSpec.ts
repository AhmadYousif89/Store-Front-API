import { OPT } from "../../api/orderedProducts/orderedProducts";
import { orderModel } from "../../api/orders/orders";
import { productModel } from "../../api/products/products";
import { userModel } from "../../api/users/users";
import { schema } from "../test.app.routes/appSpec";
import { dashBoard } from "./../../api/__services__/dashboard";

let pId: string | undefined;
let userId: string | undefined;

describe("Testing dashboard Model functions: \n", () => {
  it("should be a method to get all products related to a user", () => {
    expect(dashBoard.getUserProducts).toBeDefined();
  });

  it("should be a method to get all products related to a user for specific orders", () => {
    expect(dashBoard.getUserProductsByOid).toBeDefined();
  });

  it("should be a method to get all products based on popularity, list is limited by 5 items", () => {
    expect(dashBoard.getProductByPopularity).toBeDefined();
  });

  it("should be a method to get all user's purachases that he/she made, list is sorted by most recent date", () => {
    expect(dashBoard.getUserMostPurchases).toBeDefined();
  });

  describe("Testing dashboard SQL functions: \n ", () => {
    it("should create user and a product and extract their ids", async () => {
      await userModel.create(schema);
      const user = await userModel.index();
      userId = user[0].u_id;
      console.log("user id extracted: ", userId);

      await productModel.create({ ...schema, popular: "yes" });
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
        ...schema,
        p_id: pId,
      });
      expect(op?.msg).toEqual(
        `Product has been added successfully to order number (${schema.order_id})`
      );
    });

    it(`should update order status`, async () => {
      const order = await orderModel.update(schema.order_id as number, "complete");
      expect(order?.msg).toEqual("Order updated successfully");
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

    it("should get all popular products", async () => {
      const result = await dashBoard.getProductByPopularity();
      expect(result).not.toBeNull();
    });
  });
});
