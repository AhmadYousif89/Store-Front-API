import { Router, Request, Response, NextFunction } from "express";
import { userStore } from "./../../../models/users";

// method => GET
// desc   => Return all users data.
export const getUsers = Router().get(
  "/users",
  async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await userStore.getAllUsers();
      if (data.length === 0) {
        res.json({ msg: `No Users Were Found !` });
        return;
      }
      res.status(200).json({ msg: "data generated successfuly", data });
    } catch (err) {
      next(err);
    }
  }
);
