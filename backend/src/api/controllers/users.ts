import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";
import { Error, validateEmail } from "../../utils/control";
import { userModel } from "../models/users";

let error;
// method => POST /signup
// desc   => Create new user data.
const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name, email, password } = req.body;
  const checkEmail = validateEmail(email);

  if (!name || !email || !password) {
    res.status(400).json({ status: "Error", message: "Please fill up the registration form" });
    return;
  } else if (checkEmail === false) {
    res.status(400).json({ status: "Error", message: "Please provide a valid email" });
    return;
  }
  try {
    const data = await userModel.create({ u_name: name, u_email: email, password: password });
    res.status(201).json(data);
  } catch (err) {
    error = {
      message: `${(err as Error).message}`,
    };
    next(error);
  }
};

// method => POST /login
// desc   => Authenticate user data.
const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;
  const { SECRET_TOKEN } = process.env;
  const checkEmail = validateEmail(email);

  if (!email || !password) {
    res.status(400).json({ status: "Error", message: "Please provide your email and password" });
    return;
  } else if (checkEmail === false) {
    res.status(400).json({ status: "Error", message: "Please enter a valid email" });
    return;
  }
  try {
    const user = await userModel.authenticateUser(email, password);
    if (!user) {
      res.status(401).json({ message: "Invalid password or email" });
      return;
    }
    // creating token based on user credentials and my secret token.
    const token = JWT.sign({ user }, SECRET_TOKEN as string, { expiresIn: "12h" });
    res.status(200).json({
      message: "user logged in",
      data: { u_name: user.u_name },
      token,
    });
  } catch (err) {
    error = {
      message: `${(err as Error).message}`,
    };
    next(error);
  }
};

// method => GET /users
// desc   => Return all users data.
const getUsers = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await userModel.index();
    if (data.length === 0) {
      res.status(404).json({ message: `No Users Were Found !` });
      return;
    }
    res.status(200).json({ message: "Data generated successfully", data });
  } catch (err) {
    error = {
      message: `${(err as Error).message}`,
    };
    next(error);
  }
};

// method => GET /users/:id
// desc   => Return a specific user.
const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const uid = req.params.id;

  try {
    const data = await userModel.show(uid);
    if (!data) {
      res.status(404).json({
        message: "Request failed !",
        data: `User with id (${uid}) doesn't exist`,
      });
      return;
    }
    res.status(200).json(data);
    return;
  } catch (err) {
    error = {
      message: `${(err as Error).message}`,
    };
    next(error);
  }
};

// method => PUT /users
// desc   => Update a specific user .
const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { uid, password } = req.body;

  try {
    if (!uid || !password) {
      res.status(400).json({ status: "Error", message: "Please provide user id and password !" });
      return;
    }
    const data = await userModel.update(uid, password);
    if (!data) {
      res.status(404).json({
        message: "Update failed !",
        data: `User with id (${uid}) doesn't exist`,
      });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    error = {
      message: `${(err as Error).message}`,
    };
    next(error);
  }
};

// method => DELETE /users/:id
// desc   => Delete a specific user.
const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const uid = req.params.id;

  try {
    const data = await userModel.delete(uid);
    if (!data) {
      res.status(404).json({
        message: "Delete failed !",
        data: `User with id (${uid}) doesn't exist`,
      });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    error = {
      message: `${(err as Error).message}`,
    };
    next(error);
  }
};

export { createUser, loginUser, getUsers, getUserById, updateUser, deleteUser };
