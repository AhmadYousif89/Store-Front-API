import { Router } from "express";
import users_routes from "./routes/users";
import orders_routes from "./routes/orders";
import products_routes from "./routes/products";
import op_routes from "./routes/ordered_products";
import db_routes from "./__services__/dashboard.routes";

export const appRoutes = Router();

appRoutes.use(db_routes);
appRoutes.use(op_routes);
appRoutes.use(users_routes);
appRoutes.use(orders_routes);
appRoutes.use(products_routes);
