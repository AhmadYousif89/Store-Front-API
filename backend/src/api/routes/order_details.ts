import { Router } from "express";
import {
  getAll,
  getOneById,
  getUserOrderDetails,
  getUserOrderDetailsByid,
  updateUserOrderDetails,
  delUserOrderDetails,
} from "../controllers/order_details";
import authenticator from "../../middlewares/auth";

const routes = Router();

routes.get("/users/order-details", getAll);
routes.get("/users/order-details/:id", getOneById);
routes.get("/user/account/order-details", authenticator, getUserOrderDetails);
routes.get("/user/account/orders/:id/order-details", authenticator, getUserOrderDetailsByid);
routes.delete("/user/account/order-details/:id", authenticator, delUserOrderDetails);
routes.route("/user/account/orders/:oid/products/:pid").put(authenticator, updateUserOrderDetails);

export default routes;
