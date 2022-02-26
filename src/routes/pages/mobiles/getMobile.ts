import { Router, Request, Response } from "express";
import { mobileStore } from "../../../models/mobile";

// method => GET /:id
// desc   => Return a specific mobile.
export const getMobById = Router().get(
  "/products/mobiles/:id",
  async (req: Request, res: Response) => {
    const mob_uid = req.params.id;
    try {
      console.log("params: ", mob_uid);
      const data = await mobileStore.getMobById(mob_uid);
      res.status(200).json(data);
    } catch (err) {
      res.status(404).json(err);
      console.error(err);
    }
  }
);
