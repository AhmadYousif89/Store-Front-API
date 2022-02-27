import { Router, Request, Response } from "express";
import { mobileStore } from "../../../models/mobile";

// method => POST /create
// desc   => Create new mobile data.
export const createMobile = Router().post(
  "/products/mobiles/create/:brand/:model/:price/:maker/:com",
  async (req: Request, res: Response): Promise<void> => {
    const params = {
      brand_name: req.params.brand,
      model_name: req.params.model,
      price: req.params.price as unknown as number,
      manufacturer: req.params.maker,
      made_in: req.params.com,
    };
    console.log(
      `params:
      ${params.brand_name} ${params.model_name} ${params.price} ${params.manufacturer} ${params.made_in}`
    );
    try {
      const data = await mobileStore.createMob(params);
      res.status(201).json(data);
    } catch (err) {
      res.status(400).json({ msg: "Can't create mobile !" });
      console.error(err);
    }
  }
);
