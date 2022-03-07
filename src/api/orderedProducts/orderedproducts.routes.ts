import { Router, Request, Response, NextFunction } from "express";
import { OPT } from "./orderedProducts";
import { Error } from "../../utils/control";

let error;
// method => POST /user/account/orders/:id/products
// desc   => add product to order.
const addProductToOrder = Router().post(
  "/user/account/orders/:id/products",
  async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    const oId = parseInt(req.params.id);
    const pId = req.body.p_id;
    const quantity = parseInt(req.body.quantity);
    console.log(
      `params:
      ${oId}
      ${pId} 
      ${quantity}`
    );
    // validating values before submitting.
    if (!pId || !quantity || quantity <= 0) {
      res
        .status(400)
        .json({ status: "Error", message: "Please provide correct details before submiting !" });
      return;
    }
    try {
      const data = await OPT.addProducts({
        order_id: oId,
        product_id: pId,
        quantity: quantity,
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

// method => GET /user/account/ordered-products
// desc   => Return all Ordered products.
const getOrderedProducts = Router().get(
  "/user/account/ordered-products",
  async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await OPT.index();
      if (data.length === 0) {
        res.status(404).json({ msg: `No Data Were Found !` });
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

// method => GET /user/account/ordered-products/:id
// desc   => Return a specific row from ordered products.
const getRowByOPid = Router().get(
  "/user/account/ordered-products/:id",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const opId = parseInt(req.params.id);
    console.log("data: \n", opId);
    if (!opId || opId <= 0) {
      res.status(400).json({ status: "Error", message: "Please enter a valid op id !" });
      return;
    }
    try {
      const data = await OPT.show(opId);
      if (!data) {
        res
          .status(404)
          .json({ msg: "Request failed !", data: `No products related to this id (${opId}) !` });
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

// method => PUT /user/account/ordered-products
// desc   => Update a specific Order .
const updateOrderedProduct = Router().put(
  "/user/account/ordered-products",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const pId = req.body.p_id;
    const quantity = parseInt(req.body.quantity);
    console.log(
      `data:
      ${pId} 
      ${quantity}`
    );
    if (!pId || quantity <= 0 || !quantity) {
      res
        .status(400)
        .json({ status: "Error", message: "Please provide correct details before updating !" });
      return;
    }
    try {
      const data = await OPT.update(pId, quantity);
      if (!data) {
        res.status(404).json({
          msg: "Update failed !",
          data: `Product with id (${pId}) doesn't exist`,
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

// method => DELETE /user/account/ordered-products/:id
// desc   => Delete a specific Order.
const delOrderedProduct = Router().delete(
  "/user/account/ordered-products/:id",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const opId = parseInt(req.params.id);
    console.log("data: \n", opId);
    if (!opId || opId <= 0) {
      res.status(400).json({ status: "Error", message: "Please enter a valid op id !" });
      return;
    }
    try {
      const data = await OPT.delete(opId);
      if (!data) {
        res.status(404).json({
          msg: "Delete failed !",
          data: `Order with id (${opId}) doesn't exist`,
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

export default {
  addProductToOrder,
  getOrderedProducts,
  getRowByOPid,
  updateOrderedProduct,
  delOrderedProduct,
};
