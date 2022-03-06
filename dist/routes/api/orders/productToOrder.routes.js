"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderedProducts_1 = require("../../../models/orderedProducts");
let error;
// method => POST /user/cart/orders/:id/products
// desc   => add product to order.
const addProductToOrder = (0, express_1.Router)().post("/user/cart/orders/:id/products", async (req, res, next) => {
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
        const data = await orderedProducts_1.PtO.addProductToOrder({
            order_id: oId,
            product_id: pId,
            quantity: quantity,
        });
        res.status(201).json(data);
    }
    catch (err) {
        error = {
            message: `Request Failed ! ${err.message}`,
        };
        next(error);
    }
});
// method => GET /user/cart/orders/products
// desc   => Return all Ordered products.
const getOrderedProducts = (0, express_1.Router)().get("/user/cart/orders/products", async (_req, res, next) => {
    try {
        const data = await orderedProducts_1.PtO.getOrderedProducts();
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
// method => GET /user/cart/orders/products/op/:id
// desc   => Return a specific row from ordered products.
const getRowByOPid = (0, express_1.Router)().get("/user/cart/orders/products/op/:id", async (req, res, next) => {
    const opId = parseInt(req.params.id);
    console.log("data: \n", opId);
    try {
        const data = await orderedProducts_1.PtO.getRowByOPid(opId);
        if (!data) {
            res
                .status(404)
                .json({ msg: "Request failed !", data: `No data related to this id (${opId}) !` });
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
// method => PUT /user/cart/orders/:id/products
// desc   => Update a specific Order .
const updateOrderedProduct = (0, express_1.Router)().put("/user/cart/orders/:id/products", async (req, res, next) => {
    const oId = parseInt(req.params.id);
    const pId = req.body.p_id;
    const quantity = parseInt(req.body.quantity);
    console.log(`data:
      ${oId}
      ${pId} 
      ${quantity}`);
    if (!pId || quantity <= 0 || !quantity) {
        res
            .status(400)
            .json({ status: "Error", message: "Please provide a valid order status and id !" });
        return;
    }
    try {
        const data = await orderedProducts_1.PtO.updateOrderedProduct(pId, quantity);
        if (!data) {
            res.status(404).json({
                msg: "Update failed !",
                data: `Order with id (${oId}) doesn't exist`,
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
// method => DELETE /user/cart/orders/:id/products/op/id
// desc   => Delete a specific Order.
const delOrderedProduct = (0, express_1.Router)().delete("/user/cart/orders/:id/products/op/id", async (req, res, next) => {
    const oId = parseInt(req.params.id);
    const opId = parseInt(req.body.op_id);
    console.log("data: \n", oId, opId);
    if (!opId || opId <= 0) {
        res.status(400).json({ status: "Error", message: "Please enter a valid order id !" });
        return;
    }
    try {
        const data = await orderedProducts_1.PtO.delOrderedProduct(oId, opId);
        if (!data) {
            res.status(404).json({
                msg: "Delete failed !",
                data: `Order with id (${oId}) doesn't exist`,
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
