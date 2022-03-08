import { orderModel } from "../../api/orders/orders";

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
});
