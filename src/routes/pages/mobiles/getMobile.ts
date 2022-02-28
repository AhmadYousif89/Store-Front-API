import { Router, Request, Response, NextFunction } from "express";
import { mobileStore } from "../../../models/mobile";

// method => GET /:id
// desc   => Return a specific mobile.
export const getMobById = Router().get(
  "/products/mobiles/:id",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const mob_uid = req.params.id;
    console.log("params: ", mob_uid);
    try {
      const data = await mobileStore.getMobById(mob_uid);
      if (!data) {
        res.status(404).json({ msg: `Mobile with ID ${mob_uid} Doesn't Exist !` });
        return;
      }
      res.status(200).json({ msg: "mobile generated successfuly", data });
    } catch (err) {
      next(err);
    }
  }
);
