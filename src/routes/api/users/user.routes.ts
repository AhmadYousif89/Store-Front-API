import { Router, Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";
import { Error } from "../../../utils/control";
import { userModel } from "../../../models/users";
// import authMiddleware from "../../middlewares/auth.middleware";

let error: Error;
// method => POST /users/signup
// desc   => Create new user data.
const createUser = Router().post(
  "/users/signup",
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
      const data = await userModel.createUser({ u_name: name, password: password });
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
  async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await userModel.getUsers();
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
  // authMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const uid = req.params.id;
    console.log("data: \n", uid);
    try {
      const data = await userModel.getUserById(uid);
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

// method => GET /users/:id
// desc   => Return a specific user.
// const getUserProducts = Router().get(
//   "/users/:userID/orders/:orderID/products",
//   // authMiddleware,
//   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     const uid = req.params.userId;
//     const oid = parseInt(req.params.orderId);
//     console.log("data: \n", uid);
//     try {
//       const data = await userModel.getUserProducts(uid, oid);
//       if (!data) {
//         res.status(404).json({
//           msg: "Request failed !",
//           data: `User with id (${uid}) doesn't have product with id ${oid}`,
//         });
//         return;
//       }
//       res.status(200).json(data);
//       return;
//     } catch (err) {
//       error = {
//         message: `Request Failed ! ${(err as Error).message}`,
//       };
//       next(error);
//     }
//   }
// );

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
        res.status(400).json({ status: "Error", message: "Please provide user id and password !" });
        return;
      }
      const data = await userModel.updateUser(uid, password);
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
      const data = await userModel.delUser(uid);
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
  // getUserProducts,
  updateUser,
  deleteUser,
};
