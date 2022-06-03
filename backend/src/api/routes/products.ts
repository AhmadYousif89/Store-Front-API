import { Router } from "express";
import {
  createProducts,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  deleteAll,
} from "../controllers/products";
import { adminAuth, userAuth } from "../../middlewares/auth";

const routes = Router();

routes
  .route("/products")
  .get(getProducts)
  .post(userAuth, adminAuth, createProducts)
  .delete(userAuth, adminAuth, deleteAll);
routes
  .route("/products/:id")
  .get(getProductById)
  .put(userAuth, adminAuth, updateProduct)
  .delete(userAuth, adminAuth, deleteProduct);

export default routes;
