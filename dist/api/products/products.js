"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModel = void 0;
const database_1 = __importDefault(require("../../database"));
const control_1 = require("../../utils/control");
let errMsg;
// Building CRUD System for Product.
class ProductModel {
    // Create Product
    async create(values) {
        try {
            // openning connection with db.
            const conct = await database_1.default.connect();
            // making query.
            const sql = `INSERT INTO products (category, p_name, brand, maker, price, popular) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
            // retrieving query result.
            const result = await conct.query(sql, [
                values.category,
                values.p_name,
                values.brand,
                values.maker,
                values.price,
                values.popular,
            ]);
            // check if row has been created.
            if (result.rows.length) {
                const product = result.rows[0];
                console.log(result.command, result.rows);
                // colsing connection with db.
                conct.release();
                return {
                    msg: `Product created successfully`,
                    data: product,
                };
            }
            // colsing connection with db.
            conct.release();
            return null;
        }
        catch (err) {
            // handling error.
            // making my custom error syntax.
            if (err.message?.includes("enum category")) {
                errMsg = (0, control_1.customErr)(err, "Please enter category between (electronics) and (mobiles) !.", ".");
            }
            else if (err.message?.includes("enum popular")) {
                errMsg = (0, control_1.customErr)(err, "Please choose popularity between (yes) or (no) !.", ".");
            }
            else {
                errMsg = (0, control_1.customErr)(err, "TABLE (products) does not exist !.", ".");
            }
            throw new Error(`Unable to create new Product - ${errMsg}`);
        }
    }
    // Get Products
    async index() {
        try {
            const conct = await database_1.default.connect();
            const sql = "SELECT * FROM products";
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
    // Get one Product
    async show(id) {
        try {
            const conct = await database_1.default.connect();
            const sql = `SELECT * FROM products WHERE p_id = ($1)`;
            const result = await conct.query(sql, [id]);
            if (result.rows.length) {
                const product = result.rows[0];
                console.log(result.command, result.rowCount, product);
                conct.release();
                return {
                    msg: `Product generated successfully`,
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
                errMsg = (0, control_1.customErr)(err, "TABLE (products) does not exist !.", ".");
            }
            throw new Error(`Unable to get Product with id (${id}) - ${errMsg}`);
        }
    }
    // Update Product
    async update(id, price, popular) {
        try {
            const conct = await database_1.default.connect();
            const sql = `UPDATE Products SET price = ($2), popular = ($3) WHERE p_id = ($1) RETURNING *`;
            const result = await conct.query(sql, [id, price, popular]);
            if (result.rows.length) {
                const product = result.rows[0];
                console.log(result.command, result.rowCount, product);
                conct.release();
                return {
                    msg: `Product updated successfully`,
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
            else if (err.message?.includes("enum")) {
                errMsg = (0, control_1.customErr)(err, "Please enter a value between [ yes | no ] for popular !.", ".");
            }
            else {
                errMsg = (0, control_1.customErr)(err, "TABLE (products) does not exist !.", ".");
            }
            throw new Error(`Unable to update Product with id (${id}) - ${errMsg}`);
        }
    }
    // Delete Product
    async delete(id) {
        try {
            const conct = await database_1.default.connect();
            const sql = `DELETE FROM products WHERE p_id = ($1) RETURNING *`;
            const result = await conct.query(sql, [id]);
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
                errMsg = (0, control_1.customErr)(err, "TABLE (products) does not exist !.", ".");
            }
            throw new Error(`Unable to delete Product with id (${id}) - ${errMsg}`);
        }
    }
}
exports.productModel = new ProductModel();
