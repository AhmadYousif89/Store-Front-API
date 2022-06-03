import { Router } from "express";
import {
  getAll,
  getOneById,
  getUserOrderDetails,
  getUserOrderDetailsByid,
  updateUserOrderDetails,
  delUserOrderDetails,
} from "../controllers/order_details";
import { userAuth } from "../../middlewares/auth";

const routes = Router();

routes.get("/users/order-details", getAll);
routes.get("/users/order-details/:id", getOneById);
routes.get("/user/account/order-details", userAuth, getUserOrderDetails);
routes.get("/user/account/orders/:id/order-details", userAuth, getUserOrderDetailsByid);
routes.delete("/user/account/order-details/:id", userAuth, delUserOrderDetails);
routes.route("/user/account/orders/:oid/products/:pid").put(userAuth, updateUserOrderDetails);

export default routes;
