import { Router, Request, Response } from "express";
import { userStore } from "./../../../models/users";
// import { uuid } from "../../../utils/control";

// method => POST /create
// desc   => Create new user data.
export const createUser = Router().post(
  "/users/create/:name/:pw",
  async (req: Request, res: Response): Promise<void> => {
    const params = {
      u_name: req.params.name,
      u_password: req.params.pw,
    };
    try {
      const data = await userStore.createUser(params);
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
