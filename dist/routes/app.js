"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = require("express");
const app_1 = require("../app");
const products_1 = require("./pages/products");
const getAllMobiles_1 = require("./pages/mobiles/getAllMobiles");
const getMobile_1 = require("./pages/mobiles/getMobile");
const createMobile_1 = require("./pages/mobiles/createMobile");
const updateMobile_1 = require("./pages/mobiles/updateMobile");
const deleteMobile_1 = require("./pages/mobiles/deleteMobile");
const getUser_1 = require("./pages/users.ts/getUser");
const createUser_1 = require("./pages/users.ts/createUser");
const getAllUsers_1 = require("./pages/users.ts/getAllUsers");
const updateUser_1 = require("./pages/users.ts/updateUser");
const deleteUser_1 = require("./pages/users.ts/deleteUser");
exports.routes = (0, express_1.Router)();
exports.routes.use("/", (0, cors_1.default)(app_1.corsOps), products_1.products);
exports.routes.use("/", (0, cors_1.default)(app_1.corsOps), getAllMobiles_1.getMobiles);
exports.routes.use("/", (0, cors_1.default)(app_1.corsOps), getMobile_1.getMobById);
exports.routes.use("/", (0, cors_1.default)(app_1.corsOps), createMobile_1.createMobile);
exports.routes.use("/", (0, cors_1.default)(app_1.corsOps), updateMobile_1.updateMobile);
exports.routes.use("/", (0, cors_1.default)(app_1.corsOps), deleteMobile_1.deleteMobile);
exports.routes.use("/", (0, cors_1.default)(app_1.corsOps), getAllUsers_1.getUsers);
exports.routes.use("/", (0, cors_1.default)(app_1.corsOps), getUser_1.getUserById);
exports.routes.use("/", (0, cors_1.default)(app_1.corsOps), createUser_1.createUser);
exports.routes.use("/", (0, cors_1.default)(app_1.corsOps), updateUser_1.updateUser);
exports.routes.use("/", (0, cors_1.default)(app_1.corsOps), deleteUser_1.deleteUser);
