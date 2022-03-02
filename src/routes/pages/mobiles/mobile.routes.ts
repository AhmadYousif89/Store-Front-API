import { Router, Request, Response, NextFunction } from "express";
import { mobileModel } from "../../../models/mobile";
import { Error } from "../../../utils/control";

let error: Error;
// method => POST /products/mobiles
// desc   => Create new mobile data.
const createMobile = Router().post(
  "/products/mobiles/",
  async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    const { brand, model, maker, coo } = req.body;
    const price = Number.parseInt(req.body.price);
    console.log(
      `params:
      ${brand} ${model} ${price} ${maker} ${coo}`
    );
    // validating values before submitting.
    if (!brand || !model || !price || price <= 0 || !maker || !coo) {
      res
        .status(400)
        .json({ status: "Error", message: "Please provide correct details before submiting !" });
      return;
    }
    try {
      const data = await mobileModel.createMob({
        brand_name: brand,
        model_name: model,
        manufacturer: maker,
        price: price,
        made_in: coo,
      });
      res.status(201).json(data);
    } catch (err) {
      error = {
        message: `Request Failed ! ${(err as Error).message}`,
      };
      next(error);
    }
  }
);

// method => GET /products/mobiles
// desc   => Return all mobile data.
const getMobiles = Router().get(
  "/products/mobiles/",
  async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await mobileModel.getAllMobs();
      if (data.length === 0) {
        res.status(404).json({ msg: `No Mobiles Were Found !` });
        return;
      }
      res.status(200).json({ msg: "Data generated successfully", data });
    } catch (err) {
      error = {
        message: `Request Failed ! ${(err as Error).message}`,
      };
      next(error);
    }
  }
);

// method => GET /products/mobiles/id
// desc   => Return a specific mobile.
const getMobById = Router().get(
  "/products/mobiles/id/",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.body;
    console.log("data: \n", id);
    if (!id) {
      res.status(400).json({ status: "Error", message: "Please provide mobile id !" });
      return;
    }
    try {
      const data = await mobileModel.getMobById(id);
      if (!data) {
        res
          .status(404)
          .json({ msg: "Request failed !", data: `Mobile with id (${id}) Doesn't Exist !` });
        return;
      }
      res.status(200).json(data);
    } catch (err) {
      error = {
        message: `Request Failed ! ${(err as Error).message}`,
      };
      next(error);
    }
  }
);

// method => PUT /products/mobiles
// desc   => Update a specific mobile .
const updateMobile = Router().put(
  "/products/mobiles/",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.body;
    const price = Number.parseInt(req.body.price);
    console.log(
      `data: 
      ${id} 
      ${price}`
    );
    if (!id || !price || price <= 0) {
      res
        .status(400)
        .json({ status: "Error", message: "Please provide mobile id and new price !" });
      return;
    }
    try {
      const data = await mobileModel.updateMob(id, price);
      if (!data) {
        res.status(404).json({
          msg: "Update failed !",
          data: `Mobile with id (${id}) doesn't exist`,
        });
      }
      res.status(200).json(data);
    } catch (err) {
      error = {
        message: `Request Failed ! ${(err as Error).message}`,
      };
      next(error);
    }
  }
);

// method => DELETE /products/mobiles/id
// desc   => Delete a specific mobile.
const deleteMobile = Router().delete(
  "/products/mobiles/id/",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.body;
    console.log("data: \n", id);
    if (!id) {
      res.status(400).json({ status: "Error", message: "Please provide mobile id !" });
      return;
    }
    try {
      const data = await mobileModel.delMob(id);
      if (!data) {
        res.status(404).json({
          msg: "Delete failed !",
          data: `Mobile with id (${id}) doesn't exist`,
        });
      }
      res.status(200).json(data);
    } catch (err) {
      error = {
        message: `Request Failed ! ${(err as Error).message}`,
      };
      next(error);
    }
  }
);

export default { createMobile, getMobiles, getMobById, updateMobile, deleteMobile };
