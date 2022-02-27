"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const database_1 = __importDefault(require("../database"));
const control_1 = require("../utils/control");
const validateUser = async (u_name, u_password) => {
    try {
        const conct = await database_1.default.connect();
        const sql = `SELECT u_password FROM users WHERE u_name = ($1)`;
        const result = await conct.query(sql, [u_name]);
        if (result.rows.length) {
            const user = result.rows[0];
            if ((0, control_1.isPwValide)(u_password, user.u_password)) {
                console.log("user pw is : ", user);
                return user;
            }
        }
        return `Invalid password or User Name`;
    }
    catch (err) {
        throw new Error(`Can't validate user with name (${u_name}) from table Users \n\n ${err}`);
    }
};
exports.validateUser = validateUser;
