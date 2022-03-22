"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const dashboard_1 = require("./dashboard");
let error;
// method => GET /users/:uId/account/review/ordered-products
// desc   => Return a list of all ordered products for a user.
const getUserProducts = (0, express_1.Router)().get("/users/:id/account/review/ordered-products", auth_middleware_1.default, async (req, res, next) => {
    const uid = req.params.id;
    console.log("data: \n", uid);
    try {
        const data = await dashboard_1.dashBoard.getUserProducts(uid);
        if (!data) {
            res.status(404).json({
                message: "Request failed !",
                data: `User with id (${uid}) doesn't have products`,
            });
            return;
        }
        res.status(200).json({ message: `Data generated successfully for user id (${uid})`, data });
        return;
    }
    catch (err) {
        error = {
            message: `Request Failed ! ${err.message}`,
        };
        next(error);
    }
});
// method => GET /users/:uId/orders/:oId/account/review/ordered-products
// desc   => Return specific ordered products for a user by order id.
const getUserProductsByOid = (0, express_1.Router)().get("/users/:uid/orders/:oid/account/review/ordered-products", auth_middleware_1.default, async (req, res, next) => {
    const uid = req.params.uid;
    const oid = parseInt(req.params.oid);
    console.log("data: \n", uid, oid);
    if (!oid || oid <= 0) {
        res.status(400).json({
            message: "Please enter a valid order id !",
        });
        return;
    }
    try {
        const data = await dashboard_1.dashBoard.getUserProductsByOid(uid, oid);
        if (!data) {
            res.status(404).json({
                message: "Request failed !",
                data: `User with id (${uid}) doesn't have products related to order number (${oid})`,
            });
            return;
        }
        res.status(200).json({
            message: `Data generated successfully from order number (${oid}) for user id (${uid})`,
            data,
        });
        return;
    }
    catch (err) {
        error = {
            message: `Request Failed ! ${err.message}`,
        };
        next(error);
    }
});
// method => GET /users/:id/account/most-recent/purchases
// desc   => Return a list of all purchases a user made sorted by most recent.
const getUserMostPurchases = (0, express_1.Router)().get("/users/:id/account/most-recent/purchases", auth_middleware_1.default, async (req, res, next) => {
    const uid = req.params.id;
    console.log("data: \n", uid);
    try {
        const data = await dashboard_1.dashBoard.getUserMostPurchases(uid);
        if (!data) {
            res.status(404).json({
                message: "Request failed !",
                data: `User with id (${uid}) doesn't have purchases`,
            });
            return;
        }
        res.status(200).json({ message: `Data generated successfully for user id (${uid})`, data });
        return;
    }
    catch (err) {
        error = {
            message: `Request Failed ! ${err.message}`,
        };
        next(error);
    }
});
// method => GET /products/most/popular
// desc   => Return a most popular products.
const getProductByPopularity = (0, express_1.Router)().get("/products/most/popular", async (_req, res, next) => {
    try {
        const data = await dashboard_1.dashBoard.getProductByPopularity();
        if (data.length === 0) {
            res.status(404).json({ message: `No Popular Products Were Found !` });
            return;
        }
        res.status(200).json({ message: "Data generated successfully", data });
    }
    catch (err) {
        error = {
            message: `Request Failed ! ${err.message}`,
        };
        next(error);
    }
});
exports.default = {
    getUserProducts,
    getUserProductsByOid,
    getUserMostPurchases,
    getProductByPopularity,
};
