import { Router } from "express";
import {
  createProducts,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/products";

const routes = Router();

routes.route("/products").get(getProducts).post(createProducts).put(updateProduct);
routes.route("/products/:id").get(getProductById).delete(deleteProduct);

export default routes;
