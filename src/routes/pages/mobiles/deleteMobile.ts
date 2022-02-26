import { Router, Request, Response } from "express";
import { mobileStore } from "../../../models/mobile";

// method => DELETE /delete/:id
// desc   => Delete a specific mobile.
export const deleteMobile = Router().delete(
  "/products/mobiles/delete/:id",
  async (req: Request, res: Response): Promise<void> => {
    const mob_uid = req.params.id;
    try {
      console.log("params: \n", mob_uid);
      const data = await mobileStore.delMob(mob_uid);
      res.status(200).json(data);
    } catch (err) {
      res.status(404).json(err);
      console.error(err);
    }
  }
);
