"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_1 = require("../../../models/orders");
let error;
// method => POST /user/cart/orders
// desc   => Create new Order data.
const createOrders = (0, express_1.Router)().post("/user/cart/orders", async (req, res, next) => {
    const userId = req.body.user_id;
    const status = req.body.status.toLowerCase();
    console.log(`params:
      ${userId} 
      ${status}`);
    // validating values before submitting.
    if (!userId || !status) {
        res
            .status(400)
            .json({ status: "Error", message: "Please provide correct details before submiting !" });
        return;
    }
    try {
        const data = await orders_1.orderModel.createOrder({
            order_status: status,
            user_id: userId,
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
// method => GET /user/cart/orders
// desc   => Return all Orders data.
const getOrders = (0, express_1.Router)().get("/user/cart/orders", async (_req, res, next) => {
    try {
        const data = await orders_1.orderModel.getOrders();
        if (data.length === 0) {
            res.status(404).json({ msg: `No Orders Were Found !` });
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
// method => GET /user/cart/orders/:id
// desc   => Return a specific Order.
const getOrderById = (0, express_1.Router)().get("/user/cart/orders/:id", async (req, res, next) => {
    const oid = parseInt(req.params.id);
    console.log("data: \n", oid);
    if (!oid || oid <= 0) {
        res.status(400).json({ status: "Error", message: "Please enter a valid order id !" });
        return;
    }
    try {
        const data = await orders_1.orderModel.getOrderById(oid);
        if (!data) {
            res
                .status(404)
                .json({ msg: "Request failed !", data: `Order with id (${oid}) doesn't Exist !` });
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
// method => PUT /user/cart/orders
// desc   => Update a specific Order .
const updateOrder = (0, express_1.Router)().put("/user/cart/orders", async (req, res, next) => {
    const id = parseInt(req.body.order_id);
    const status = req.body.status.toLowerCase();
    console.log(`data: 
      ${id} 
      ${status}`);
    if (!id || id <= 0 || !status) {
        res
            .status(400)
            .json({ status: "Error", message: "Please provide a valid order status and id !" });
        return;
    }
    try {
        const data = await orders_1.orderModel.updateOrder(id, status);
        if (!data) {
            res.status(404).json({
                msg: "Update failed !",
                data: `Order with id (${id}) doesn't exist`,
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
// method => DELETE /user/cart/order/:id
// desc   => Delete a specific Order.
const deleteOrder = (0, express_1.Router)().delete("/user/cart/orders/:id", async (req, res, next) => {
    const id = parseInt(req.params.id);
    console.log("data: \n", id);
    if (!id || id <= 0) {
        res.status(400).json({ status: "Error", message: "Please enter a valid order id !" });
        return;
    }
    try {
        const data = await orders_1.orderModel.delOrder(id);
        if (!data) {
            res.status(404).json({
                msg: "Delete failed !",
                data: `Order with id (${id}) doesn't exist`,
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
    createOrders,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
};
