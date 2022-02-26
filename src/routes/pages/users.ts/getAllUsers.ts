import { Router, Request, Response } from "express";
import { userStore } from "./../../../models/users";

// method => GET
// desc   => Return all users data.
export const getUsers = Router().get(
  "/users",
  async (_req: Request, res: Response): Promise<void> => {
    try {
      const data = await userStore.getAllUsers();
      res.status(200).json(data);
    } catch (err) {
      res.status(404).json(err);
      console.error(err);
    }
  }
);
