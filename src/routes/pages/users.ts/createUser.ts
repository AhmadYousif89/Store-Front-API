import { Router, Request, Response } from "express";
import { userStore } from "../../../models/users";

// method => POST /create
// desc   => Create new user data.
export const createUser = Router().post(
  "/users/create/:name/:pw",
  async (req: Request, res: Response): Promise<void> => {
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
      res.status(201).json(data);
    } catch (err) {
      res.status(400).json({ msg: "Can't create user !" });
      console.error(err);
    }
  }
);
