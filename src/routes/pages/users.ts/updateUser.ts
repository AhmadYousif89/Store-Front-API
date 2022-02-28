import { Router, Request, Response, NextFunction } from "express";
import { userStore } from "../../../models/users";

// method => PUT /edit/:id
// desc   => Update a specific user .
export const updateUser = Router().put(
  "/users/update/:id/:pw",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const u_uid = req.params.id;
    const u_password = req.params.pw;
    console.log(
      `params: 
      ${u_uid} 
      ${u_password}`
    );
    try {
      const data = await userStore.updateUser(u_uid, u_password);
      if (!data) {
        res.status(404).json(data);
      }
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
);
