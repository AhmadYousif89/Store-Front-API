import { Router } from "express";
import {
  createOrders,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getUserOrders,
} from "../controllers/orders";
import authentication from "../../middlewares/auth";

const routes = Router();

routes
  .route("/user/account/orders")
  .get(authentication, getOrders)
  .post(authentication, createOrders)
  .put(authentication, updateOrder);
routes
  .route("/user/account/orders/:id")
  .get(authentication, getOrderById)
  .delete(authentication, deleteOrder);
routes.get("/user/:id/account/orders", authentication, getUserOrders);

export default routes;
