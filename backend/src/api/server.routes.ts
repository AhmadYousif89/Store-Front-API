import { Router } from "express";
import users_routes from "./routes/users";
import orders_routes from "./routes/orders";
import products_routes from "./routes/products";
import op_routes from "./routes/ordered_products";
import db_routes from "./__services__/dashboard.routes";

export const serverRoutes = Router();

serverRoutes.use(db_routes);
serverRoutes.use(op_routes);
serverRoutes.use(users_routes);
serverRoutes.use(orders_routes);
serverRoutes.use(products_routes);
