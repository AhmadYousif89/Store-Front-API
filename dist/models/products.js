"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModel = void 0;
const database_1 = __importDefault(require("../database"));
let errMsg;
// Building CRUD System for Product.
class ProductModel {
    // Create Product
    async createProduct(values) {
        try {
            // openning connection with db.
            const conct = await database_1.default.connect();
            // making query.
            const sql = `INSERT INTO products (category, p_name, brand, maker, price) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
            // retrieving query result.
            const result = await conct.query(sql, [
                values.category,
                values.p_name,
                values.brand,
                values.maker,
                values.price,
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
            const str = err.message?.includes("enum");
            if (str) {
                errMsg = err.message
                    ?.replace(``, "Please enter category between (electronics) and (mobiles) !.")
                    .split(".")[0];
            }
            else {
                errMsg = err.message?.replace(`relation "products"`, "TABLE (Products)");
            }
            throw new Error(`Unable to create new Product - ${errMsg}`);
        }
    }
    // Get Products
    async getAllProducts() {
        try {
            const conct = await database_1.default.connect();
            const sql = "SELECT * FROM products";
            const result = await conct.query(sql);
            conct.release();
            console.log(result.command, result.rowCount, result.rows, "\n");
            return result.rows;
        }
        catch (err) {
            errMsg = err.message?.replace(`relation "products"`, "TABLE (products)");
            throw new Error(`Unable to get data - ${errMsg}`);
        }
    }
    // Get one Product
    async getProductById(id) {
        try {
            const conct = await database_1.default.connect();
            const sql = `SELECT * FROM products WHERE p_uid = ($1)`;
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
            const str = err.message?.includes("uuid");
            if (str) {
                errMsg = err.message
                    ?.replace(``, "Please enter a valid product id !.")
                    .split(".")[0];
            }
            else {
                errMsg = err.message?.replace(`relation "products"`, "TABLE (products)");
            }
            throw new Error(`Unable to get Product with id (${id}) - ${errMsg}`);
        }
    }
    // Update Product
    async updateProduct(id, price) {
        try {
            const conct = await database_1.default.connect();
            const sql = `UPDATE Products SET price = ($2) WHERE p_uid = ($1) RETURNING *`;
            const result = await conct.query(sql, [id, price]);
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
            const str = err.message?.includes("uuid");
            if (str) {
                errMsg = err.message?.replace(`invalid input syntax for type uuid: "${id}"`, "Please enter valid Product id !");
            }
            else {
                errMsg = err.message?.replace(`relation "products"`, "TABLE (products)");
            }
            throw new Error(`Unable to update Product with id (${id}) - ${errMsg}`);
        }
    }
    // Delete Product
    async delProduct(id) {
        try {
            const conct = await database_1.default.connect();
            const sql = `DELETE FROM products WHERE p_uid = ($1) RETURNING *`;
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
            const str = err.message?.includes("uuid");
            if (str) {
                errMsg = err.message?.replace(`invalid input syntax for type uuid: "${id}"`, "Please enter valid Product id !");
            }
            else {
                errMsg = err.message?.replace(`relation "products"`, "TABLE (products)");
            }
            throw new Error(`Unable to delete Product with id (${id}) - ${errMsg}`);
        }
    }
}
exports.productModel = new ProductModel();
