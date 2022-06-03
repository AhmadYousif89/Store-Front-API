import { Router } from "express";
import { userAuth } from "../../middlewares/auth";
import { getUserPurchases } from "./dashboard.controller";

const routes = Router();

routes.get("/user/account/purchases", userAuth, getUserPurchases);

export default routes;
