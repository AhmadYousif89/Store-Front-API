import { Router } from "express";
import {
  getAll,
  getOneById,
  addProducts,
  getUserOrderedProducts,
  getUserOrderedProductsByid,
  updateUserOrderedProduct,
  delUserOrderedProduct,
} from "../controllers/ordered_products";
import authentication from "../../middlewares/auth";

const routes = Router();

routes.get("/users/ordered-products", getAll);
routes.get("/users/ordered-products/:id", getOneById);
routes.get("/user/account/ordered-products", authentication, getUserOrderedProducts);
routes.get("/user/account/orders/:id/ordered-products", authentication, getUserOrderedProductsByid);
routes.delete("/user/account/ordered-products/:id", authentication, delUserOrderedProduct);
routes
  .route("/user/account/orders/:oid/products/:pid")
  .post(authentication, addProducts)
  .put(authentication, updateUserOrderedProduct);

export default routes;
