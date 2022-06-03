import { Request, Response } from "express";
import { Product } from "../models/products";
import asyncWrapper from "../../middlewares/asyncWrapper";
import cloudinary from "../cloudinary/cloudinary";

// method => POST /products
// desc   => Create new product data.
const createProducts = asyncWrapper(
  async (req: Request, res: Response): Promise<void | Response> => {
    const { name, brand, image, description, color } = req.body;
    const price = parseInt(req.body.price);
    const category = req.body.category.toLowerCase();

    if (!category || !name || !brand || !image || !price || price <= 0) {
      return res.status(400).json({ message: "Please complete the form before submiting" });
    }

    if (image) {
      const uploadedImg = await cloudinary.uploader.upload(image, {
        upload_preset: "TechStore",
        overwrite: true,
      });
      if (uploadedImg) {
        const product = await Product.create({
          category: category,
          name: name,
          brand: brand,
          price: price,
          image: uploadedImg.secure_url,
          description: description || "No description!",
          color: color || "N/A",
        });
        res.status(201).json(product);
      }
    }
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

const deleteAll = asyncWrapper(async (req: Request, res: Response): Promise<void | Response> => {
  await Product.deleteAll();
  res.status(200).json({ message: "delete all success" });
});

export { createProducts, getProducts, getProductById, updateProduct, deleteProduct, deleteAll };
