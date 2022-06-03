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
import { userAuth } from "../../middlewares/auth";

const routes = Router();

routes.get("/users/orders", getOrders);
routes.route("/users/orders/:id").get(getOneOrder);
routes
  .route("/user/account/orders")
  .post(userAuth, createOrder)
  .get(userAuth, getUserOrders)
  .delete(userAuth, deleteAllOrders);
routes
  .route("/user/account/orders/:id")
  .put(userAuth, updateUserOrders)
  .delete(userAuth, deleteUserOrders);

export default routes;
