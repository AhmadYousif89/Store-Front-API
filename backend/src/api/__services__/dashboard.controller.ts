import { Request, Response } from "express";
import asyncWrapper from "../../middlewares/asyncWrapper";
import { Users } from "../../types/types";
import { dashBoard } from "./dashboard";

// method => GET /user/account/purchases
// desc   => Return a list of all purchases a user made sorted by most recent.
const getUserPurchases = asyncWrapper(
  async (req: Request, res: Response): Promise<void | Response> => {
    const { _id } = req.user as Users;

    const data = await dashBoard.getUserPurchases(_id as string);
    if (!data) {
      return res.status(404).json({
        message: `user doesn't have purchases`,
      });
    }

    res.status(200).json(data);
  }
);

export { getUserPurchases };
