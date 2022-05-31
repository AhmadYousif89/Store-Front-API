import { Request, Response } from "express";
import { Product } from "../models/products";
import asyncWrapper from "../../middlewares/asyncWrapper";

// method => POST /products
// desc   => Create new product data.
const createProducts = asyncWrapper(
  async (req: Request, res: Response): Promise<void | Response> => {
    const { name, brand, imageUrl, description, color } = req.body;
    const price = parseInt(req.body.price);
    const category = req.body.category.toLowerCase();

    if (!category || !name || !brand || !imageUrl || !price || price <= 0) {
      return res.status(400).json({ message: "Please enter a valid details before submiting" });
    }

    const product = await Product.create({
      category: category,
      p_name: name,
      brand: brand,
      price: price,
      image_url: imageUrl,
      description: description || "No description!",
      color: color || "N/A",
    });

    res.status(201).json(product);
  }
);

// method => GET /products
// desc   =>  all products data.
const getProducts = asyncWrapper(async (_req: Request, res: Response): Promise<void | Response> => {
  const products = await Product.index();

  if (!products.length) {
    return res.status(404).json({ message: `no products were found` });
  }

  res.status(200).json(products);
});

// method => GET /products/:id
// desc   =>  a specific product by id.
const getProductById = asyncWrapper(
  async (req: Request, res: Response): Promise<void | Response> => {
    const pid = req.params.id;

    const product = await Product.show({ _id: pid });
    if (!product) {
      return res.status(404).json({ message: `product not found` });
    }

    res.status(200).json(product);
  }
);

// method => PUT /products
// desc   => Update a specific product .
const updateProduct = asyncWrapper(
  async (req: Request, res: Response): Promise<void | Response> => {
    const pid = req.params.id;
    const price = parseInt(req.body.price);

    if (isNaN(price) || price < 0) {
      return res.status(400).json({ message: "invalid product price" });
    }

    const product = await Product.update({ _id: pid, price: price });
    if (!product) {
      return res.status(404).json({ message: `product not found` });
    }

    res.status(200).json({ message: "update success", ...product });
  }
);

// method => DELETE /products/:id
// desc   => Delete a specific Product.
const deleteProduct = asyncWrapper(
  async (req: Request, res: Response): Promise<void | Response> => {
    const pid = req.params.id;

    if (!pid) {
      return res.status(400).json({ message: "invalid product id" });
    }

    const product = await Product.delete({ _id: pid });
    if (!product) {
      return res.status(404).json({ message: `product not found` });
    }

    res.status(200).json({ message: "delete success", ...product });
  }
);

export { createProducts, getProducts, getProductById, updateProduct, deleteProduct };
