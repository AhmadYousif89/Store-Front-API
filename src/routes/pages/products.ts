import { Router, Request, Response } from "express";

export const products = Router().get("/products", (_req: Request, res: Response): void => {
  try {
    res.status(200).send(`<h2>Products Page ...</h2>`);
  } catch (err) {
    res.status(400).json({ msg: `Error \n${err}` });
  }
});
