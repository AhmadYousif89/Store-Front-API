import { Router } from "express";
import { products } from "./pages/products";
import { getMobiles } from "./pages/mobiles/getAllMobiles";
import { getMobById } from "./pages/mobiles/getMobile";
import { createMobile } from "./pages/mobiles/createMobile";
import { updateMobile } from "./pages/mobiles/updateMobile";
import { deleteMobile } from "./pages/mobiles/deleteMobile";
import { getUserById } from "./pages/users.ts/getUser";
import { createUser } from "./pages/users.ts/createUser";
import { getUsers } from "./pages/users.ts/getAllUsers";
import { updateUser } from "./pages/users.ts/updateUser";
import { deleteUser } from "./pages/users.ts/deleteUser";
import { authUser } from "./pages/users.ts/authUser";

export const routes = Router();

routes.use("/", products);
routes.use("/", getMobiles);
routes.use("/", getMobById);
routes.use("/", createMobile);
routes.use("/", updateMobile);
routes.use("/", deleteMobile);

routes.use("/", authUser);

routes.use("/", getUsers);
routes.use("/", getUserById);
routes.use("/", createUser);
routes.use("/", updateUser);
routes.use("/", deleteUser);
