import { Router, Request, Response, NextFunction } from "express";
import { ordersModel } from "../../../models/orders";
import { Error } from "../../../utils/control";

let error: Error;
// method => POST /user/account/orders
// desc   => Create new Order data.
const createOrders = Router().post(
  "/user/account/orders",
  async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    const { userId, status } = req.body;
    console.log(
      `params:
      ${userId} ${status}`
    );
    // validating values before submitting.
    if (!userId || !status) {
      res
        .status(400)
        .json({ status: "Error", message: "Please provide correct details before submiting !" });
      return;
    }
    try {
      const data = await ordersModel.createOrder({
        order_status: status,
        user_id: userId,
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

// method => GET /user/account/orders
// desc   => Return all Orders data.
const getOrders = Router().get(
  "/user/account/orders",
  async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await ordersModel.getAllOrders();
      if (data.length === 0) {
        res.status(404).json({ msg: `No Orders Were Found !` });
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

// method => GET /user/account/order/id
// desc   => Return a specific Order.
const getOrderById = Router().get(
  "/user/account/order/id",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.body;
    console.log("data: \n", id);
    if (!id) {
      res.status(400).json({ status: "Error", message: "Please provide order id !" });
      return;
    }
    try {
      const data = await ordersModel.getOrderById(id);
      if (!data) {
        res
          .status(404)
          .json({ msg: "Request failed !", data: `Order with id (${id}) doesn't Exist !` });
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

// method => PUT /user/account/orders
// desc   => Update a specific Order .
const updateOrder = Router().put(
  "/user/account/orders",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id, status } = req.body;
    console.log(
      `data: 
      ${id} 
      ${status}`
    );
    if (!id || !status) {
      res.status(400).json({ status: "Error", message: "Please provide order status and id !" });
      return;
    }
    try {
      const data = await ordersModel.updateOrder(id, status);
      if (!data) {
        res.status(404).json({
          msg: "Update failed !",
          data: `Order with id (${id}) doesn't exist`,
        });
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

// method => DELETE /user/account/order/id
// desc   => Delete a specific Order.
const deleteOrder = Router().delete(
  "/user/account/order/id",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.body;
    console.log("data: \n", id);
    if (!id) {
      res.status(400).json({ status: "Error", message: "Please provide order id !" });
      return;
    }
    try {
      const data = await ordersModel.delOrder(id);
      if (!data) {
        res.status(404).json({
          msg: "Delete failed !",
          data: `Order with id (${id}) doesn't exist`,
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

export default { createOrders, getOrders, getOrderById, updateOrder, deleteOrder };
