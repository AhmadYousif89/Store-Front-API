import { Router, Request, Response } from "express";
import { userStore } from "../../../models/users";

// method => DELETE /delete/:id
// desc   => Delete a specific user.
export const deleteUser = Router().delete(
  "/users/delete/:id",
  async (req: Request, res: Response): Promise<void> => {
    const u_uid = req.params.id;
    console.log("params: \n", u_uid);
    try {
      const data = await userStore.delUser(u_uid);
      if (data.length === 0) {
        res.status(404).json({ msg: `User with ID ${u_uid} Doesn't Exist !` });
        return;
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(404).json({ msg: "Data not found !" });
      console.error(err);
    }
  }
);
