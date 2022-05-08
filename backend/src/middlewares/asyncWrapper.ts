import { Response, Request, NextFunction } from "express";
import { Error } from "../utils/control";

const asyncWrapper = (func: (req: Request, res: Response, next: NextFunction) => void) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next);
    } catch (err) {
      const error = {
        message: `${(err as Error).message}`,
      };
      next(error);
    }
  };
};

export default asyncWrapper;
