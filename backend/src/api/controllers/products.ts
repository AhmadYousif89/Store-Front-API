import { Request, Response, NextFunction } from "express";
import { productModel } from "../models/products";
import { Error } from "../../utils/control";

let error;
// method => POST /products
// desc   => Create new product data.
const createProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { name, brand, imageUrl, description } = req.body;
  const price = parseInt(req.body.price);
  const category = req.body.category.toLowerCase();

  if (!category || !name || !brand || !imageUrl || !price || price <= 0) {
    return res.status(400).json({ message: "Please enter a valid details before submiting !" });
  }
  try {
    const data = await productModel.create({
      category: category,
      p_name: name,
      brand: brand,
      price: price,
      imageUrl: imageUrl,
      description: description || "No description!",
    });
    res.status(201).json(data);
  } catch (err) {
    error = {
      message: `${(err as Error).message}`,
    };
    next(error);
  }
};

// method => GET /products
// desc   =>  all products data.
const getProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const data = await productModel.index();
    if (!data.length) {
      return res.status(404).json({ message: `No Products Were Found !` });
    }
    res.status(200).json({ message: "Data generated successfully", data });
  } catch (err) {
    error = {
      message: `${(err as Error).message}`,
    };
    next(error);
  }
};

// method => GET /products/:id
// desc   =>  a specific product by id.
const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const id = req.params.id;

  try {
    const data = await productModel.show(id);
    if (!data) {
      return res
        .status(404)
        .json({ message: "Request failed !", data: `Product with id (${id}) Doesn't Exist !` });
    }
    res.status(200).json(data);
  } catch (err) {
    error = {
      message: `${(err as Error).message}`,
    };
    next(error);
  }
};

// method => PUT /products
// desc   => Update a specific product .
const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const pid = req.body.id;
  const price = parseInt(req.body.price);

  if (!pid || !price || price <= 0) {
    return res.status(400).json({ message: "Please provide a valid details before updating !" });
  }
  try {
    const data = await productModel.update(pid, price);
    if (!data) {
      return res.status(404).json({
        message: "Update failed !",
        data: `Product with id (${pid}) doesn't exist`,
      });
    }
    res.status(200).json(data);
  } catch (err) {
    error = {
      message: `${(err as Error).message}`,
    };
    next(error);
  }
};

// method => DELETE /products/:id
// desc   => Delete a specific Product.
const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const pid = req.params.id;

  if (!pid) {
    return res.status(400).json({ message: "Please provide product id !" });
  }
  try {
    const data = await productModel.delete(pid);
    if (!data) {
      return res.status(404).json({
        message: "Delete failed !",
        data: `Product with id (${pid}) doesn't exist`,
      });
    }
    res.status(200).json(data);
  } catch (err) {
    error = {
      message: `${(err as Error).message}`,
    };
    next(error);
  }
};

export { createProducts, getProducts, getProductById, updateProduct, deleteProduct };
