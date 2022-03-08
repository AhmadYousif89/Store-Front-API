import { OPT } from "./../../api/orderedProducts/orderedProducts";

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
});
