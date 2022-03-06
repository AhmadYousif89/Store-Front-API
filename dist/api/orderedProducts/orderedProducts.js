"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPT = void 0;
const database_1 = __importDefault(require("../../database"));
const control_1 = require("../../utils/control");
let errMsg;
// Building CRUD System for products to Orders.
class OrderedProducts {
    // Add new product to order.
    async addProductToOrder(values) {
        // check if order is active or not.
        try {
            const ordersql = "SELECT * FROM orders WHERE o_id = ($1)";
            const conn = await database_1.default.connect();
            const result = await conn.query(ordersql, [values.order_id]);
            const order = result.rows[0];
            if (order.order_status === "complete") {
                throw new Error(`Unable to add product (${values.product_id}) to order (${values.order_id}) because order status is (${order.order_status})`);
            }
            conn.release();
        }
        catch (err) {
            if (err) {
                errMsg = (0, control_1.customErr)(err, "Incorrect order id or order does not exist !.", ".");
            }
            else {
                errMsg = err.message?.replace(`relation "orders"`, "TABLE (orders)");
            }
            throw new Error(`Unable to add product - ${errMsg}`);
        }
        try {
            // openning connection with db.
            const conct = await database_1.default.connect();
            // making query.
            const sql = `INSERT INTO ordered_products (order_id, product_id, p_quantity) VALUES ($1, $2, $3) RETURNING *`;
            // retrieving query result.
            const result = await conct.query(sql, [values.order_id, values.product_id, values.quantity]);
            // check if row has been created.
            if (result.rows.length) {
                const product = result.rows[0];
                console.log(result.command, result.rows);
                conct.release();
                return {
                    msg: `Product has been added successfully to order number (${values.order_id})`,
                    data: product,
                };
            }
            return null;
        }
        catch (err) {
            // handling errors
            if (err.message?.includes("uuid")) {
                errMsg = (0, control_1.customErr)(err, "Please enter a valid product id !.", ".");
            }
            else if (err.message?.includes("foreign")) {
                errMsg = (0, control_1.customErr)(err, "Incorrect product id or product does not exist !.", ".");
            }
            else {
                errMsg = err.message?.replace(`relation "ordered_products"`, "TABLE (ordered_products)");
            }
            throw new Error(`Unable to add product to order - ${errMsg}`);
        }
    }
    // Get all data from ordered_products table.
    async getOrderedProducts() {
        try {
            const conct = await database_1.default.connect();
            const sql = "SELECT * FROM ordered_products";
            const result = await conct.query(sql);
            conct.release();
            console.log(result.command, result.rowCount, result.rows, "\n");
            return result.rows;
        }
        catch (err) {
            errMsg = err.message?.replace(`relation "ordered_products"`, "TABLE (ordered_products)");
            throw new Error(`Unable to get data - ${errMsg}`);
        }
    }
    // Get one row from table ordered_products.
    async getRowByOPid(opId) {
        try {
            const conct = await database_1.default.connect();
            const sql = `SELECT * FROM ordered_products WHERE op_id = ($1)`;
            const result = await conct.query(sql, [opId]);
            if (result.rows.length) {
                const data = result.rows;
                console.log(result.command, result.rowCount, data);
                conct.release();
                return {
                    msg: "Data generated successfully",
                    data: data,
                };
            }
            conct.release();
            return null;
        }
        catch (err) {
            errMsg = err.message?.replace(`relation "ordered_products"`, "TABLE (ordered_products)");
            throw new Error(`Unable to get data - ${errMsg}`);
        }
    }
    // Update quantity of specific Product.
    async updateOrderedProduct(pId, quantity) {
        try {
            const conct = await database_1.default.connect();
            const sql = `UPDATE ordered_products SET p_quantity = ($2) WHERE product_id = ($1) RETURNING *`;
            const result = await conct.query(sql, [pId, quantity]);
            if (result.rows.length) {
                const product = result.rows[0];
                console.log(result.command, result.rowCount, product);
                conct.release();
                return {
                    msg: `Product quantity updated successfully`,
                    data: product,
                };
            }
            conct.release();
            return null;
        }
        catch (err) {
            if (err.message?.includes("uuid")) {
                errMsg = (0, control_1.customErr)(err, "Please enter a valid product id !.", ".");
            }
            else {
                errMsg = err.message?.replace(`relation "ordered_products"`, "TABLE (ordered_products)");
            }
            throw new Error(`Unable to update Product with id (${pId}) from (ordered_products) - ${errMsg}`);
        }
    }
    // Delete one row from table ordered_products by id.
    async delOrderedProduct(opId) {
        try {
            const conct = await database_1.default.connect();
            const sql = `DELETE FROM ordered_products WHERE op_id = ($1) RETURNING *`;
            const result = await conct.query(sql, [opId]);
            if (result.rows.length) {
                const product = result.rows[0];
                console.log(result.command, result.rowCount, product);
                conct.release();
                return {
                    msg: `Product deleted successfully`,
                    data: product,
                };
            }
            conct.release();
            return null;
        }
        catch (err) {
            if (err.message?.includes("uuid")) {
                errMsg = (0, control_1.customErr)(err, "Please enter a valid product id !.", ".");
            }
            else if (err.message?.includes("foreign")) {
                errMsg = (0, control_1.customErr)(err, "Product can not be deleted - remove this product from any related orders !.", ".");
            }
            else {
                errMsg = err.message?.replace(`relation "ordered_products"`, "TABLE (ordered_products)");
            }
            throw new Error(`Unable to delete row with id (${opId}) - ${errMsg}`);
        }
    }
}
exports.OPT = new OrderedProducts();
