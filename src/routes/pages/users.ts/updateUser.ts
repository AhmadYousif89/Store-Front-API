import { Router, Request, Response } from "express";
import { userStore } from "../../../models/users";

// method => PUT /edit/:id
// desc   => Update a specific user .
export const updateUser = Router().put(
  "/users/update/:id/:pw",
  async (req: Request, res: Response): Promise<void> => {
    const u_uid = req.params.id;
    const password = req.params.pw;
    console.log(
      `params: 
      ${u_uid} 
      ${password}`
    );
    try {
      const data = await userStore.updateUser(u_uid, password);
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json({ msg: "Can't update user !" });
      console.error(err);
    }
  }
);
