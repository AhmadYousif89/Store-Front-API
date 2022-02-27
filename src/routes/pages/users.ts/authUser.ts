import { Router, Request, Response } from "express";
import { validateUser } from "../../../models/authentication";

// method => GET /auth
// desc   => Authenticate user data.
export const authUser = Router().get(
  "/auth/:name/:pw",
  async (req: Request, res: Response): Promise<void> => {
    const u_name = req.params.name;
    const u_password = req.params.pw;
    console.log(
      `params:
      ${u_name}
      ${u_password}`
    );
    try {
      const data = await validateUser(u_name, u_password);
      res.status(200).json(data);
    } catch (err) {
      res.status(404).json({ msg: "Data Not Found !" });
      console.error(err);
    }
  }
);
