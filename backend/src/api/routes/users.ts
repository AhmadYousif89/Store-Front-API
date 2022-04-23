import { Router } from "express";
import {
  register,
  login,
  logout,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/users";
import authentication from "../../middlewares/auth.middleware";

const routes = Router();

routes.route("/users").get(authentication, getUsers).put(authentication, updateUser);
routes.route("/users/:id").get(getUserById).delete(authentication, deleteUser);
routes.post("/login", login);
routes.post("/register", register);
routes.post("/logout", authentication, logout);

export default routes;
