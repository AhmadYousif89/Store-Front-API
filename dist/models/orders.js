"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderModel = void 0;
const database_1 = __importDefault(require("../database"));
const control_1 = require("../utils/control");
let errMsg;
// Building CRUD System for Orders.
class OrdersModel {
    // Create Orders
    async createOrder(values) {
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
                errMsg = (0, control_1.customErr)(err, "Please enter value between (active) and (complete) for order status !.", ".");
            }
            else if (err.message?.includes("foreign")) {
                errMsg = (0, control_1.customErr)(err, "Incorrect user id or user does not exist !.", ".");
            }
            else {
                errMsg = err.message?.replace(`relation "orders"`, "TABLE (orders)");
            }
            throw new Error(`Unable to create new Order - ${errMsg}`);
        }
    }
    // Get orders
    async getOrders() {
        try {
            const conct = await database_1.default.connect();
            const sql = "SELECT * FROM orders";
            const result = await conct.query(sql);
            conct.release();
            console.log(result.command, result.rowCount, result.rows, "\n");
            return result.rows;
        }
        catch (err) {
            errMsg = err.message?.replace(`relation "orders"`, "TABLE (orders)");
            throw new Error(`Unable to get data - ${errMsg}`);
        }
    }
    // Get one order
    async getOrderById(id) {
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
            if (err.message?.includes("integer")) {
                errMsg = (0, control_1.customErr)(err, "Please enter a positive integer value for order id !.", ".");
            }
            else {
                errMsg = err.message?.replace(`relation "orders"`, "TABLE (orders)");
            }
            throw new Error(`Unable to get order with id (${id}) - ${errMsg}`);
        }
    }
    // Update Orders
    async updateOrder(id, status) {
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
                errMsg = (0, control_1.customErr)(err, "Please enter value between (active) and (complete) for order status !.", ".");
            }
            else {
                errMsg = err.message?.replace(`relation "orders"`, "TABLE (orders)");
            }
            throw new Error(`Unable to update orders with id (${id}) - ${errMsg}`);
        }
    }
    // Delete Orders
    async delOrder(id) {
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
            errMsg = err.message?.replace(`relation "orders"`, "TABLE (orders)");
            throw new Error(`Unable to delete orders with id (${id}) - ${errMsg}`);
        }
    }
}
exports.orderModel = new OrdersModel();
