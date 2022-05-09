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
import authentication from "../../middlewares/auth";

const routes = Router();

routes.route("/users").get(getUsers);
routes
  .route("/users/:id")
  .get(getUserById)
  .put(authentication, updateUser)
  .delete(authentication, deleteUser);
routes.post("/register", register);
routes.post("/login", login);
routes.delete("/logout/:token", logout);

export default routes;
