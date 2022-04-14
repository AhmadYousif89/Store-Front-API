import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";
import { Error, validateEmail } from "../../utils/control";
import { userModel } from "../models/users";

let error;
// method => POST /register
// desc   => Create new user data.
const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { name, email, password } = req.body;
  const checkEmail = validateEmail(email);

  if (!name || !email || !password) {
    return res.status(400).json({ message: "please fill up the registration form" });
  } else if (checkEmail === false) {
    return res.status(400).json({ message: "please provide a valid email" });
  }
  try {
    const data = await userModel.create({ name: name, email: email, password: password });
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
const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { email, password } = req.body;
  const { SECRET_TOKEN } = process.env;
  const checkEmail = validateEmail(email);

  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  } else if (checkEmail === false) {
    return res.status(400).json({ message: "please enter a valid email" });
  }
  try {
    const user = await userModel.authenticateUser({ email: email, password: password });
    if (!user) {
      return res.status(401).json({ message: "Invalid password or email" });
    }
    // creating token based on user credentials and my secret token.
    const token = JWT.sign({ user }, SECRET_TOKEN as string, { expiresIn: "12h" });
    // storing user token in database with current time.
    const time = new Date().toISOString();
    const userToken = await userModel.userToken({
      user_id: user.user_id as string,
      token: token,
      i_at: time,
    });
    res.status(200).json({
      message: "user logged in",
      data: { user_id: user.user_id, name: user.name },
      jwt: userToken,
    });
  } catch (err) {
    error = {
      message: `${(err as Error).message}`,
    };
    next(error);
  }
};

// methtod => GET /users
// desc   => Return all users data.
const getUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const data = await userModel.index();
    if (!data.length) {
      return res.status(404).json({ message: `No Users Were Found !` });
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
const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const uid = req.params.id;

  try {
    const data = await userModel.show({ user_id: uid });
    if (!data) {
      return res.status(404).json({
        message: "Request failed !",
        data: `user with id (${uid}) doesn't exist`,
      });
    }
    res.status(200).json(data);
  } catch (err) {
    error = {
      message: `${(err as Error).message}`,
    };
    next(error);
  }
};

// method => PUT /users
// desc   => Update a specific user .
const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { uid, password } = req.body;

  try {
    if (!uid || !password) {
      return res.status(400).json({ message: "please provide user id and password !" });
    }
    const data = await userModel.update({ user_id: uid, password: password });
    if (!data) {
      return res.status(404).json({
        message: "Update failed !",
        data: `user with id (${uid}) doesn't exist`,
      });
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
const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const uid = req.params.id;

  try {
    const data = await userModel.delete({ user_id: uid });
    if (!data) {
      return res.status(404).json({
        message: "Delete failed !",
        data: `user with id (${uid}) doesn't exist`,
      });
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
