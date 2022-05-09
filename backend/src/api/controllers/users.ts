import { Request, Response } from "express";
import { validateEmail } from "../../utils/control";
import asyncWrapper from "../../middlewares/asyncWrapper";
import { userModel } from "../models/users";
import JWT from "jsonwebtoken";

const { SECRET_TOKEN } = process.env;
// method => POST /register
// desc   => Create new user data.
const register = asyncWrapper(async (req: Request, res: Response): Promise<void | Response> => {
  const { name, email, password } = req.body;
  const checkEmail = validateEmail(email);

  if (!name || !email || !password) {
    return res.status(400).json({ message: "please fill up the registration form" });
  } else if (checkEmail === false) {
    return res.status(400).json({ message: "please provide a valid email" });
  }

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
});

// method => POST /login
// desc   => Authenticate user data.
const login = asyncWrapper(async (req: Request, res: Response): Promise<void | Response> => {
  const { email, password } = req.body;
  const checkEmail = validateEmail(email);

  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  } else if (!checkEmail) {
    return res.status(400).json({ message: "please enter a valid email" });
  }

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
});

// method => DELETE /logout
// desc => Delete user token from db
const logout = asyncWrapper(async (req: Request, res: Response): Promise<void | Response> => {
  const userToken = req.params.token;

  const token = await userModel.delUserToken({ token: userToken });
  if (!token) {
    return res.status(404).json({
      message: "Logout failed !",
      data: `user token doesn't match`,
    });
  }

  res.status(200).send("user logged out");
});

// methtod => GET /users
// desc   => Return all users data.
const getUsers = asyncWrapper(async (_req: Request, res: Response): Promise<void | Response> => {
  const data = await userModel.index();
  if (!data.length) {
    return res.status(404).json({ message: `No Users Were Found !` });
  }
  res.status(200).json({ message: "Data generated successfully", data });
});

// method => GET /users/:id
// desc   => Return a specific user.
const getUserById = asyncWrapper(async (req: Request, res: Response): Promise<void | Response> => {
  const uid = req.params.id;

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
});

// method => PUT /users/:id
// desc   => Update a specific user .
const updateUser = asyncWrapper(async (req: Request, res: Response): Promise<void | Response> => {
  const uid = req.params.id;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "please provide user password !" });
  }

  const data = await userModel.update({ user_id: uid, password: password });
  if (!data) {
    return res.status(404).json({
      message: "Update failed !",
      data: `user with id (${uid}) doesn't exist`,
    });
  }

  res.status(200).json({ message: `password updated successfully` });
});

// method => DELETE /users/:id
// desc   => Delete a specific user.
const deleteUser = asyncWrapper(async (req: Request, res: Response): Promise<void | Response> => {
  const uid = req.params.id;

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
});

export { register, login, logout, getUsers, getUserById, updateUser, deleteUser };
