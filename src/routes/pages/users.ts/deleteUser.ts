import { Router, Request, Response, NextFunction } from "express";
import { userStore } from "../../../models/users";

// method => DELETE /delete/:id
// desc   => Delete a specific user.
export const deleteUser = Router().delete(
  "/users/delete/:id",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const u_uid = req.params.id;
    console.log("params: \n", u_uid);
    try {
      const data = await userStore.delUser(u_uid);
      if (!data) {
        res.status(404).json({ msg: `User with ID ${u_uid} Doesn't Exist !` });
        return;
      }
      res.status(200).json({ msg: "user deleted successfuly", data });
    } catch (err) {
      next(err);
    }
  }
);
