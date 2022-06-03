import { Router } from "express";
import { adminAuth, userAuth } from "../../middlewares/auth";
import {
  register,
  login,
  logout,
  getUsers,
  getMe,
  updatePassword,
  updateAdminState,
  deleteMe,
} from "../controllers/users";

const routes = Router();

routes.route("/users").get(getUsers);
routes
  .route("/users/me")
  .get(userAuth, getMe)
  .put(userAuth, updatePassword)
  .delete(userAuth, deleteMe);
routes.put("/users/state", userAuth, adminAuth, updateAdminState);
routes.post("/auth/register", register);
routes.post("/auth/login", login);
routes.delete("/auth/logout", userAuth, logout);

export default routes;
