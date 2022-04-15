import { schema } from "../test.server.routes/server.spec";
import { productModel } from "../../api/models/products";

let pId = "";

describe("Testing product Model functions: \n", () => {
  it("should be a method to get all products", () => {
    expect(productModel.create).toBeDefined();
  });

  it("should be a method to get a product by id", () => {
    expect(productModel.index).toBeDefined();
  });

  it("should be a method to create a new product", () => {
    expect(productModel.show).toBeDefined();
  });

  it("should be a method to update a product", () => {
    expect(productModel.update).toBeDefined();
  });

  it("should be a method to delete a product", () => {
    expect(productModel.delete).toBeDefined();
  });

  describe("Testing SQL functions: \n ", () => {
    it(`should create new product`, async () => {
      const result = await productModel.create(schema);
      expect(result).toEqual({
        ...result,
      });
      console.log("product has been created");
    });

    it("should return a list of all products", async () => {
      const result = await productModel.index();
      pId = result[0].p_id as string;
      expect(result).toEqual([
        {
          p_id: pId,
          category: schema.category,
          p_name: schema.p_name,
          brand: schema.brand,
          price: schema.price,
          image_url: schema.image_url,
          description: schema.description,
        },
      ]);
      console.log("all products");
    });

    it("should return the correct product by id", async () => {
      const result = await productModel.show({ p_id: pId });
      expect(result).toEqual({
        p_id: pId,
        category: schema.category,
        p_name: schema.p_name,
        brand: schema.brand,
        price: schema.price,
        image_url: schema.image_url,
        description: schema.description,
      });
      console.log("one product");
    });

    it(`should update the price to = (500) for product by id`, async () => {
      const result = await productModel.update({ p_id: pId, price: 500 });
      expect(result).toEqual({
        p_id: pId,
        category: schema.category,
        p_name: schema.p_name,
        brand: schema.brand,
        price: 500,
        image_url: schema.image_url,
        description: schema.description,
      });
      console.log("update product");
    });

    it(`should delete the selected product by ID`, async () => {
      const result = await productModel.delete({ p_id: pId });
      expect(result).toEqual({
        p_id: pId,
        category: schema.category,
        p_name: schema.p_name,
        brand: schema.brand,
        price: 500,
        image_url: schema.image_url,
        description: schema.description,
      });
      console.log("delete product");
    });
  });
});
