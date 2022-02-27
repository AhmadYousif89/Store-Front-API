import cors from "cors";
import { Router } from "express";
import { corsOptions } from "../app";
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

routes.use("/", cors(corsOptions), products);
routes.use("/", cors(corsOptions), getMobiles);
routes.use("/", cors(corsOptions), getMobById);
routes.use("/", cors(corsOptions), createMobile);
routes.use("/", cors(corsOptions), updateMobile);
routes.use("/", cors(corsOptions), deleteMobile);

routes.use("/", cors(corsOptions), authUser);

routes.use("/", cors(corsOptions), getUsers);
routes.use("/", cors(corsOptions), getUserById);
routes.use("/", cors(corsOptions), createUser);
routes.use("/", cors(corsOptions), updateUser);
routes.use("/", cors(corsOptions), deleteUser);
