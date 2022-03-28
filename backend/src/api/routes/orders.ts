import { Router } from "express";
import {
  createOrders,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../controllers/orders";
import authentication from "../../middlewares/auth.middleware";

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

export default routes;
