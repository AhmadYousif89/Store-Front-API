import { Router, Request, Response, NextFunction } from "express";
import { mobileStore } from "../../../models/mobile";

// method => PUT /edit/:id
// desc   => Update a specific mobile .
export const updateMobile = Router().put(
  "/products/mobiles/update/:id/:price",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const mob_uid = req.params.id;
    const price = req.params.price as unknown as number;
    console.log(
      `params: 
      ${mob_uid} 
      ${price}`
    );
    try {
      const data = await mobileStore.updateMob(mob_uid, price);
      if (!data) {
        res.status(404).json(data);
      }
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
);
