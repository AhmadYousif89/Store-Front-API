import { Router } from "express";
import { products } from "./pages/products";
import userRoutes from "./pages/users.ts/user.routes";
import mobileRoutes from "./pages/mobiles/mobile.routes";
import authMiddleware from "./middlewares/auth.middleware";

export const routes = Router();

routes.use(products);
routes.use(mobileRoutes.createMobile);
routes.use(mobileRoutes.getMobiles);
routes.use(mobileRoutes.getMobById);
routes.use(mobileRoutes.updateMobile);
routes.use(mobileRoutes.deleteMobile);

routes.use(userRoutes.loginUser);
routes.use(userRoutes.createUser);
routes.use(authMiddleware, userRoutes.getUsers);
routes.use(userRoutes.getUserById);
routes.use(userRoutes.updateUser);
routes.use(userRoutes.deleteUser);
