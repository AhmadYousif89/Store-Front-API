import { Request, Response } from "express";
import asyncWrapper from "../../middlewares/asyncWrapper";
import { dashBoard } from "./dashboard";

// method => GET /users/:uId/account/review/ordered-products
// desc   => Return a list of all ordered products for a user.
const getUserProducts = asyncWrapper(
  async (req: Request, res: Response): Promise<void | Response> => {
    const uid = req.params.id;

    const data = await dashBoard.getUserProducts(uid);
    if (!data) {
      return res.status(404).json({
        message: "Request failed !",
        data: `User with id (${uid}) doesn't have products`,
      });
    }

    res.status(200).json({ message: `Data generated successfully for user id (${uid})`, data });
  }
);

// method => GET /users/:uId/orders/:oId/account/review/ordered-products
// desc   => Return specific ordered products for a user by order id.
const getUserProductsByOid = asyncWrapper(
  async (req: Request, res: Response): Promise<void | Response> => {
    const uid = req.params.uid;
    const oid = parseInt(req.params.oid);

    if (!oid || oid <= 0) {
      return res.status(400).json({
        message: "Please enter a valid order id !",
      });
    }

    const data = await dashBoard.getUserProductsByOid(uid, oid);
    if (!data) {
      return res.status(404).json({
        message: "Request failed !",
        data: `User with id (${uid}) doesn't have products related to order number (${oid})`,
      });
    }

    res.status(200).json({
      message: `Data generated successfully from order number (${oid}) for user id (${uid})`,
      data,
    });
  }
);

// method => GET /users/:id/account/most-recent/purchases
// desc   => Return a list of all purchases a user made sorted by most recent.
const getUserMostPurchases = asyncWrapper(
  async (req: Request, res: Response): Promise<void | Response> => {
    const uid = req.params.id;

    const data = await dashBoard.getUserMostPurchases(uid);
    if (!data) {
      return res.status(404).json({
        message: "Request failed !",
        data: `User with id (${uid}) doesn't have purchases`,
      });
    }

    res.status(200).json({ message: `Data generated successfully for user id (${uid})`, data });
  }
);

export { getUserProducts, getUserProductsByOid, getUserMostPurchases };
