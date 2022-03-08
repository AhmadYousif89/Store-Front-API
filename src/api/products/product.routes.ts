import { Router, Request, Response, NextFunction } from "express";
import { productModel } from "./products";
import { Error } from "../../utils/control";
import Authentication from "../../middlewares/auth.middleware";

let error;
// method => POST /products
// desc   => Create new product data.
const createProducts = Router().post(
  "/products",
  Authentication,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, brand, maker } = req.body;
    const category = req.body.category.toLowerCase();
    const price = parseInt(req.body.price);
    const popular = req.body.popular.toLowerCase();
    console.log(
      `params:
      ${category} ${name} ${brand}  ${maker} ${price} ${popular}`
    );
    // validating values before submitting.
    if (!category || !name || !brand || !maker || !price || price <= 0) {
      res
        .status(400)
        .json({ status: "Error", message: "Please enter a valid details before submiting !" });
      return;
    }
    try {
      const data = await productModel.create({
        category: category,
        p_name: name,
        brand: brand,
        maker: maker,
        price: price,
        popular: popular,
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
      const data = await productModel.index();
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

// method => GET /products/:id
// desc   => Return a specific product by id.
const getProductById = Router().get(
  "/products/:id",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id = req.params.id;
    console.log("data: \n", id);
    try {
      const data = await productModel.show(id);
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

// method => PUT /products
// desc   => Update a specific product .
const updateProduct = Router().put(
  "/products",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const pid = req.body.id;
    const price = parseInt(req.body.price);
    const popular = req.body.popular.toLowerCase();
    console.log(
      `data: 
      ${pid} 
      ${price}
      ${popular}`
    );
    if (!pid || !price || price <= 0) {
      res
        .status(400)
        .json({ status: "Error", message: "Please provide a valid details before updating !" });
      return;
    }
    try {
      const data = await productModel.update(pid, price, popular);
      if (!data) {
        res.status(404).json({
          msg: "Update failed !",
          data: `Product with id (${pid}) doesn't exist`,
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

// method => DELETE /products/:id
// desc   => Delete a specific Product.
const deleteProduct = Router().delete(
  "/products/:id",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const pid = req.params.id;
    console.log("data: \n", pid);
    if (!pid) {
      res.status(400).json({ status: "Error", message: "Please provide product id !" });
      return;
    }
    try {
      const data = await productModel.delete(pid);
      if (!data) {
        res.status(404).json({
          msg: "Delete failed !",
          data: `Product with id (${pid}) doesn't exist`,
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
  updateProduct,
  deleteProduct,
};
