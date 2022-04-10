import { Request, Response, NextFunction } from "express";
import { OPT } from "../models/ordered_products";
import { Error } from "../../utils/control";

let error;
// method => POST /user/account/orders/:id/products
// desc   => add product to order.
const addProductToOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const oId = parseInt(req.params.id);
  const pId = req.body.p_id;
  const quantity = parseInt(req.body.quantity);

  // validating values before submitting.
  if (!pId || !quantity || quantity <= 0 || isNaN(oId)) {
    return res.status(400).json({ message: "Please provide correct details before submiting !" });
  }
  try {
    const data = await OPT.addProducts({
      order_id: oId,
      p_id: pId,
      quantity: quantity,
    });
    res.status(201).json(data);
  } catch (err) {
    error = {
      message: `${(err as Error).message}`,
    };
    next(error);
  }
};

// method =>Return GET /user/account/ordered-products
// desc   =>  all Ordered products.
const getOrderedProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const data = await OPT.index();
    if (data.length === 0) {
      return res.status(404).json({ message: `No Data Were Found !` });
    }
    res.status(200).json({ message: "Data generated successfully", data });
  } catch (err) {
    error = {
      message: `${(err as Error).message}`,
    };
    next(error);
  }
};

// method =>Return GET /user/account/ordered-products/:id
// desc   =>  a specific row from ordered products.
const getOPsById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const opId = parseInt(req.params.id);

  if (!opId || opId <= 0) {
    return res.status(400).json({ message: "Please enter a valid op id !" });
  }
  try {
    const data = await OPT.show(opId);
    if (!data) {
      return res.status(404).json({
        message: "Request failed !",
        data: `No products related to this id (${opId}) !`,
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

// method => PUT /user/account/ordered-products
// desc   => Update a specific Order .
const updateOrderedProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const pId = req.body.p_id;
  const quantity = parseInt(req.body.quantity);

  if (!pId || quantity <= 0 || !quantity) {
    return res.status(400).json({ message: "Please provide correct details before updating !" });
  }
  try {
    const data = await OPT.update(pId, quantity);
    if (!data) {
      return res.status(404).json({
        message: "Update failed !",
        data: `Product with id (${pId}) doesn't exist`,
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

// method => DELETE /user/account/ordered-products/:id
// desc   => Delete a specific Order.
const delOrderedProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const opId = parseInt(req.params.id);

  if (!opId || opId <= 0) {
    return res.status(400).json({ message: "Please enter a valid op id !" });
  }
  try {
    const data = await OPT.delete(opId);
    if (!data) {
      return res.status(404).json({
        message: "Delete failed !",
        data: `Order with id (${opId}) doesn't exist`,
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

export {
  addProductToOrder,
  getOrderedProducts,
  getOPsById,
  updateOrderedProduct,
  delOrderedProduct,
};
