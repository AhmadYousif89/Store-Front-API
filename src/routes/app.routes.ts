import { Router } from "express";
import user from "./pages/users/user.routes";
import order from "./pages/orders/order.routes";
import product from "./pages/products/product.routes";

export const routes = Router();

routes.use(user.loginUser);
routes.use(user.createUser);
routes.use(user.getUsers);
routes.use(user.getUserById);
routes.use(user.updateUser);
routes.use(user.deleteUser);

routes.use(product.createProducts);
routes.use(product.getProducts);
routes.use(product.getProductById);
routes.use(product.updateProduct);
routes.use(product.deleteProduct);

routes.use(order.createOrders);
routes.use(order.getOrders);
routes.use(order.getOrderById);
routes.use(order.updateOrder);
routes.use(order.deleteOrder);
routes.use(order.addProductToOrder);

// routes.use(mobile.createMobile);
// routes.use(mobile.getMobiles);
// routes.use(mobile.getMobById);
// routes.use(mobile.updateMobile);
// routes.use(mobile.deleteMobile);
