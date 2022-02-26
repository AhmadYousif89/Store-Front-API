import { Router, Request, Response } from "express";
import { userStore } from "../../../models/users";

// method => DELETE /delete/:id
// desc   => Delete a specific user.
export const deleteUser = Router().delete(
  "/users/delete/:id",
  async (req: Request, res: Response): Promise<void> => {
    const u_uid = req.params.id;
    try {
      console.log("params: \n", u_uid);
      const data = await userStore.delUser(u_uid);
      res.status(200).json(data);
    } catch (err) {
      res.status(404).json(err);
      console.error(err);
    }
  }
);
