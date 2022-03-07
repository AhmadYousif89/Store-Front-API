"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashBoard = void 0;
const database_1 = __importDefault(require("../../database"));
const control_1 = require("../../utils/control");
let errMsg;
// Business logic functions.
class Dashboard {
    // Get ordered products for specific user.
    async getUserProducts(uid) {
        try {
            const conct = await database_1.default.connect();
            const sql = `SELECT op_id, order_id, order_status, product_id, p_quantity, created_in FROM orders JOIN ordered_products ON orders.o_id = ordered_products.order_id WHERE orders.user_id = ($1)`;
            const result = await conct.query(sql, [uid]);
            if (result.rows.length) {
                console.log(result.command, result.rowCount, result.rows);
                conct.release();
                return result.rows;
            }
            return null;
        }
        catch (err) {
            if (err.message?.includes("uuid")) {
                errMsg = (0, control_1.customErr)(err, "Please enter a valid user id !.", ".");
            }
            else {
                errMsg = (0, control_1.customErr)(err, "Make sure to add products to this user before tring to access this page !.", ".");
            }
            throw new Error(`Unable to get User data - ${errMsg}`);
        }
    }
    // Get ordered products for specific user by order id.
    async getUserProductsByOid(uid, oid) {
        try {
            const conct = await database_1.default.connect();
            const sql = `SELECT op_id, order_status, product_id, p_quantity, created_in FROM orders JOIN ordered_products ON orders.o_id = ordered_products.order_id WHERE orders.user_id = ($1) AND orders.o_id = ($2)`;
            const result = await conct.query(sql, [uid, oid]);
            if (result.rows.length) {
                console.log(result.command, result.rowCount, result.rows);
                conct.release();
                return result.rows;
            }
            return null;
        }
        catch (err) {
            if (err.message?.includes("uuid")) {
                errMsg = (0, control_1.customErr)(err, "Please enter a valid user id !.", ".");
            }
            else if (err.message?.includes("integer")) {
                errMsg = (0, control_1.customErr)(err, "Please enter a valid order id !.", ".");
            }
            else {
                errMsg = (0, control_1.customErr)(err, "Make sure to add orders and products to this user before tring to access this page !.", ".");
            }
            throw new Error(`Unable to get User products data - ${errMsg}`);
        }
    }
    // Get user most recent purchases .
    async getUserMostPurchases(uid) {
        try {
            const conct = await database_1.default.connect();
            const sql = `SELECT op_id, order_id, order_status, product_id, created_in FROM orders JOIN ordered_products ON orders.o_id = ordered_products.order_id WHERE orders.user_id = ($1) AND orders.order_status = 'complete' ORDER BY created_in DESC`;
            const result = await conct.query(sql, [uid]);
            if (result.rows.length) {
                console.log(result.command, result.rowCount, result.rows);
                conct.release();
                return result.rows;
            }
            return null;
        }
        catch (err) {
            if (err.message?.includes("uuid")) {
                errMsg = (0, control_1.customErr)(err, "Please enter a valid user id !.", ".");
            }
            else {
                errMsg = (0, control_1.customErr)(err, "Make sure to add orders and products to this user before tring to access this page !.", ".");
            }
            throw new Error(`Unable to get User products data - ${errMsg}`);
        }
    }
    // Get Popular Products
    async getProductByPopularity() {
        try {
            const conct = await database_1.default.connect();
            const sql = "SELECT p_id, price, popular FROM products WHERE popular = 'yes' ORDER BY price DESC LIMIT 5";
            const result = await conct.query(sql);
            conct.release();
            console.log(result.command, result.rowCount, result.rows, "\n");
            return result.rows;
        }
        catch (err) {
            errMsg = (0, control_1.customErr)(err, "TABLE (products) does not exist !.", ".");
            throw new Error(`Unable to get data - ${errMsg}`);
        }
    }
}
exports.dashBoard = new Dashboard();
