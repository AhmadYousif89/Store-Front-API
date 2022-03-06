import { Router } from "express";
import user from "./api/users/user.routes";
import order from "./api/orders/order.routes";
import product from "./api/products/product.routes";
import Ops from "./api/orderedProducts/orderedproducts.routes";

export const routes = Router();

routes.use(user.loginUser);
routes.use(user.createUser);
routes.use(user.getUsers);
routes.use(user.getUserById);
routes.use(user.getUserProducts);
routes.use(user.updateUser);
routes.use(user.deleteUser);

routes.use(product.createProducts);
routes.use(product.getProducts);
routes.use(product.getProductById);
routes.use(product.updateProduct);
routes.use(product.deleteProduct);
routes.use(product.getProductByPopularity);

routes.use(order.createOrders);
routes.use(order.getOrders);
routes.use(order.getOrderById);
routes.use(order.updateOrder);
routes.use(order.deleteOrder);

routes.use(Ops.addProductToOrder);
routes.use(Ops.getOrderedProducts);
routes.use(Ops.getRowByOPid);
routes.use(Ops.updateOrderedProduct);
routes.use(Ops.delOrderedProduct);
