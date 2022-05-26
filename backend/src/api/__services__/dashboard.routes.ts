import { Router } from "express";
import Authentication from "../../middlewares/auth";
import { getUserPurchases } from "./dashboard.controller";

const routes = Router();

routes.get("/user/account/purchases", Authentication, getUserPurchases);

export default routes;
