"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const database_1 = __importDefault(require("../database"));
const control_1 = require("./../utils/control");
let errMsg;
// Building CRUD System for Users
class UserModel {
    // Create user
    async createUser(values) {
        try {
            // openning connection with db.
            const conct = await database_1.default.connect();
            // making query.
            const sql = `INSERT INTO users (u_name, password) VALUES ($1, $2) RETURNING u_id , u_name`;
            // encrypting password.
            const hash = (0, control_1.encrypt)(values.password);
            // retrieving query result.
            const result = await conct.query(sql, [values.u_name, hash]);
            // check if row has been created.
            if (result.rows.length) {
                const user = result.rows[0];
                console.log(result.command, result.rows);
                conct.release();
                return {
                    msg: `User created successfully`,
                    data: user,
                };
            }
            return null;
        }
        catch (err) {
            // handling error.
            // making my custom error syntax.
            errMsg = err.message?.replace(`relation "users"`, "TABLE (users)");
            throw new Error(`Unable to create new User (${values.u_name}) - ${errMsg}`);
        }
    }
    /*
    - Get users => (without retrieving user password as it consider sensitive information)
    - If we want to control how much of data to be received when calling this route we could use keyword (LIMIT) like = LIMIT 5.
    */
    async getUsers() {
        try {
            const conct = await database_1.default.connect();
            const sql = `SELECT u_id, u_name FROM users`;
            const result = await conct.query(sql);
            conct.release();
            console.log(result.command, result.rowCount, result.rows, "\n");
            return result.rows;
        }
        catch (err) {
            errMsg = err.message?.replace(`relation "users"`, "TABLE (users)");
            throw new Error(`Unable to get Users - ${errMsg}`);
        }
    }
    // Get one user
    async getUserById(uid) {
        try {
            const conct = await database_1.default.connect();
            const sql = `SELECT u_id, u_name FROM users WHERE u_id = ($1) `;
            const result = await conct.query(sql, [uid]);
            if (result.rows.length) {
                const user = result.rows[0];
                console.log(result.command, result.rowCount, user);
                conct.release();
                return {
                    msg: `User generated successfully`,
                    data: user,
                };
            }
            conct.release();
            return null;
        }
        catch (err) {
            if (err.message?.includes("uuid")) {
                errMsg = (0, control_1.customErr)(err, "Please enter a valid user id !.", ".");
            }
            else {
                errMsg = err.message?.replace(`relation "users"`, "TABLE (users)");
            }
            throw new Error(`Unable to get user with id (${uid}) - ${errMsg}`);
        }
    }
    // Update user
    async updateUser(u_id, password) {
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
                    msg: `User updated successfully`,
                    data: user,
                };
            }
            conct.release();
            return null;
        }
        catch (err) {
            if (err.message?.includes("uuid")) {
                errMsg = (0, control_1.customErr)(err, "Please enter a valid user id !.", ".");
            }
            else {
                errMsg = err.message?.replace(`relation "users"`, "TABLE (users)");
            }
            throw new Error(`Unable to update user with id (${u_id}) - ${errMsg}`);
        }
    }
    // Delete user
    async delUser(u_id) {
        try {
            const conct = await database_1.default.connect();
            const sql = `DELETE FROM users WHERE u_id = ($1) RETURNING u_id , u_name`;
            const result = await conct.query(sql, [u_id]);
            if (result.rows.length) {
                const user = result.rows[0];
                console.log(result.command, result.rowCount, user);
                conct.release();
                return {
                    msg: `User deleted successfully`,
                    data: user,
                };
            }
            conct.release();
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
                errMsg = err.message?.replace(`relation "users"`, "TABLE (users)");
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
                    return data.rows[0];
                }
            }
            conct.release();
            return null;
        }
        catch (err) {
            // handling error
            errMsg = err.message?.replace(`relation "users"`, "TABLE (users)");
            throw new Error(`Unable to authenticate user - ${errMsg}`);
        }
    }
}
exports.userModel = new UserModel();
