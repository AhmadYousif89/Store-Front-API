import { Request, Response } from "express";
import { jwtGenerator, validateEmail } from "../../helpers/control";
import asyncWrapper from "../../middlewares/asyncWrapper";
import { Users } from "../../types/types";
import { User } from "../models/users";

// method => POST /register
// desc   => Create new user data.
const register = asyncWrapper(async (req: Request, res: Response): Promise<void | Response> => {
  const { name, email, password } = req.body;

  const isEmailValid = validateEmail(email);
  if (!name) {
    return res.status(400).json({ message: "name is required" });
  } else if (!email) {
    return res.status(400).json({ message: "email is required" });
  } else if (!password) {
    return res.status(400).json({ message: "password is required" });
  } else if (isEmailValid === false) {
    return res.status(400).json({ message: "invalid email" });
  }

  const user = await User.create({ name, email, password });

  const token = jwtGenerator(user);
  await User.addUserToken({
    _id: user._id as string,
    token,
  });

  res.status(201).json({
    ...user,
    jwt: token,
  });
});

// method => POST /login
// desc   => Authenticate and login user
const login = asyncWrapper(async (req: Request, res: Response): Promise<void | Response> => {
  const { email, password } = req.body;

  const isEmailValid = validateEmail(email);
  if (!email) {
    return res.status(400).json({ message: "email is required" });
  } else if (!password) {
    return res.status(400).json({ message: "password is required" });
  } else if (isEmailValid === false) {
    return res.status(400).json({ message: "invalid email" });
  }

  const user = await User.authenticateUser({ email: email, password: password });
  if (!user) {
    return res.status(401).json({ message: "invalid email or password" });
  }

  const token = jwtGenerator(user);
  await User.addUserToken({
    _id: user._id as string,
    token,
  });

  res.status(200).json({
    ...user,
    jwt: token,
  });
});

// method => POST /logout
// desc => Delete user token and logout
const logout = asyncWrapper(async (req: Request, res: Response): Promise<void | Response> => {
  const { _id } = req.user as Users;

  const user = await User.delUserToken({ _id });
  if (!user) {
    return res.status(400).send();
  }

  res.status(200).json("user logged out");
});

// methtod => GET /users
// desc   => Return all users data.
const getUsers = asyncWrapper(async (_req: Request, res: Response): Promise<void | Response> => {
  const users = await User.index();

  if (!users.length) {
    return res.status(404).json({ message: `no users were found` });
  }

  res.status(200).json(users);
});

// method => GET /users/me
// desc   => Return a specific user.
const getMe = asyncWrapper(async (req: Request, res: Response): Promise<void | Response> => {
  if (!req.user) {
    return res.status(404).json({ message: "user not found" });
  }
  res.status(200).json(req.user);
});

// method => PUT /users/me
// desc   => Update a specific user .
const updateMe = asyncWrapper(async (req: Request, res: Response): Promise<void | Response> => {
  const { _id } = req.user as Users;

  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: "please enter your new password" });
  }

  await User.update({ _id, password: password });

  res.status(200).json({ message: `update success` });
});

// method => DELETE /users/me
// desc   => Delete a specific user.
const deleteMe = asyncWrapper(async (req: Request, res: Response): Promise<void | Response> => {
  const { _id } = req.user as Users;

  const user = await User.delete({ _id });

  res.status(200).json({ message: `user deleted`, ...user });
});

export { register, login, logout, getUsers, getMe, updateMe, deleteMe };
