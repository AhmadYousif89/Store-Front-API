import { Router } from "express";
import {
  addProductToOrder,
  getOrderedProducts,
  getOPsById,
  updateOrderedProduct,
  delOrderedProduct,
} from "../controllers/ordered_products";
import authentication from "../../middlewares/auth.middleware";

const routes = Router();

routes.post("/user/account/orders/:id/products", authentication, addProductToOrder);
routes
  .route("/user/account/ordered-products")
  .get(authentication, getOrderedProducts)
  .put(authentication, updateOrderedProduct);
routes
  .route("/user/account/ordered-products/:id")
  .get(authentication, getOPsById)
  .delete(authentication, delOrderedProduct);

export default routes;
