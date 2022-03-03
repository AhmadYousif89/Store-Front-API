"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_1 = require("../../../models/orders");
let error;
// method => POST /user/account/orders
// desc   => Create new Order data.
const createOrders = (0, express_1.Router)().post("/user/account/orders", async (req, res, next) => {
    const { userId, status } = req.body;
    console.log(`params:
      ${userId} ${status}`);
    // validating values before submitting.
    if (!userId || !status) {
        res
            .status(400)
            .json({ status: "Error", message: "Please provide correct details before submiting !" });
        return;
    }
    try {
        const data = await orders_1.ordersModel.createOrder({
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
// method => GET /user/account/orders
// desc   => Return all Orders data.
const getOrders = (0, express_1.Router)().get("/user/account/orders", async (_req, res, next) => {
    try {
        const data = await orders_1.ordersModel.getAllOrders();
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
// method => GET /user/account/order/id
// desc   => Return a specific Order.
const getOrderById = (0, express_1.Router)().get("/user/account/order/id", async (req, res, next) => {
    const { id } = req.body;
    console.log("data: \n", id);
    if (!id) {
        res.status(400).json({ status: "Error", message: "Please provide order id !" });
        return;
    }
    try {
        const data = await orders_1.ordersModel.getOrderById(id);
        if (!data) {
            res
                .status(404)
                .json({ msg: "Request failed !", data: `Order with id (${id}) doesn't Exist !` });
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
// method => PUT /user/account/orders
// desc   => Update a specific Order .
const updateOrder = (0, express_1.Router)().put("/user/account/orders", async (req, res, next) => {
    const { id, status } = req.body;
    console.log(`data: 
      ${id} 
      ${status}`);
    if (!id || !status) {
        res.status(400).json({ status: "Error", message: "Please provide order status and id !" });
        return;
    }
    try {
        const data = await orders_1.ordersModel.updateOrder(id, status);
        if (!data) {
            res.status(404).json({
                msg: "Update failed !",
                data: `Order with id (${id}) doesn't exist`,
            });
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
// method => DELETE /user/account/order/id
// desc   => Delete a specific Order.
const deleteOrder = (0, express_1.Router)().delete("/user/account/order/id", async (req, res, next) => {
    const { id } = req.body;
    console.log("data: \n", id);
    if (!id) {
        res.status(400).json({ status: "Error", message: "Please provide order id !" });
        return;
    }
    try {
        const data = await orders_1.ordersModel.delOrder(id);
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
exports.default = { createOrders, getOrders, getOrderById, updateOrder, deleteOrder };
