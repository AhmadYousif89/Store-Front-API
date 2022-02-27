import cors from "cors";
import { Router } from "express";
import { corsOps } from "../app";
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

routes.use("/", cors(corsOps), products);
routes.use("/", cors(corsOps), getMobiles);
routes.use("/", cors(corsOps), getMobById);
routes.use("/", cors(corsOps), createMobile);
routes.use("/", cors(corsOps), updateMobile);
routes.use("/", cors(corsOps), deleteMobile);

routes.use("/", cors(corsOps), getUsers);
routes.use("/", cors(corsOps), getUserById);
routes.use("/", cors(corsOps), createUser);
routes.use("/", cors(corsOps), updateUser);
routes.use("/", cors(corsOps), deleteUser);

routes.use("/", cors(corsOps), authUser);
