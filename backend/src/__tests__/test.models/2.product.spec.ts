import { schema } from "./../testingSchema";
import { Product } from "../../api/models/products";

let pId = "";

describe("Testing product Model functions: \n", () => {
  it("should be a method to get all products", () => {
    expect(Product.create).toBeDefined();
  });

  it("should be a method to get a product by id", () => {
    expect(Product.index).toBeDefined();
  });

  it("should be a method to create a new product", () => {
    expect(Product.show).toBeDefined();
  });

  it("should be a method to update a product", () => {
    expect(Product.update).toBeDefined();
  });

  it("should be a method to delete a product", () => {
    expect(Product.delete).toBeDefined();
  });

  describe("Testing SQL functions: \n ", () => {
    it(`should create new product`, async () => {
      const result = await Product.create(schema);
      expect(result).toEqual({
        ...result,
      });
      console.log("product has been created");
    });

    it("should return a list of all products", async () => {
      const result = await Product.index();
      pId = result[0]._id as string;
      expect(result).toEqual([
        {
          _id: pId,
          category: schema.category,
          name: schema.p_name,
          brand: schema.brand,
          price: schema.price,
          image: schema.image_url,
          description: schema.description,
        },
      ]);
      console.log("all products");
    });

    it("should return the correct product by id", async () => {
      const result = await Product.show({ _id: pId });
      expect(result).toEqual({
        _id: pId,
        category: schema.category,
        name: schema.p_name,
        brand: schema.brand,
        price: schema.price,
        image: schema.image_url,
        description: schema.description,
      });
      console.log("one product");
    });

    it(`should update the price to = (500) for product by id`, async () => {
      const result = await Product.update({ _id: pId, price: 500 });
      expect(result).toEqual({
        _id: pId,
        category: schema.category,
        name: schema.p_name,
        brand: schema.brand,
        price: 500,
        image: schema.image_url,
        description: schema.description,
      });
      console.log("update product");
    });

    it(`should delete the selected product by ID`, async () => {
      const result = await Product.delete({ _id: pId });
      expect(result).toEqual({
        _id: pId,
        category: schema.category,
        name: schema.p_name,
        brand: schema.brand,
        price: 500,
        image: schema.image_url,
        description: schema.description,
      });
      console.log("delete product");
    });
  });
});
