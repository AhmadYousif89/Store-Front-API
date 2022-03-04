import { Router, Request, Response, NextFunction } from "express";
import { ordersModel } from "../../../models/orders";
import { Error } from "../../../utils/control";

let error: Error;
// method => POST /user/cart/orders
// desc   => Create new Order data.
const createOrders = Router().post(
  "/user/cart/orders",
  async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    const { userId } = req.body;
    const status = req.body.status.toLowerCase();
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

// method => GET /user/cart/orders
// desc   => Return all Orders data.
const getOrders = Router().get(
  "/user/cart/orders",
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

// method => GET /user/cart/orders/id
// desc   => Return a specific Order.
const getOrderById = Router().get(
  "/user/cart/orders/:id",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id = req.params.id;
    console.log("data: \n", id);
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

// method => PUT /user/cart/orders
// desc   => Update a specific Order .
const updateOrder = Router().put(
  "/user/cart/orders",
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

// method => DELETE /user/cart/order/id
// desc   => Delete a specific Order.
const deleteOrder = Router().delete(
  "/user/cart/order/id",
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

// method => POST /user/cart/orders/:id/products
// desc   => Add new product to user orders.
const addProductOrder = Router().post(
  "/user/cart/order/:id/products",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const oId = req.params.id;
    const pId = req.body.product_id;
    const quantity = Number.parseInt(req.body.quantity);
    console.log(`
    data:
    ${oId} ${pId} ${quantity}
    `);
    if (!pId || !quantity || quantity <= 0) {
      res
        .status(400)
        .json({ status: "Error", message: "Please provide product id and valid quantity !" });
      return;
    }
    try {
      const data = await ordersModel.addProductOrder({
        order_id: oId,
        product_id: pId,
        quantity: quantity,
      });
      if (!data) {
        res.status(404).json({
          msg: "Request failed !",
          data: `Order with id (${oId}) doesn't exist`,
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

export default { createOrders, getOrders, getOrderById, updateOrder, deleteOrder, addProductOrder };
