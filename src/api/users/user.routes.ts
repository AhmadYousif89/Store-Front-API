import { Router, Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";
import { Error } from "../../utils/control";
import { userModel } from "./users";
import Authentication from "../../middlewares/auth.middleware";

let error;
// method => POST /users/signup
// desc   => Create new user data.
const createUser = Router().post(
  "/users/signup",
  // Authentication, can't put auth here because it will be impossible to create users !!
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, password } = req.body;
    console.log(
      `data:
      ${name}
      ${password}`
    );
    // validating values before submitting.
    if (!name || !password) {
      res.status(400).json({ status: "Error", message: "Please provide user name and password !" });
      return;
    }
    try {
      const data = await userModel.create({ u_name: name, password: password });
      res.status(201).json(data);
    } catch (err) {
      error = {
        message: `Request Failed ! ${(err as Error).message}`,
      };
      next(error);
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
        res
          .status(400)
          .json({ status: "Error", message: "Please provide user name and password !" });
        return;
      }
      const user = await userModel.authenticateUser(name, password);
      if (!user) {
        res
          .status(401)
          .json({ msg: "Authentication failed !", data: "Invalid password or User Name" });
        return;
      }
      // creating token based on user credentials and my secret token.
      const token = JWT.sign({ user }, SECRET_TOKEN as string);
      res.status(200).json({
        msg: "User authenticated successfully",
        data: user,
        token,
      });
    } catch (err) {
      error = {
        message: `Request Failed ! ${(err as Error).message}`,
      };
      next(error);
    }
  }
);

// method => GET /users
// desc   => Return all users data.
const getUsers = Router().get(
  "/users",
  Authentication,
  async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await userModel.index();
      if (data.length === 0) {
        res.status(404).json({ msg: `No Users Were Found !` });
        return;
      }
      res.status(200).json({ msg: "Data generated successfully", data });
    } catch (err) {
      error = {
        message: `Request Failed ! ${(err as Error).message}`,
      };
      next(error);
    }
  }
);

// method => GET /users/:id
// desc   => Return a specific user.
const getUserById = Router().get(
  "/users/:id",
  Authentication,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const uid = req.params.id;
    console.log("data: \n", uid);
    try {
      const data = await userModel.show(uid);
      if (!data) {
        res.status(404).json({
          msg: "Request failed !",
          data: `User with id (${uid}) doesn't exist`,
        });
        return;
      }
      res.status(200).json(data);
      return;
    } catch (err) {
      error = {
        message: `Request Failed ! ${(err as Error).message}`,
      };
      next(error);
    }
  }
);

// method => PUT /users
// desc   => Update a specific user .
const updateUser = Router().put(
  "/users",
  Authentication,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { uid, password } = req.body;
    console.log(
      `data: 
      ${uid} 
      ${password}`
    );
    try {
      if (!uid || !password) {
        res.status(400).json({ status: "Error", message: "Please provide user id and password !" });
        return;
      }
      const data = await userModel.update(uid, password);
      if (!data) {
        res.status(404).json({
          msg: "Update failed !",
          data: `User with id (${uid}) doesn't exist`,
        });
        return;
      }
      res.status(200).json(data);
    } catch (err) {
      error = {
        message: `Request Failed ! ${(err as Error).message}`,
      };
      next(error);
    }
  }
);

// method => DELETE /users/:id
// desc   => Delete a specific user.
const deleteUser = Router().delete(
  "/users/:id",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const uid = req.params.id;
    console.log("params: \n", uid);
    try {
      const data = await userModel.delete(uid);
      if (!data) {
        res.status(404).json({
          msg: "Delete failed !",
          data: `User with id (${uid}) doesn't exist`,
        });
        return;
      }
      res.status(200).json(data);
    } catch (err) {
      error = {
        message: `Request Failed ! ${(err as Error).message}`,
      };
      next(error);
    }
  }
);

export default {
  createUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
