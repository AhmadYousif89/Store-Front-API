import { Router, Request, Response } from "express";
import { userStore } from "../../models/users";

// method => GET /create
// desc   => Authenticate user data.
export const createUser = Router().get(
  "/auth/:",
  async (req: Request, res: Response): Promise<void> => {
    const params = {
      u_name: req.params.name,
      u_password: req.params.pw,
    };
    try {
      const data = await userStore.validateUser(params.u_name, params.u_password);
      console.log(
        `params:
        ${params.u_name}
        ${params.u_password}`
      );
      res.status(201).json(data);
    } catch (err) {
      res.status(400).send(err);
      console.error(err);
    }
  }
);
