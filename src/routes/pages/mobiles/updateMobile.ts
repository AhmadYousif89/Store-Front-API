import { Router, Request, Response } from "express";
import { mobileStore } from "../../../models/mobile";

// method => PUT /edit/:id
// desc   => Update a specific mobile .
export const updateMobile = Router().put(
  "/products/mobiles/update/:id/:price",
  async (req: Request, res: Response): Promise<void> => {
    const mob_uid = req.params.id;
    const price = req.params.price as unknown as number;
    console.log(
      `params: 
      ${mob_uid} 
      ${price}`
    );
    try {
      const data = await mobileStore.updateMob(mob_uid, price);
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json({ msg: "Can't update mobile !" });
      console.error(err);
    }
  }
);
