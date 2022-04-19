import { Request, Response, NextFunction } from "express";
import { orderModel } from "../models/orders";
import { Error } from "../../utils/control";

let error;
// method => POST /user/account/orders
// desc   => Create new Order data.
const createOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const userId = req.body.userId;

  if (!userId) {
    return res.status(400).json({ message: "user id not found !" });
  }
  try {
    const data = await orderModel.create({
      user_id: userId,
    });
    res.status(201).json({
      message: `Order created successfully`,
      data,
    });
  } catch (err) {
    error = {
      message: `${(err as Error).message}`,
    };
    next(error);
  }
};

// method => GET /user/account/orders
// desc   => Return all Orders data.
const getOrders = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const data = await orderModel.index();
    if (!data.length) {
      return res.status(404).json({ message: `No Orders Were Found !` });
    }
    res.status(200).json({
      message: `orders generated successfully`,
      data,
    });
  } catch (err) {
    error = {
      message: `${(err as Error).message}`,
    };
    next(error);
  }
};

// method => GET /user/account/orders/:id
// desc   => Return a specific Order.
const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const oid = parseInt(req.params.id);

  if (!oid || oid <= 0) {
    return res.status(400).json({ message: "order id not valid !" });
  }
  try {
    const data = await orderModel.show({ order_id: oid });
    if (!data) {
      return res
        .status(404)
        .json({ message: "Request failed !", data: `Order with id (${oid}) doesn't Exist !` });
    }
    res.status(200).json({
      message: `Order generated successfully`,
      data,
    });
  } catch (err) {
    error = {
      message: `${(err as Error).message}`,
    };
    next(error);
  }
};

// method => PUT /user/account/orders
// desc   => Update a specific Order .
const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const oid = parseInt(req.body.oid);
  const status = req.body.status;

  if (!oid || oid <= 0 || !status) {
    return res.status(400).json({ message: "order status and order id are required !" });
  }
  try {
    const data = await orderModel.update({ order_id: oid, order_status: status });
    if (!data) {
      return res.status(404).json({
        message: "Update failed !",
        data: `Order with id (${oid}) doesn't exist`,
      });
    }
    res.status(200).json({
      message: `Order updated successfully`,
      data,
    });
  } catch (err) {
    error = {
      message: `${(err as Error).message}`,
    };
    next(error);
  }
};

// method => DELETE /user/account/order/:id
// desc   => Delete a specific Order.
const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const oid = parseInt(req.params.id);

  if (!oid || oid <= 0) {
    return res.status(400).json({ message: "Please enter a valid order id !" });
  }
  try {
    const data = await orderModel.delete({ order_id: oid });
    if (!data) {
      return res.status(404).json({
        message: "Delete failed !",
        data: `Order with id (${oid}) doesn't exist`,
      });
    }
    res.status(200).json({
      message: `Order deleted successfully`,
      data,
    });
  } catch (err) {
    error = {
      message: `${(err as Error).message}`,
    };
    next(error);
  }
};

// method => GET /user/:id/account/orders
// desc   => Return all Orders data.
const getUserOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const uid = req.params.id;
  try {
    const data = await orderModel.getUserOrders({ user_id: uid });
    if (!data.length) {
      return res.status(404).json({ message: `No orders found` });
    }
    res.status(200).json({
      message: `orders generated successfully`,
      data,
    });
  } catch (err) {
    error = {
      message: `${(err as Error).message}`,
    };
    next(error);
  }
};

export { createOrders, getOrders, getOrderById, updateOrder, deleteOrder, getUserOrders };
