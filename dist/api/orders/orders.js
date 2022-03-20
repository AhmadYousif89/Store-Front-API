"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderModel = void 0;
const database_1 = __importDefault(require("../../database"));
const control_1 = require("../../utils/control");
let errMsg;
// Building CRUD System for Orders.
class OrdersModel {
    // Create Orders
    async create(values) {
        // don't set new orders as complete.
        if (values.order_status === "complete") {
            return { msg: `New orders can not be set as (${values.order_status})` };
        }
        try {
            // openning connection with db.
            const conct = await database_1.default.connect();
            // making query.
            const sql = `INSERT INTO orders (order_status, user_id) VALUES ($1, $2) RETURNING *`;
            // retrieving query result.
            const result = await conct.query(sql, [values.order_status, values.u_id]);
            // check if row has been created.
            if (result.rows.length) {
                const orders = result.rows[0];
                console.log(result.command, orders);
                // colsing connection with db.
                conct.release();
                return {
                    msg: `Order created successfully`,
                    data: orders,
                };
            }
            return null;
        }
        catch (err) {
            // handling error.
            // making my custom error syntax.
            if (err.message?.includes("uuid")) {
                errMsg = (0, control_1.customErr)(err, "Please enter a valid user id !.", ".");
            }
            else if (err.message?.includes("enum")) {
                errMsg = (0, control_1.customErr)(err, "Please enter a value between [ new | active ] for order status !.", ".");
            }
            else if (err.message?.includes("foreign")) {
                errMsg = (0, control_1.customErr)(err, "Incorrect user id or user does not exist !.", ".");
            }
            else {
                errMsg = err;
            }
            throw new Error(`Unable to create new Order - ${errMsg}`);
        }
    }
    // Get orders
    async index() {
        try {
            const conct = await database_1.default.connect();
            const sql = "SELECT * FROM orders";
            const result = await conct.query(sql);
            conct.release();
            console.log(result.command, result.rowCount, result.rows, "\n");
            return result.rows;
        }
        catch (err) {
            errMsg = (0, control_1.customErr)(err, "TABLE (orders) does not exist !.", ".");
            throw new Error(`Unable to get data - ${errMsg}`);
        }
    }
    // Get one order
    async show(id) {
        try {
            const conct = await database_1.default.connect();
            const sql = `SELECT * FROM orders WHERE order_id = ($1)`;
            const result = await conct.query(sql, [id]);
            if (result.rows.length) {
                const orders = result.rows[0];
                console.log(result.command, result.rowCount, orders);
                conct.release();
                return {
                    msg: `Order generated successfully`,
                    data: orders,
                };
            }
            conct.release();
            return null;
        }
        catch (err) {
            throw new Error(`Unable to get order with id (${id}) - ${err}`);
        }
    }
    // Update Orders
    async update(oid, status) {
        try {
            const conct = await database_1.default.connect();
            const sql1 = `SELECT * FROM orders WHERE order_id = ($1)`;
            const rowResult = await conct.query(sql1, [oid]);
            const order_status = rowResult.rows[0].order_status;
            if (order_status === "complete") {
                conct.release();
                return {
                    msg: `Order number (${oid}) already has a status of (complete) - you may review your order or delete it if you want !`,
                };
            }
            else if (order_status === status) {
                conct.release();
                return {
                    msg: `Order number (${oid}) already has a status of (${order_status}) !`,
                };
            }
            const sql2 = `UPDATE orders SET order_status = ($2) WHERE order_id = ($1) RETURNING *`;
            const updateResult = await conct.query(sql2, [oid, status]);
            if (updateResult.rows.length) {
                const order = updateResult.rows[0];
                console.log(updateResult.command, updateResult.rowCount, order);
                conct.release();
                return {
                    msg: `Order updated successfully`,
                    data: order,
                };
            }
            return null;
        }
        catch (err) {
            if (err.message?.includes("undefined")) {
                errMsg = (0, control_1.customErr)(err, "Incorrect order id or order does not exist !.", ".");
            }
            else if (err.message?.includes("enum")) {
                errMsg = (0, control_1.customErr)(err, "Please enter value between [ active | complete ] for order status !.", ".");
            }
            else {
                errMsg = err;
            }
            throw new Error(`Unable to update orders with id (${oid}) - ${errMsg}`);
        }
    }
    // Delete Orders
    async delete(id) {
        try {
            const conct = await database_1.default.connect();
            const sql = `DELETE FROM orders WHERE order_id = ($1) RETURNING *`;
            const result = await conct.query(sql, [id]);
            if (result.rows.length) {
                const orders = result.rows[0];
                console.log(result.command, result.rowCount, orders);
                conct.release();
                return {
                    msg: `Order deleted successfully`,
                    data: orders,
                };
            }
            conct.release();
            return null;
        }
        catch (err) {
            if (err.message?.includes("foreign")) {
                errMsg = (0, control_1.customErr)(err, "Please remove any products related to this order first !.", ".");
            }
            else {
                errMsg = (0, control_1.customErr)(err, "TABLE (orders) does not exist !.", ".");
            }
            throw new Error(`Unable to delete order with id (${id}) - ${errMsg}`);
        }
    }
}
exports.orderModel = new OrdersModel();
