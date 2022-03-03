import { Response, Request, NextFunction } from "express";
import { Error } from "../../utils/control";

const errorHandler = (error: Error, _req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || "Oops, Something went wrong !";
  res.status(status).json({ message });
};

export default errorHandler;
