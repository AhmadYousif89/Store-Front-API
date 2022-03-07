import { product } from "../test.app.routes/appSpec";
import { productModel } from "../../api/products/products";

let pId = "";

describe("Testing product Model functions: \n", () => {
  it("should have a get all products method", () => {
    expect(productModel.create).toBeDefined();
  });

  it("should have a get product by Id method", () => {
    expect(productModel.index).toBeDefined();
  });

  it("should have a create method", () => {
    expect(productModel.show).toBeDefined();
  });

  it("should have an update product method", () => {
    expect(productModel.update).toBeDefined();
  });

  it("should have a delete product method", () => {
    expect(productModel.delete).toBeDefined();
  });

  describe("Testing SQL functions: \n ", () => {
    it(`should create new product`, async () => {
      const result = await productModel.create(product);
      expect(result).toEqual({
        msg: "product created successfully",
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
        msg: "product generated successfully",
        data: {
          p_uid: pId,
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

    it(`should update the price to = (500) and popular = 'yes' for product by ID`, async () => {
      const result = await productModel.update(pId as string, 500, "yes");
      expect(result).toEqual({
        msg: "product updated successfully",
        data: {
          p_uid: pId,
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
        msg: "product deleted successfully",
        data: {
          p_uid: pId,
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
