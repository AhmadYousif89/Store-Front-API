import { Router } from "express";
import {
  createUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/users";
import authentication from "../../middlewares/auth.middleware";

const routes = Router();

routes.route("/users").get(authentication, getUsers).put(authentication, updateUser);
routes.route("/users/:id").get(authentication, getUserById).delete(authentication, deleteUser);
routes.post("/signup", createUser);
routes.post("/login", loginUser);

export default routes;
