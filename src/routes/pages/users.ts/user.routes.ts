import { Router, Request, Response, NextFunction } from "express";
import { userStore } from "../../../models/users";
import JWT from "jsonwebtoken";
import { Error } from "../../../utils/control";

// method => POST /users
// desc   => Create new user data.
const createUser = Router().post(
  "/users",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, password } = req.body;
    console.log(
      `data:
      ${name}
      ${password}`
    );
    try {
      if (!name || !password) {
        const error: Error = { status: 400, message: "Please provide user name and password !" };
        next(error);
        return;
      }
      const data = await userStore.createUser({ u_name: name, u_password: password });
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

// method => POST /users/login
// desc   => Authenticate user data.
const loginUser = Router().post(
  "/users/login",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, password } = req.body;
    console.log(
      `data:
      ${name}
      ${password}`
    );
    const { SECRET_TOKEN } = process.env;
    try {
      if (!name || !password) {
        const error: Error = { status: 401, message: "Please provide user name and password !" };
        next(error);
        return;
      }
      const user = await userStore.validateUser(name, password);
      const token = JWT.sign({ user }, SECRET_TOKEN as string);
      if (!user) {
        res
          .status(401)
          .json({ msg: "Authentication failed !", data: "Invalid password or User Name" });
        return;
      }
      res.status(200).json({
        msg: "User authenticated successfully",
        data: user,
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

// method => GET /users/id
// desc   => Return a specific user.
const getUserById = Router().get(
  "/users/id",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { uid } = req.body;
    console.log("data: ", uid);
    try {
      if (!uid) {
        const error: Error = { status: 400, message: "Please provide user id !" };
        next(error);
        return;
      }
      const data = await userStore.getUserById(uid);
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

// method => PUT /users
// desc   => Update a specific user .
const updateUser = Router().put(
  "/users",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { uid, password } = req.body;
    console.log(
      `data: 
      ${uid} 
      ${password}`
    );
    try {
      if (!uid || !password) {
        const error: Error = { status: 400, message: "Please provide user id and password !" };
        next(error);
        return;
      }
      const data = await userStore.updateUser(uid, password);
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

// method => DELETE /users/id
// desc   => Delete a specific user.
const deleteUser = Router().delete(
  "/users/id",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { uid } = req.body;
    console.log("params: \n", uid);
    try {
      if (!uid) {
        const error: Error = { status: 400, message: "Please provide user id !" };
        next(error);
        return;
      }
      const data = await userStore.delUser(uid);
      if (!data) {
        res.status(404).json({
          msg: "Delete failed !",
          data: `User with id (${uid}) doesn't exist`,
        });
        return;
      }
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
);

export default { createUser, loginUser, getUsers, getUserById, updateUser, deleteUser };
