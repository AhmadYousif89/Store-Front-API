import { Router } from "express";
import Authentication from "../../middlewares/auth.middleware";
import {
  getUserProducts,
  getUserProductsByOid,
  getUserMostPurchases,
  getProductByPopularity,
} from "./dashboard.controller";

const routes = Router();

routes.get("/users/:id/account/review/ordered-products", Authentication, getUserProducts);
routes.get(
  "/users/:uid/orders/:oid/account/review/ordered-products",
  Authentication,
  getUserProductsByOid
);
routes.get("/users/:id/account/most-recent/purchases", Authentication, getUserMostPurchases);
routes.get("/products/most/popular", getProductByPopularity);

export default routes;
