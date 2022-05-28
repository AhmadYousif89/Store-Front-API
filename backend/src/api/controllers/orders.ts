import { Request, Response } from "express";
import { orderModel } from "../models/orders";
import asyncWrapper from "../../middlewares/asyncWrapper";
import { Users } from "../../types/types";

// method => POST /user/account/orders
// desc   => Create new Order data.
const createOrder = asyncWrapper(async (req: Request, res: Response): Promise<void | Response> => {
  const { _id } = req.user as Users;

  const order = await orderModel.create({ user_id: _id });

  res.status(201).json(order);
});

// method => GET /users/orders
// desc   => All Orders data.
const getOrders = asyncWrapper(async (_req: Request, res: Response): Promise<void | Response> => {
  const orders = await orderModel.index();

  if (!orders.length) {
    return res.status(404).json({ message: `no orders were found` });
  }

  res.status(200).json(orders);
});

// method => GET /users/orders/:id
// desc   => Return a specific Order.
const getOneOrder = asyncWrapper(async (req: Request, res: Response): Promise<void | Response> => {
  const oid = req.params.id;

  if (!oid) {
    return res.status(400).json({ message: "order id not valid" });
  }

  const order = await orderModel.show({ _id: oid });
  if (!order) {
    return res.status(404).json({ message: "order not found" });
  }

  res.status(200).json(order);
});

// method => GET /user/me/account/orders
// desc   => All Orders data.
const getUserOrders = asyncWrapper(
  async (req: Request, res: Response): Promise<void | Response> => {
    const { _id } = req.user as Users;

    const orders = await orderModel.getUserOrders({ user_id: _id });
    if (!orders.length) {
      return res.status(404).json({ message: `user doesn't have any orders` });
    }

    res.status(200).json(orders);
  }
);

// method => PUT /user/me/account/orders
// desc   => Update a specific Order.
const updateUserOrders = asyncWrapper(
  async (req: Request, res: Response): Promise<void | Response> => {
    const { _id } = req.user as Users;

    const oid = req.params.id;
    if (!oid) {
      return res.status(400).json({ message: "invalid order id" });
    }

    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: "order status not provided" });
    }

    const order = await orderModel.updateUserOrders({
      user_id: _id,
      _id: oid,
      order_status: status,
    });
    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }

    res.status(200).json({ message: "update success", ...order });
  }
);

// method => DELETE /user/me/account/orders
// desc   => Delete a specific Order.
const deleteUserOrders = asyncWrapper(
  async (req: Request, res: Response): Promise<void | Response> => {
    const { _id } = req.user as Users;
    const oid = req.params.id;

    if (!oid) {
      return res.status(400).json({ message: "invalid order id" });
    }
    const order = await orderModel.deleteUserOrders({ user_id: _id, _id: oid });
    if (!order) {
      return res.status(404).json({ message: `order not found` });
    }

    res.status(200).json({ message: "delete success", ...order });
  }
);

const deleteAllOrders = asyncWrapper(
  async (req: Request, res: Response): Promise<void | Response> => {
    const { _id } = req.user as Users;
    const orders = await orderModel.deleteAllOrders({ user_id: _id });
    if (!orders.length) {
      return res.status(404).json({ message: `no orders were found` });
    }
    res.status(200).json({ message: "delete success", orders });
  }
);

export {
  getOrders,
  getOneOrder,
  createOrder,
  getUserOrders,
  updateUserOrders,
  deleteUserOrders,
  deleteAllOrders,
};
