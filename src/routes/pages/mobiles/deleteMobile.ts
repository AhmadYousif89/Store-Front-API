import { Router, Request, Response, NextFunction } from "express";
import { mobileStore } from "../../../models/mobile";

// method => DELETE /delete/:id
// desc   => Delete a specific mobile.
export const deleteMobile = Router().delete(
  "/products/mobiles/delete/:id",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const mob_uid = req.params.id;
    console.log("params: \n", mob_uid);
    if (!mob_uid) {
      return;
    }
    try {
      const data = await mobileStore.delMob(mob_uid);
      if (!data) {
        res.status(404).json({ msg: `Mobile with ID ${mob_uid} Doesn't Exist !` });
        return;
      }
      res.status(200).json({ msg: "mobile deleted successfuly", data });
    } catch (err) {
      next(err);
    }
  }
);
