"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderedProducts_1 = require("./orderedProducts");
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
let error;
// method => POST /user/account/orders/:id/products
// desc   => add product to order.
const addProductToOrder = (0, express_1.Router)().post("/user/account/orders/:id/products", auth_middleware_1.default, async (req, res, next) => {
    const oId = parseInt(req.params.id);
    const pId = req.body.p_id;
    const quantity = parseInt(req.body.quantity);
    console.log(`params:
      ${oId}
      ${pId} 
      ${quantity}`);
    // validating values before submitting.
    if (!pId || !quantity || quantity <= 0) {
        res
            .status(400)
            .json({ status: "Error", message: "Please provide correct details before submiting !" });
        return;
    }
    try {
        const data = await orderedProducts_1.OPT.addProducts({
            order_id: oId,
            p_id: pId,
            quantity: quantity,
        });
        res.status(201).json(data);
    }
    catch (err) {
        error = {
            message: `${err.message}`,
        };
        next(error);
    }
});
// method => GET /user/account/ordered-products
// desc   => Return all Ordered products.
const getOrderedProducts = (0, express_1.Router)().get("/user/account/ordered-products", async (_req, res, next) => {
    try {
        const data = await orderedProducts_1.OPT.index();
        if (data.length === 0) {
            res.status(404).json({ msg: `No Data Were Found !` });
            return;
        }
        res.status(200).json({ msg: "Data generated successfully", data });
    }
    catch (err) {
        error = {
            message: `Request Failed ! ${err.message}`,
        };
        next(error);
    }
});
// method => GET /user/account/ordered-products/:id
// desc   => Return a specific row from ordered products.
const getRowByOPid = (0, express_1.Router)().get("/user/account/ordered-products/:id", async (req, res, next) => {
    const opId = parseInt(req.params.id);
    console.log("data: \n", opId);
    if (!opId || opId <= 0) {
        res.status(400).json({ status: "Error", message: "Please enter a valid op id !" });
        return;
    }
    try {
        const data = await orderedProducts_1.OPT.show(opId);
        if (!data) {
            res
                .status(404)
                .json({ msg: "Request failed !", data: `No products related to this id (${opId}) !` });
            return;
        }
        res.status(200).json(data);
    }
    catch (err) {
        error = {
            message: `Request Failed ! ${err.message}`,
        };
        next(error);
    }
});
// method => PUT /user/account/ordered-products
// desc   => Update a specific Order .
const updateOrderedProduct = (0, express_1.Router)().put("/user/account/ordered-products", async (req, res, next) => {
    const pId = req.body.p_id;
    const quantity = parseInt(req.body.quantity);
    console.log(`data:
      ${pId} 
      ${quantity}`);
    if (!pId || quantity <= 0 || !quantity) {
        res
            .status(400)
            .json({ status: "Error", message: "Please provide correct details before updating !" });
        return;
    }
    try {
        const data = await orderedProducts_1.OPT.update(pId, quantity);
        if (!data) {
            res.status(404).json({
                msg: "Update failed !",
                data: `Product with id (${pId}) doesn't exist`,
            });
            return;
        }
        res.status(200).json(data);
    }
    catch (err) {
        error = {
            message: `Request Failed ! ${err.message}`,
        };
        next(error);
    }
});
// method => DELETE /user/account/ordered-products/:id
// desc   => Delete a specific Order.
const delOrderedProduct = (0, express_1.Router)().delete("/user/account/ordered-products/:id", async (req, res, next) => {
    const opId = parseInt(req.params.id);
    console.log("data: \n", opId);
    if (!opId || opId <= 0) {
        res.status(400).json({ status: "Error", message: "Please enter a valid op id !" });
        return;
    }
    try {
        const data = await orderedProducts_1.OPT.delete(opId);
        if (!data) {
            res.status(404).json({
                msg: "Delete failed !",
                data: `Order with id (${opId}) doesn't exist`,
            });
            return;
        }
        res.status(200).json(data);
    }
    catch (err) {
        error = {
            message: `Request Failed ! ${err.message}`,
        };
        next(error);
    }
});
exports.default = {
    addProductToOrder,
    getOrderedProducts,
    getRowByOPid,
    updateOrderedProduct,
    delOrderedProduct,
};
