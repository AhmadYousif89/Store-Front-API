import { Router, Request, Response, NextFunction } from "express";
import { userStore } from "../../../models/users";

// method => GET /:id
// desc   => Return a specific user.
export const getUserById = Router().get(
  "/users/:id",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const u_uid = req.params.id;
    console.log("params: ", u_uid);
    try {
      const data = await userStore.getUserById(u_uid);
      if (!data) {
        res.status(404).json({ msg: `User with ID ${u_uid} Doesn't Exist !` });
        return;
      }
      res.status(200).json({ msg: "user generated successfuly", data });
      return;
    } catch (err) {
      next(err);
    }
  }
);
