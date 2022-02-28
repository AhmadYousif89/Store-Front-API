import { Router, Request, Response, NextFunction } from "express";
import { mobileStore } from "../../../models/mobile";

// method => GET
// desc   => Return all mobile data.
export const getMobiles = Router().get(
  "/products/mobiles",
  async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await mobileStore.getAllMobs();
      if (data.length === 0) {
        res.status(404).json({ msg: `No Mobiles Were Found !` });
        return;
      }
      res.status(200).json({ msg: "data generated successfuly", data });
    } catch (err) {
      next(err);
    }
  }
);
