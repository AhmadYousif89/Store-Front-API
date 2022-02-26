import { Router, Request, Response } from "express";
import { mobileStore } from "../../../models/mobile";

// method => GET
// desc   => Return all mobile data.
export const getMobiles = Router().get(
  "/products/mobiles",
  async (_req: Request, res: Response): Promise<void> => {
    try {
      const data = await mobileStore.getAllMobs();
      res.status(200).json(data);
    } catch (err) {
      res.status(404).json(err);
      console.error(err);
    }
  }
);
