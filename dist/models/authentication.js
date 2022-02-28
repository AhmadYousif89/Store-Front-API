"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const database_1 = __importDefault(require("../database"));
const control_1 = require("../utils/control");
// Authentication function.
const validateUser = async (u_name, u_password) => {
    try {
        const conct = await database_1.default.connect();
        const sql = `SELECT u_password FROM users WHERE u_name = ($1)`;
        const result = await conct.query(sql, [u_name]);
        // checking for data.
        if (result.rows.length) {
            const user = result.rows[0];
            // checking user password authenticity.
            if ((0, control_1.isPwValide)(u_password, user.u_password)) {
                return { msg: "User authenticated successfully", data: user };
            }
        }
        return { msg: "Authentication failed !", data: "Invalid password or User Name" };
    }
    catch (err) {
        // handling error
        throw new Error(`Can't validate user with name |${u_name}| from table Users \n ${err.message}`);
    }
};
exports.validateUser = validateUser;
