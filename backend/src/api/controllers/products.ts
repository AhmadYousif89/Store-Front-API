import { Request, Response } from "express";
import { productModel } from "../models/products";
import asyncWrapper from "../../middlewares/asyncWrapper";

// method => POST /products
// desc   => Create new product data.
const createProducts = asyncWrapper(
  async (req: Request, res: Response): Promise<void | Response> => {
    const { name, brand, imageUrl, description, color } = req.body;
    const price = parseInt(req.body.price);
    const category = req.body.category.toLowerCase();

    if (!category || !name || !brand || !imageUrl || !price || price <= 0) {
      return res.status(400).json({ message: "Please enter a valid details before submiting !" });
    }

    const data = await productModel.create({
      category: category,
      p_name: name,
      brand: brand,
      price: price,
      image_url: imageUrl,
      description: description || "No description!",
      color: color || "N/A",
    });

    res.status(201).json(data);
  }
);

// method => GET /products
// desc   =>  all products data.
const getProducts = asyncWrapper(async (_req: Request, res: Response): Promise<void | Response> => {
  const data = await productModel.index();

  if (!data.length) {
    return res.status(404).json({ message: `No Products Were Found !` });
  }

  res.status(200).json(data);
});

// method => GET /products/:id
// desc   =>  a specific product by id.
const getProductById = asyncWrapper(
  async (req: Request, res: Response): Promise<void | Response> => {
    const pid = req.params.id;

    const data = await productModel.show({ p_id: pid });
    if (!data) {
      return res
        .status(404)
        .json({ message: "Request failed !", data: `Product with id (${pid}) Doesn't Exist !` });
    }

    res.status(200).json(data);
  }
);

// method => PUT /products
// desc   => Update a specific product .
const updateProduct = asyncWrapper(
  async (req: Request, res: Response): Promise<void | Response> => {
    const pid = req.body.id;
    const price = parseInt(req.body.price);

    if (!pid || !price || price <= 0) {
      return res.status(400).json({ message: "Please provide a valid details before updating !" });
    }

    const data = await productModel.update({ p_id: pid, price: price });
    if (!data) {
      return res.status(404).json({
        message: "Update failed !",
        data: `Product with id (${pid}) doesn't exist`,
      });
    }

    res.status(200).json(data);
  }
);

// method => DELETE /products/:id
// desc   => Delete a specific Product.
const deleteProduct = asyncWrapper(
  async (req: Request, res: Response): Promise<void | Response> => {
    const pid = req.params.id;

    if (!pid) {
      return res.status(400).json({ message: "Please provide product id !" });
    }

    const data = await productModel.delete({ p_id: pid });
    if (!data) {
      return res.status(404).json({
        message: "Delete failed !",
        data: `Product with id (${pid}) doesn't exist`,
      });
    }

    res.status(200).json(data);
  }
);

export { createProducts, getProducts, getProductById, updateProduct, deleteProduct };
