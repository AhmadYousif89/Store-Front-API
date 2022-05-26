import { Router } from "express";
import users from "./routes/users";
import orders from "./routes/orders";
import products from "./routes/products";
import dashboard from "./__services__/dashboard.routes";
import orderedProducts from "./routes/ordered_products";

export const API_ROUTES = Router();

API_ROUTES.use(users);
API_ROUTES.use(orders);
API_ROUTES.use(products);
API_ROUTES.use(dashboard);
API_ROUTES.use(orderedProducts);
