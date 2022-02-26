import { Router, Request, Response } from "express";

export const products = Router().get("/products", (_req: Request, res: Response): void => {
  try {
    res.send(`<h2>Products Page ...</h2>`);
  } catch (err) {
    res.status(400);
    res.json({ msg: `Error \n${err}` });
  }
});
