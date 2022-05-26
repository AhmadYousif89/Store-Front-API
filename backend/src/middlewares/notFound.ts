import { Request, Response } from "express";

const notFound = (_req: Request, res: Response) => {
  res.status(404).send("<h1>404</h1><h3>Resource Not Found !</h3>");
};

export default notFound;
