import { Router } from "express";
import authenticator from "../../middlewares/auth";
import { register, login, logout, getUsers, getMe, updateMe, deleteMe } from "../controllers/users";

const routes = Router();

routes.route("/users").get(getUsers);
routes
  .route("/users/me")
  .get(authenticator, getMe)
  .put(authenticator, updateMe)
  .delete(authenticator, deleteMe);
routes.post("/register", register);
routes.post("/login", login);
routes.post("/logout", authenticator, logout);

export default routes;
