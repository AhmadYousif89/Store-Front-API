import { Request, Response } from "express";
import { Users } from "../../types/types";
import { OPT } from "../models/ordered_products";
import asyncWrapper from "../../middlewares/asyncWrapper";

// method => POST /user/account/orders/:oid/products/:pid
// desc   => add product to orders.
const addProducts = asyncWrapper(async (req: Request, res: Response): Promise<void | Response> => {
  const { _id } = req.user as Users;
  const pId = req.params.pid;
  const oId = req.params.oid;
  const quantity = parseInt(req.body.quantity);

  if (isNaN(quantity) || quantity <= 0) {
    return res.status(400).json({ message: "quantity not provided" });
  }

  const op = await OPT.addProducts(
    {
      order_id: oId,
      product_id: pId,
      quantity: quantity,
    },
    _id as string
  );

  res.status(201).json(op);
});

// method => GET /users/ordered-products
// desc   => All Ordered products.
const getAll = asyncWrapper(async (_req: Request, res: Response): Promise<void | Response> => {
  const op = await OPT.index();

  if (!op.length) {
    return res.status(404).json({ message: `no orders being processed currently` });
  }

  res.status(200).json(op);
});

// method => GET /users/ordered-products/:id
// desc   => A specific row from ordered products.
const getOneById = asyncWrapper(async (req: Request, res: Response): Promise<void | Response> => {
  const opId = req.params.id;

  if (!opId) {
    return res.status(400).json({ message: "invalid ordered product id" });
  }

  const op = await OPT.show({ _id: opId });
  if (!op) {
    return res.status(404).json({ message: `no orders being processed with id number (${opId})` });
  }

  res.status(200).json(op);
});

// method => GET /user/account/ordered-products
// desc   => Return a list of all ordered products for a user.
const getUserOrderedProducts = asyncWrapper(
  async (req: Request, res: Response): Promise<void | Response> => {
    const { _id } = req.user as Users;

    const data = await OPT.getUserOrderedProducts(_id as string);
    if (!data) {
      return res.status(404).json({ message: "no current orders being processed" });
    }

    res.status(200).json(data);
  }
);

// method => GET /user/account/orders/:id/ordered-products
// desc   => Return specific ordered products for a user by order id.
const getUserOrderedProductsByid = asyncWrapper(
  async (req: Request, res: Response): Promise<void | Response> => {
    const { _id } = req.user as Users;
    const oid = req.params.id;

    const data = await OPT.getUserOrderedProductsByid(_id as string, oid);
    if (!data) {
      return res.status(404).json({
        message: `no current orders being processed`,
      });
    }

    res.status(200).json(data);
  }
);

// method => PUT /user/account/orders/:oid/products/:pid
// desc   => Update a specific Order.
const updateUserOrderedProduct = asyncWrapper(
  async (req: Request, res: Response): Promise<void | Response> => {
    const { _id } = req.user as Users;
    const pId = req.params.pid;
    const oId = req.params.oid;
    const quantity = parseInt(req.body.quantity);

    if (isNaN(quantity) || quantity < 0) {
      return res.status(400).json({ message: "quantity not provided" });
    }

    const op = await OPT.updateUserOrderedProduct(
      { order_id: oId, product_id: pId, quantity: quantity },
      _id as string
    );
    if (!op) {
      return res.status(404).json({ message: `order not found` });
    }

    res.status(200).json({ message: "update success", ...op });
  }
);

// method => DELETE /user/account/ordered-products/:id
// desc   => Delete a specific Order.
const delUserOrderedProduct = asyncWrapper(
  async (req: Request, res: Response): Promise<void | Response> => {
    const { _id } = req.user as Users;
    const oId = req.params.id;

    const op = await OPT.delUserOrderedProduct({ order_id: oId }, _id as string);
    if (!op) {
      return res.status(404).json({ message: `order not found` });
    }

    res.status(200).json({ message: "delete success", ...op });
  }
);

export {
  getAll,
  getOneById,
  addProducts,
  getUserOrderedProducts,
  getUserOrderedProductsByid,
  updateUserOrderedProduct,
  delUserOrderedProduct,
};
