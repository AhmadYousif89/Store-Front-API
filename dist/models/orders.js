"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersModel = void 0;
const database_1 = __importDefault(require("../database"));
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
            const str = err.message?.includes("uuid");
            const enumStr = err.message?.includes("enum");
            const userFk = err.message?.includes("foreign");
            if (str) {
                errMsg = err.message
                    ?.replace("", "Please enter a valid user id !.")
                    .split(".")[0];
            }
            else if (enumStr) {
                errMsg = err.message
                    ?.replace("", "Please enter value between (active) and (complete) for order status !.")
                    .split(".")[0];
            }
            else if (userFk) {
                errMsg = err.message
                    ?.replace("", "Incorrect user id or user does not exist !.")
                    .split(".")[0];
            }
            else {
                errMsg = err.message?.replace(`relation "orders"`, "TABLE (orders)");
            }
            throw new Error(`Unable to create new Order - ${errMsg}`);
        }
    }
    // Get orders
    async getAllOrders() {
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
            const sql = `SELECT * FROM orders WHERE id = ($1)`;
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
            const int = err.message?.includes("integer");
            if (int) {
                errMsg = err.message
                    ?.replace(``, "Please enter a positive integer value for order id !.")
                    .split(".")[0];
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
            const sql = `UPDATE orders SET order_status = ($2) WHERE id = ($1) RETURNING *`;
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
            const userFk = err.message?.includes("foreign");
            const enumStr = err.message?.includes("enum");
            const int = err.message?.includes("integer");
            if (userFk) {
                errMsg = err.message
                    ?.replace(``, "Please make sure you have a User first !.")
                    .split(".")[0];
            }
            else if (enumStr) {
                errMsg = err.message
                    ?.replace(``, "Please enter value between (active) and (complete) for order status !.")
                    .split(".")[0];
            }
            else if (int) {
                errMsg = err.message
                    ?.replace(``, "Please enter a positive integer value for order id !.")
                    .split(".")[0];
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
            const sql = `DELETE FROM orders WHERE id = ($1) RETURNING *`;
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
            const str = err.message?.includes("uuid");
            const int = err.message?.includes("integer");
            if (str) {
                errMsg = err.message
                    ?.replace(``, "Please enter valid order id !.")
                    .split(".")[0];
            }
            else if (int) {
                errMsg = err.message
                    ?.replace(``, "Please enter a positive integer value for order id !.")
                    .split(".")[0];
            }
            else {
                errMsg = err.message?.replace(`relation "orders"`, "TABLE (orders)");
            }
            throw new Error(`Unable to delete orders with id (${id}) - ${errMsg}`);
        }
    }
    // Add new product order.
    async addProductToOrder(values) {
        try {
            // openning connection with db.
            const conct = await database_1.default.connect();
            // making query.
            const sql = `INSERT INTO ordered_products (order_id, product_id, p_quantity) VALUES ($1, $2, $3) RETURNING order_id, product_id, p_quantity`;
            // retrieving query result.
            const result = await conct.query(sql, [values.order_id, values.product_id, values.quantity]);
            // check if row has been created.
            if (result.rows.length) {
                const product = result.rows[0];
                console.log(result.command, result.rows);
                conct.release();
                return {
                    msg: `Product has been added successfully to order number ${values.order_id}`,
                    data: product,
                };
            }
            return null;
        }
        catch (err) {
            const str = err.message?.includes("uuid");
            const strFK = err.message?.includes("foreign");
            if (str) {
                errMsg = err.message
                    ?.replace("", "Please enter a valid product id !.")
                    .split(".")[0];
            }
            else if (strFK) {
                errMsg = err.message
                    ?.replace("", "Please enter a valid order id !.")
                    .split(".")[0];
            }
            else {
                errMsg = err.message?.replace(`relation "ordered_products"`, "TABLE (ordered_products)");
            }
            throw new Error(`Unable to add new order-product - ${errMsg}`);
        }
    }
}
exports.ordersModel = new OrdersModel();
