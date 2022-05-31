import { Router } from "express";
import {
  getOrders,
  getOneOrder,
  createOrder,
  getUserOrders,
  updateUserOrders,
  deleteUserOrders,
  deleteAllOrders,
} from "../controllers/orders";
import authenticator from "../../middlewares/auth";

const routes = Router();

routes.get("/users/orders", getOrders);
routes.route("/users/orders/:id").get(getOneOrder);
routes
  .route("/user/account/orders")
  .post(authenticator, createOrder)
  .get(authenticator, getUserOrders)
  .delete(authenticator, deleteAllOrders);
routes
  .route("/user/account/orders/:id")
  .put(authenticator, updateUserOrders)
  .delete(authenticator, deleteUserOrders);

export default routes;
