import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";
import { Error, validateEmail } from "../../utils/control";
import { userModel } from "../models/users";

let error;
const { SECRET_TOKEN } = process.env;
// method => POST /register
// desc   => Create new user data.
const register = async (
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
    const token = JWT.sign({ data }, SECRET_TOKEN as string, { expiresIn: "24h" });
    await userModel.addUserToken({
      user_id: data?.user_id as string,
      token: token,
    });
    res.status(201).json({
      message: `user created successfully`,
      data,
      jwt: token,
    });
  } catch (err) {
    error = {
      message: `${(err as Error).message}`,
    };
    next(error);
  }
};

// method => POST /login
// desc   => Authenticate user data.
const login = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  const { email, password } = req.body;
  const checkEmail = validateEmail(email);

  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  } else if (!checkEmail) {
    return res.status(400).json({ message: "please enter a valid email" });
  }
  try {
    const user = await userModel.authenticateUser({ email: email, password: password });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = JWT.sign({ user }, SECRET_TOKEN as string, { expiresIn: "24h" });
    await userModel.addUserToken({
      user_id: user.user_id as string,
      token: token,
    });
    res.status(200).json({
      message: "user logged in",
      data: { user_id: user.user_id, name: user.name },
      jwt: token,
    });
  } catch (err) {
    error = {
      message: `${(err as Error).message}`,
    };
    next(error);
  }
};

// method => DELETE /logout
// desc => Delete user token from db
const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const userToken = req.params.token;

  try {
    const token = await userModel.delUserToken({ token: userToken });
    if (!token) {
      return res.status(404).json({
        message: "Logout failed !",
        data: `user token doesn't match`,
      });
    }
    res.status(200).send("user logged out");
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
    res.status(200).json({
      message: `User generated successfully`,
      data,
    });
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
    res.status(200).json({
      message: `user updated successfully`,
      data,
    });
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
    res.status(200).json({
      message: `user deleted successfully`,
      data,
    });
  } catch (err) {
    error = {
      message: `${(err as Error).message}`,
    };
    next(error);
  }
};

export { register, login, logout, getUsers, getUserById, updateUser, deleteUser };
