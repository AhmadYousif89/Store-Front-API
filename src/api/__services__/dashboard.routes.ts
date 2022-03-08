import { Router, Request, Response, NextFunction } from "express";
import Authentication from "../../middlewares/auth.middleware";
import { dashBoard } from "./dashboard";

let error;
// method => GET /users/:uId/account/review/ordered-products
// desc   => Return a list of all ordered products for a user.
const getUserProducts = Router().get(
  "/users/:id/account/review/ordered-products",
  Authentication,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const uid = req.params.id;
    console.log("data: \n", uid);
    try {
      const data = await dashBoard.getUserProducts(uid);
      if (!data) {
        res.status(404).json({
          msg: "Request failed !",
          data: `User with id (${uid}) doesn't have products`,
        });
        return;
      }
      res.status(200).json({ msg: `Data generated successfully for user id (${uid})`, data });
      return;
    } catch (err) {
      error = {
        message: `Request Failed ! ${(err as Error).message}`,
      };
      next(error);
    }
  }
);
// method => GET /users/:uId/orders/:oId/account/review/ordered-products
// desc   => Return specific ordered products for a user by order id.
const getUserProductsByOid = Router().get(
  "/users/:uid/orders/:oid/account/review/ordered-products",
  Authentication,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const uid = req.params.uid;
    const oid = parseInt(req.params.oid);
    console.log("data: \n", uid, oid);
    if (!oid || oid <= 0) {
      res.status(400).json({
        msg: "Please enter a valid order id !",
      });
      return;
    }
    try {
      const data = await dashBoard.getUserProductsByOid(uid, oid);
      if (!data) {
        res.status(404).json({
          msg: "Request failed !",
          data: `User with id (${uid}) doesn't have products related to order number (${oid})`,
        });
        return;
      }
      res.status(200).json({
        msg: `Data generated successfully from order number (${oid}) for user id (${uid})`,
        data,
      });
      return;
    } catch (err) {
      error = {
        message: `Request Failed ! ${(err as Error).message}`,
      };
      next(error);
    }
  }
);

// method => GET /users/:id/account/most-recent/purchases
// desc   => Return a list of all purchases a user made sorted by most recent.
const getUserMostPurchases = Router().get(
  "/users/:id/account/most-recent/purchases",
  Authentication,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const uid = req.params.id;
    console.log("data: \n", uid);
    try {
      const data = await dashBoard.getUserMostPurchases(uid);
      if (!data) {
        res.status(404).json({
          msg: "Request failed !",
          data: `User with id (${uid}) doesn't have purchases`,
        });
        return;
      }
      res.status(200).json({ msg: `Data generated successfully for user id (${uid})`, data });
      return;
    } catch (err) {
      error = {
        message: `Request Failed ! ${(err as Error).message}`,
      };
      next(error);
    }
  }
);

// method => GET /products/most/popular
// desc   => Return a most popular products.
const getProductByPopularity = Router().get(
  "/products/most/popular",
  async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await dashBoard.getProductByPopularity();
      if (data.length === 0) {
        res.status(404).json({ msg: `No Popular Products Were Found !` });
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

export default {
  getUserProducts,
  getUserProductsByOid,
  getUserMostPurchases,
  getProductByPopularity,
};
