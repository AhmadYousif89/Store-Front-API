import { Request, Response } from "express";
import asyncWrapper from "../../middlewares/asyncWrapper";
import { OPT } from "../models/ordered_products";

// method => POST /user/account/orders/:id/products
// desc   => add product to order.
const addProductToOrder = asyncWrapper(
  async (req: Request, res: Response): Promise<void | Response> => {
    const oId = parseInt(req.params.id);
    const pId = req.body.p_id;
    const quantity = parseInt(req.body.quantity);

    // validating values before submitting.
    if (!pId || !quantity || quantity <= 0 || isNaN(oId)) {
      return res.status(400).json({ message: "Please provide missing details !" });
    }

    const data = await OPT.addProducts({
      order_id: oId,
      product_id: pId,
      quantity: quantity,
    });

    res.status(201).json(data);
  }
);

// method =>Return GET /user/account/ordered-products
// desc   =>  all Ordered products.
const getOrderedProducts = asyncWrapper(
  async (_req: Request, res: Response): Promise<void | Response> => {
    const data = await OPT.index();

    if (!data.length) {
      return res.status(404).json({ message: `No Data Were Found !` });
    }

    res.status(200).json({ data, opCount: data.length });
  }
);

// method =>Return GET /user/account/ordered-products/:id
// desc   =>  a specific row from ordered products.
const getOPsById = asyncWrapper(async (req: Request, res: Response): Promise<void | Response> => {
  const opId = parseInt(req.params.id);

  if (!opId || opId <= 0) {
    return res.status(400).json({ message: "Please enter a valid op id !" });
  }

  const data = await OPT.show({ op_id: opId });
  if (!data) {
    return res.status(404).json({
      message: "Request failed !",
      data: `No products related to this id (${opId}) !`,
    });
  }

  res.status(200).json(data);
});

// method => PUT /user/account/ordered-products
// desc   => Update a specific Order .
const updateOrderedProduct = asyncWrapper(
  async (req: Request, res: Response): Promise<void | Response> => {
    const pId = req.body.p_id;
    const quantity = parseInt(req.body.quantity);

    if (!pId || quantity <= 0 || !quantity) {
      return res.status(400).json({ message: "Please provide correct details before updating !" });
    }

    const data = await OPT.update({ product_id: pId, quantity: quantity });
    if (!data) {
      return res.status(404).json({
        message: "Update failed !",
        data: `Product with id (${pId}) doesn't exist`,
      });
    }

    res.status(200).json(data);
  }
);

// method => DELETE /user/account/ordered-products/:id
// desc   => Delete a specific Order.
const delOrderedProduct = asyncWrapper(
  async (req: Request, res: Response): Promise<void | Response> => {
    const opId = parseInt(req.params.id);

    if (!opId || opId <= 0) {
      return res.status(400).json({ message: "Please enter a valid op id !" });
    }

    const data = await OPT.delete({ op_id: opId });
    if (!data) {
      return res.status(404).json({
        message: "Delete failed !",
        data: `Order with id (${opId}) doesn't exist`,
      });
    }

    res.status(200).json(data);
  }
);

export {
  addProductToOrder,
  getOrderedProducts,
  getOPsById,
  updateOrderedProduct,
  delOrderedProduct,
};
