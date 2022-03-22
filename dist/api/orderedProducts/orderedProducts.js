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
    async addProducts(values) {
        // accessing orders table first
        try {
            const sql = "SELECT * FROM orders WHERE order_id = ($1)";
            const conct = await database_1.default.connect();
            const result = await conct.query(sql, [values.order_id]);
            const order = result.rows[0];
            // check if order is complete or not.
            if (order.order_status === "complete") {
                throw new Error(`Unable to add product (${values.p_id}) to order (${values.order_id}) because order status is already (${order.order_status})`);
            }
            conct.release();
        }
        catch (err) {
            // handling errors
            if (err.message?.includes("undefined")) {
                errMsg = (0, control_1.customErr)(err, "Incorrect order id or order does not exist !.", ".");
            }
            else if (err.message?.includes("relation")) {
                errMsg = (0, control_1.customErr)(err, "Table (orders) does not exist !.", ".");
            }
            else {
                errMsg = err;
            }
            throw new Error(`${errMsg}`);
        }
        try {
            // openning connection with db.
            const conct = await database_1.default.connect();
            // making query.
            const sql = `INSERT INTO ordered_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *`;
            // retrieving query result.
            const result = await conct.query(sql, [values.order_id, values.p_id, values.quantity]);
            // check if row has been created.
            if (result.rows.length) {
                const product = result.rows[0];
                console.log(result.command, result.rows);
                conct.release();
                return {
                    message: `Product has been added successfully to order number (${values.order_id})`,
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
                errMsg = (0, control_1.customErr)(err, "TABLE (ordered_products) does not exist !.", ".");
            }
            throw new Error(`Unable to add product to order - ${errMsg}`);
        }
    }
    // Get all data from ordered_products table.
    async index() {
        try {
            const conct = await database_1.default.connect();
            const sql = "SELECT * FROM ordered_products";
            const result = await conct.query(sql);
            conct.release();
            console.log(result.command, result.rowCount, result.rows, "\n");
            return result.rows;
        }
        catch (err) {
            errMsg = (0, control_1.customErr)(err, "TABLE (ordered_products) does not exist !.", ".");
            throw new Error(`Unable to get data - ${errMsg}`);
        }
    }
    // Get one row from table ordered_products.
    async show(opId) {
        try {
            const conct = await database_1.default.connect();
            const sql = `SELECT * FROM ordered_products WHERE op_id = ($1)`;
            const result = await conct.query(sql, [opId]);
            if (result.rows.length) {
                const data = result.rows[0];
                console.log(result.command, result.rowCount, data);
                conct.release();
                return {
                    message: "Data generated successfully",
                    data: data,
                };
            }
            conct.release();
            return null;
        }
        catch (err) {
            errMsg = (0, control_1.customErr)(err, "TABLE (ordered_products) does not exist !.", ".");
            throw new Error(`Unable to get data - ${errMsg}`);
        }
    }
    // Update quantity of specific Product.
    async update(pId, quantity) {
        try {
            const conct = await database_1.default.connect();
            const sql = `UPDATE ordered_products SET quantity = ($2) WHERE product_id = ($1) RETURNING *`;
            const result = await conct.query(sql, [pId, quantity]);
            if (result.rows.length) {
                const product = result.rows[0];
                console.log(result.command, result.rowCount, product);
                conct.release();
                return {
                    message: `Product quantity updated successfully`,
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
                errMsg = (0, control_1.customErr)(err, "TABLE (ordered_products) does not exist !.", ".");
            }
            throw new Error(`Unable to update Product with id (${pId}) - ${errMsg}`);
        }
    }
    // Delete one row from table ordered_products by id.
    async delete(opId) {
        try {
            const conct = await database_1.default.connect();
            const sql = `DELETE FROM ordered_products WHERE op_id = ($1) RETURNING *`;
            const result = await conct.query(sql, [opId]);
            if (result.rows.length) {
                const product = result.rows[0];
                console.log(result.command, result.rowCount, product);
                conct.release();
                return {
                    message: `Row number ${opId} was deleted successfully`,
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
                errMsg = (0, control_1.customErr)(err, "TABLE (ordered_products) does not exist !.", ".");
            }
            throw new Error(`Unable to delete row with id (${opId}) - ${errMsg}`);
        }
    }
}
exports.OPT = new OrderedProducts();
