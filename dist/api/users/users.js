"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const database_1 = __importDefault(require("../../database"));
const control_1 = require("../../utils/control");
let errMsg;
// Building CRUD System for Users
class UserModel {
    // Create user
    async create(values) {
        try {
            // openning connection with db.
            const conct = await database_1.default.connect();
            // making sql query.
            const sql = `INSERT INTO users (u_name, password) VALUES ($1, $2) RETURNING u_id , u_name`;
            // encrypting password.
            const hash = (0, control_1.encrypt)(values.password);
            // retrieving query result.
            const result = await conct.query(sql, [values.u_name, hash]);
            // check for data.
            if (result.rows.length) {
                const user = result.rows[0];
                console.log(result.command, result.rows);
                conct.release();
                return {
                    message: `User created successfully`,
                    data: user,
                };
            }
            return null;
        }
        catch (err) {
            // handling error.
            // making my custom error syntax.
            errMsg = (0, control_1.customErr)(err, "TABLE (users) does not exist !.", ".");
            throw new Error(`Unable to create new User (${values.u_name}) - ${errMsg}`);
        }
    }
    // Get all users => (without retrieving user password as it consider sensitive information)
    async index() {
        try {
            const conct = await database_1.default.connect();
            const sql = `SELECT u_id, u_name FROM users`;
            const result = await conct.query(sql);
            conct.release();
            console.log(result.command, result.rowCount, result.rows, "\n");
            return result.rows;
        }
        catch (err) {
            errMsg = (0, control_1.customErr)(err, "TABLE (users) does not exist !.", ".");
            throw new Error(`Unable to get Users - ${errMsg}`);
        }
    }
    // Get one user
    async show(uid) {
        try {
            const conct = await database_1.default.connect();
            const sql = `SELECT u_id, u_name FROM users WHERE u_id = $1 `;
            const result = await conct.query(sql, [uid]);
            if (result.rows.length) {
                const user = result.rows[0];
                console.log(result.command, result.rowCount, user);
                conct.release();
                return {
                    message: `User generated successfully`,
                    data: user,
                };
            }
            return null;
        }
        catch (err) {
            if (err.message?.includes("uuid")) {
                errMsg = (0, control_1.customErr)(err, "Please enter a valid user id !.", ".");
            }
            else {
                errMsg = (0, control_1.customErr)(err, "TABLE (users) does not exist !.", ".");
            }
            throw new Error(`Unable to get user with id (${uid}) - ${errMsg}`);
        }
    }
    // Update user
    async update(u_id, password) {
        try {
            const conct = await database_1.default.connect();
            const sql = `UPDATE users SET password = ($2) WHERE u_id = ($1) RETURNING u_id , u_name`;
            const hash = (0, control_1.encrypt)(password);
            const result = await conct.query(sql, [u_id, hash]);
            if (result.rows.length) {
                const user = result.rows[0];
                console.log(result.command, result.rowCount, user);
                conct.release();
                return {
                    message: `User updated successfully`,
                    data: user,
                };
            }
            return null;
        }
        catch (err) {
            if (err.message?.includes("uuid")) {
                errMsg = (0, control_1.customErr)(err, "Please enter a valid user id !.", ".");
            }
            else {
                errMsg = (0, control_1.customErr)(err, "TABLE (users) does not exist !.", ".");
            }
            throw new Error(`Unable to update user with id (${u_id}) - ${errMsg}`);
        }
    }
    // Delete user
    async delete(u_id) {
        try {
            const conct = await database_1.default.connect();
            const sql = `DELETE FROM users WHERE u_id = ($1) RETURNING u_id , u_name`;
            const result = await conct.query(sql, [u_id]);
            if (result.rows.length) {
                const user = result.rows[0];
                console.log(result.command, result.rowCount, user);
                conct.release();
                return {
                    message: `User deleted successfully`,
                    data: user,
                };
            }
            return null;
        }
        catch (err) {
            if (err.message?.includes("uuid")) {
                errMsg = (0, control_1.customErr)(err, "Please enter a valid user id !.", ".");
            }
            else if (err.message?.includes("foreign")) {
                errMsg = (0, control_1.customErr)(err, `User can not be deleted - delete any related orders first !.`, ".");
            }
            else {
                errMsg = (0, control_1.customErr)(err, "TABLE (users) does not exist !.", ".");
            }
            throw new Error(`Unable to delete user with id (${u_id}) - ${errMsg}`);
        }
    }
    // Authenticate user.
    async authenticateUser(u_name, password) {
        try {
            const conct = await database_1.default.connect();
            const sql = `SELECT password FROM users WHERE u_name = ($1)`;
            const result = await conct.query(sql, [u_name]);
            // checking for data.
            if (result.rows.length) {
                const user = result.rows[0];
                // checking user password authenticity.
                if ((0, control_1.isPwValide)(password, user.password)) {
                    const sql = `SELECT u_id, u_name FROM users WHERE u_name = ($1)`;
                    const data = await conct.query(sql, [u_name]);
                    conct.release();
                    return data.rows[0];
                }
            }
            return null;
        }
        catch (err) {
            // handling error
            errMsg = (0, control_1.customErr)(err, "TABLE (users) does not exist !.", ".");
            throw new Error(`Unable to authenticate user - ${errMsg}`);
        }
    }
}
exports.userModel = new UserModel();
