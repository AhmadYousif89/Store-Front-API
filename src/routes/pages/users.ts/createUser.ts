import { Router, Request, Response, NextFunction } from "express";
import { userStore } from "../../../models/users";

// method => POST /create
// desc   => Create new user data.
export const createUser = Router().post(
  "/users/create/:name/:pw",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const params = {
      u_name: req.params.name,
      u_password: req.params.pw,
    };
    console.log(
      `params:
      ${params.u_name}
      ${params.u_password}`
    );
    try {
      const data = await userStore.createUser(params);
      if (!data) {
        res.status(404).json(data);
      }
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }
);
