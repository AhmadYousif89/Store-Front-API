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
            const result = await conct.query(sql, [values.order_status, values.user_id]);
            // check if row has been created.
            if (result.rows.length) {
                const orders = result.rows[0];
                console.log(result.command, result.rows);
                // colsing connection with db.
                conct.release();
                return {
                    msg: `Order created successfully`,
                    data: orders,
                };
            }
            // colsing connection with db.
            conct.release();
            return null;
        }
        catch (err) {
            // handling error.
            // making my custom error syntax.
            if (err.message?.includes("uuid")) {
                errMsg = (0, control_1.customErr)(err, "Please enter a valid user id !.", ".");
            }
            else if (err.message?.includes("enum")) {
                errMsg = (0, control_1.customErr)(err, "Please enter value between [ new | active ] for order status !.", ".");
            }
            else if (err.message?.includes("foreign")) {
                errMsg = (0, control_1.customErr)(err, "Incorrect user id or user does not exist !.", ".");
            }
            else {
                errMsg = (0, control_1.customErr)(err, "TABLE (orders) does not exist !.", ".");
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
            const sql = `SELECT * FROM orders WHERE o_id = ($1)`;
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
            errMsg = (0, control_1.customErr)(err, "TABLE (orders) does not exist !.", ".");
            throw new Error(`Unable to get order with id (${id}) - ${errMsg}`);
        }
    }
    // Update Orders
    async update(id, status) {
        // check if order status
        try {
            const sql = "SELECT order_status FROM orders WHERE o_id = ($1) ";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const order = result.rows[0];
            // check if the order status is complete
            if (order.order_status === "complete") {
                conn.release();
                return {
                    msg: `Can not set status of Order number (${id}) because it is already (${order.order_status}) - you may review your order or delete it if you want !`,
                };
            }
            // check for other status
            if (order.order_status === status) {
                conn.release();
                return { msg: `Order number (${id}) already has a status of (${order.order_status}) ` };
            }
            else {
                try {
                    const conct = await database_1.default.connect();
                    const sql = `UPDATE orders SET order_status = ($2) WHERE o_id = ($1) RETURNING *`;
                    const result = await conct.query(sql, [id, status]);
                    if (result.rows.length) {
                        const order = result.rows[0];
                        console.log(result.command, result.rowCount, order);
                        conct.release();
                        return {
                            msg: `Order updated successfully`,
                            data: order,
                        };
                    }
                    conct.release();
                    return null;
                }
                catch (err) {
                    if (err.message?.includes("enum")) {
                        errMsg = (0, control_1.customErr)(err, "Please enter value between [ active | complete ] for order status !.", ".");
                    }
                    else {
                        errMsg = (0, control_1.customErr)(err, "TABLE (orders) does not exist !.", ".");
                    }
                    throw new Error(`Unable to update orders with id (${id}) - ${errMsg}`);
                }
            }
        }
        catch (err) {
            // if we don't have the order in the table.
            if (err.message?.includes("undefined")) {
                errMsg = (0, control_1.customErr)(err, "Incorrect order id or order does not exist !.", ".");
            }
            else {
                errMsg = (0, control_1.customErr)(err, "TABLE (orders) does not exist !.", ".");
            }
            throw new Error(`Unable to update order number (${id}) - ${errMsg}`);
        }
    }
    // Delete Orders
    async delete(id) {
        try {
            const conct = await database_1.default.connect();
            const sql = `DELETE FROM orders WHERE o_id = ($1) RETURNING *`;
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
            throw new Error(`Unable to delete orders with id (${id}) - ${errMsg}`);
        }
    }
}
exports.orderModel = new OrdersModel();
