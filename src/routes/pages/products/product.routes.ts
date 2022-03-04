import { Router, Request, Response, NextFunction } from "express";
import { productModel } from "../../../models/products";
import { Error } from "../../../utils/control";

let error: Error;
// method => POST /products
// desc   => Create new product data.
const createProducts = Router().post(
  "/products",
  async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    const { category, name, brand, maker } = req.body;
    const price = Number.parseInt(req.body.price);
    console.log(
      `params:
      ${category} ${name} ${brand}  ${maker} ${price} `
    );
    // validating values before submitting.
    if (!category || !name || !brand || !maker || !price || price <= 0) {
      res
        .status(400)
        .json({ status: "Error", message: "Please provide correct details before submiting !" });
      return;
    }
    try {
      const data = await productModel.createProduct({
        category: category,
        p_name: name,
        brand: brand,
        maker: maker,
        price: price,
      });
      res.status(201).json(data);
    } catch (err) {
      error = {
        message: `Request Failed ! ${(err as Error).message}`,
      };
      next(error);
    }
  }
);

// method => GET /products
// desc   => Return all products data.
const getProducts = Router().get(
  "/products",
  async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await productModel.getAllProducts();
      if (data.length === 0) {
        res.status(404).json({ msg: `No Products Were Found !` });
        return;
      }
      res.status(200).json({ msg: "Data generated successfully", data });
    } catch (err) {
      error = {
        message: `Request Failed ! ${(err as Error).message}`,
      };
      next(error);
    }
  }
);

// method => GET /products/id
// desc   => Return a specific product by id.
const getProductById = Router().get(
  "/products/id",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.body;
    console.log("data: \n", id);
    if (!id) {
      res.status(400).json({ status: "Error", message: "Please provide product id !" });
      return;
    }
    try {
      const data = await productModel.getProductById(id);
      if (!data) {
        res
          .status(404)
          .json({ msg: "Request failed !", data: `Product with id (${id}) Doesn't Exist !` });
        return;
      }
      res.status(200).json(data);
    } catch (err) {
      error = {
        message: `Request Failed ! ${(err as Error).message}`,
      };
      next(error);
    }
  }
);

// method => GET /products/category
// desc   => Return a all product by category.
const getProductBycategory = Router().get(
  "/products/:category",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const category = req.params.category;
    console.log("data: \n", category);
    try {
      const data = await productModel.getProductBycategory(category);
      if (!data) {
        res.status(404).json({
          msg: "Request failed !",
          data: `No products Found in category (${category})!`,
        });
        return;
      }
      res.status(200).json(data);
    } catch (err) {
      error = {
        message: `Request Failed ! ${(err as Error).message}`,
      };
      next(error);
    }
  }
);

// method => PUT /products
// desc   => Update a specific product .
const updateProduct = Router().put(
  "/products",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.body;
    const price = Number.parseInt(req.body.price);
    console.log(
      `data: 
      ${id} 
      ${price}`
    );
    if (!id || !price || price <= 0) {
      res.status(400).json({ status: "Error", message: "Please provide valid id and price !" });
      return;
    }
    try {
      const data = await productModel.updateProduct(id, price);
      if (!data) {
        res.status(404).json({
          msg: "Update failed !",
          data: `Product with id (${id}) doesn't exist`,
        });
      }
      res.status(200).json(data);
    } catch (err) {
      error = {
        message: `Request Failed ! ${(err as Error).message}`,
      };
      next(error);
    }
  }
);

// method => DELETE /products/Products/id
// desc   => Delete a specific Product.
const deleteProduct = Router().delete(
  "/products/id",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.body;
    console.log("data: \n", id);
    if (!id) {
      res.status(400).json({ status: "Error", message: "Please provide product id !" });
      return;
    }
    try {
      const data = await productModel.delProduct(id);
      if (!data) {
        res.status(404).json({
          msg: "Delete failed !",
          data: `Product with id (${id}) doesn't exist`,
        });
        return;
      }
      res.status(200).json(data);
    } catch (err) {
      error = {
        message: `Request Failed ! ${(err as Error).message}`,
      };
      next(error);
    }
  }
);

export default {
  createProducts,
  getProducts,
  getProductById,
  getProductBycategory,
  updateProduct,
  deleteProduct,
};
