import { Router } from "express";
import {
  createProducts,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/products";
import authenticator from "../../middlewares/auth";

const routes = Router();

routes.route("/products").get(getProducts).post(authenticator, createProducts);
routes
  .route("/products/:id")
  .get(getProductById)
  .put(authenticator, updateProduct)
  .delete(authenticator, deleteProduct);

export default routes;
