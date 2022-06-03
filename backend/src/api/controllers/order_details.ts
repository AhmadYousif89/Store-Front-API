import { Request, Response } from "express";
import { Users } from "../../types/types";
import { OrderDetails } from "../models/order_details";
import asyncWrapper from "../../middlewares/asyncWrapper";

// method => GET /users/order-details
// desc   => All Ordered products.
const getAll = asyncWrapper(async (_req: Request, res: Response): Promise<void | Response> => {
  const op = await OrderDetails.index();

  if (!op.length) {
    return res.status(404).json({ message: `no orders being processed currently` });
  }

  res.status(200).json(op);
});

// method => GET /users/order-details/:id
// desc   => A specific row from ordered products.
const getOneById = asyncWrapper(async (req: Request, res: Response): Promise<void | Response> => {
  const opId = req.params.id;

  if (!opId) {
    return res.status(400).json({ message: "invalid ordered product id" });
  }

  const op = await OrderDetails.show({ _id: opId });
  if (!op) {
    return res.status(404).json({ message: `no orders being processed with id number (${opId})` });
  }

  res.status(200).json(op);
});

// method => GET /user/account/order-details
// desc   => Return a list of all ordered products for a user.
const getUserOrderDetails = asyncWrapper(
  async (req: Request, res: Response): Promise<void | Response> => {
    const { _id } = req.user as Users;

    const data = await OrderDetails.getUserOrderDetails({ _id });
    if (!data) {
      return res.status(404).json({ message: "no current orders being processed" });
    }

    res.status(200).json(data);
  }
);

// method => GET /user/account/orders/:id/order-details
// desc   => Return specific ordered products for a user by order id.
const getUserOrderDetailsByid = asyncWrapper(
  async (req: Request, res: Response): Promise<void | Response> => {
    const { _id } = req.user as Users;
    const oid = req.params.id;

    const data = await OrderDetails.getUserOrderDetailsByid(_id as string, oid);
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
const updateUserOrderDetails = asyncWrapper(
  async (req: Request, res: Response): Promise<void | Response> => {
    const { _id } = req.user as Users;
    const oId = req.params.oid;
    const quantity = parseInt(req.body.quantity);

    if (isNaN(quantity) || quantity < 0) {
      return res.status(400).json({ message: "quantity not provided" });
    }

    const op = await OrderDetails.updateUserOrderDetails(
      { _id: oId, order_info: {} },
      _id as string
    );
    if (!op) {
      return res.status(404).json({ message: `order not found` });
    }

    res.status(200).json({ message: "update success", ...op });
  }
);

// method => DELETE /user/account/order-details/:id
// desc   => Delete a specific Order.
const delUserOrderDetails = asyncWrapper(
  async (req: Request, res: Response): Promise<void | Response> => {
    const { _id } = req.user as Users;
    const cId = req.params.id;

    const op = await OrderDetails.delUserOrderDetails({ customerId: cId }, _id as string);
    if (!op) {
      return res.status(404).json({ message: `order not found` });
    }

    res.status(200).json({ message: "delete success", ...op });
  }
);

export {
  getAll,
  getOneById,
  getUserOrderDetails,
  getUserOrderDetailsByid,
  updateUserOrderDetails,
  delUserOrderDetails,
};
