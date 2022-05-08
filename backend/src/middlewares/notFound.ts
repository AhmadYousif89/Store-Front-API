import { Request, Response } from "express";

const notFound = (_req: Request, res: Response) => {
  res.status(404).send("<h3>404</h3>This page doesn't exist !");
};

export default notFound;
