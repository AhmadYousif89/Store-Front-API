import { Router, Request, Response } from "express";
import { userStore } from "../../../models/users";

// method => GET /:id
// desc   => Return a specific user.
export const getUserById = Router().get("/users/:id", async (req: Request, res: Response) => {
  const u_uid = req.params.id;
  try {
    console.log("params: ", u_uid);
    const data = await userStore.getUserById(u_uid);
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json(err);
    console.error(err);
  }
});
