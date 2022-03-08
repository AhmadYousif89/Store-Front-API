import { product } from "../test.app.routes/appSpec";
import { productModel } from "../../api/products/products";

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
      const result = await productModel.create(product);
      expect(result).toEqual({
        msg: "Product created successfully",
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
          category: product.category,
          p_name: product.p_name,
          brand: product.brand,
          maker: product.maker,
          price: product.price,
          popular: product.popular,
        },
      ]);
      console.log("all products");
    });

    it("should return the correct product by id", async () => {
      const result = await productModel.show(pId as string);
      expect(result).toEqual({
        msg: "Product generated successfully",
        data: {
          p_id: pId,
          category: product.category,
          p_name: product.p_name,
          brand: product.brand,
          maker: product.maker,
          price: product.price,
          popular: product.popular,
        },
      });
      console.log("one product");
    });

    it(`should update the price to = (500) and popular = 'yes' for product by id`, async () => {
      const result = await productModel.update(pId as string, 500, "yes");
      expect(result).toEqual({
        msg: "Product updated successfully",
        data: {
          p_id: pId,
          category: product.category,
          p_name: product.p_name,
          brand: product.brand,
          maker: product.maker,
          price: 500,
          popular: "yes",
        },
      });
      console.log("update product");
    });

    it(`should delete the selected product by ID`, async () => {
      const result = await productModel.delete(pId as string);
      expect(result).toEqual({
        msg: "Product deleted successfully",
        data: {
          p_id: pId,
          category: product.category,
          p_name: product.p_name,
          brand: product.brand,
          maker: product.maker,
          price: 500,
          popular: "yes",
        },
      });
      console.log("delete product");
    });
  });
});
