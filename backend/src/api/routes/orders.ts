import { Router } from "express";
import {
  getOrders,
  getOneOrder,
  createOrder,
  getUserOrders,
  updateUserOrders,
  deleteUserOrders,
} from "../controllers/orders";
import authentication from "../../middlewares/auth";

const routes = Router();

routes.get("/users/orders", getOrders);
routes.route("/users/orders/:id").get(getOneOrder);
routes
  .route("/user/account/orders")
  .post(authentication, createOrder)
  .get(authentication, getUserOrders);
routes
  .route("/user/account/orders/:id")
  .put(authentication, updateUserOrders)
  .delete(authentication, deleteUserOrders);

export default routes;
