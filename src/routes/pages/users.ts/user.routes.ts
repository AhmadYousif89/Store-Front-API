import { Router, Request, Response, NextFunction } from "express";
import { userStore } from "../../../models/users";
import JWT from "jsonwebtoken";

// method => POST /users
// desc   => Create new user data.
const createUser = Router().post(
  "/users/:name/:pw",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const params = {
      u_name: req.params.name,
      u_password: req.params.pw,
    };
    console.log(
      `params:
      ${params.u_name}
      ${params.u_password}`
    );
    try {
      const data = await userStore.createUser(params);
      if (!data) {
        res.status(404).json(data);
        return;
      }
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }
);

// method => POST /users/auth
// desc   => Authenticate user data.
const authUser = Router().post(
  "/users/auth/:name/:pw",
  async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    const u_name = req.params.name;
    const u_password = req.params.pw;
    console.log(
      `params:
      ${u_name}
      ${u_password}`
    );
    const { SECRET_TOKEN } = process.env;
    try {
      const user = await userStore.validateUser(u_name, u_password);
      const token = JWT.sign({ user }, SECRET_TOKEN as string);
      if (!user) {
        res
          .status(401)
          .json({ msg: "Authentication failed !", data: "Invalid password or User Name" });
        return;
      }
      res.status(200).json({
        msg: "User authenticated successfully",
        token,
      });
    } catch (err) {
      next(err);
    }
  }
);

// method => GET /users
// desc   => Return all users data.
const getUsers = Router().get(
  "/users",
  async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await userStore.getAllUsers();
      if (data.length === 0) {
        res.json({ msg: `No Users Were Found !` });
        return;
      }
      res.status(200).json({ msg: "Data generated successfully", data });
    } catch (err) {
      next(err);
    }
  }
);

// method => GET /users/:id
// desc   => Return a specific user.
const getUserById = Router().get(
  "/users/:id",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const u_uid = req.params.id;
    console.log("params: ", u_uid);
    try {
      const data = await userStore.getUserById(u_uid);
      if (!data) {
        res.status(404).json(data);
        return;
      }
      res.status(200).json(data);
      return;
    } catch (err) {
      next(err);
    }
  }
);

// method => PUT /users/:id
// desc   => Update a specific user .
const updateUser = Router().put(
  "/users/:id/:pw",
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
        return;
      }
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
);

// method => DELETE /users/:id
// desc   => Delete a specific user.
const deleteUser = Router().delete(
  "/users/:id",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const u_uid = req.params.id;
    console.log("params: \n", u_uid);
    try {
      const data = await userStore.delUser(u_uid);
      if (!data) {
        res.status(404).json(data);
        return;
      }
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
);

export default { createUser, authUser, getUsers, getUserById, updateUser, deleteUser };
