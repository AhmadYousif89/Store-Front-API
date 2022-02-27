"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userStore = void 0;
const database_1 = __importDefault(require("../database"));
const control_1 = require("./../utils/control");
class UsersStore {
    async getAllUsers() {
        try {
            const conct = await database_1.default.connect();
            const sql = `SELECT * FROM users`;
            const result = await conct.query(sql);
            conct.release();
            console.log(result.command, result.rows);
            return result.rows;
        }
        catch (err) {
            throw new Error(`can't get data from table users \n ${err}`);
        }
    }
    async getUserById(u_uid) {
        try {
            const conct = await database_1.default.connect();
            const sql = `SELECT * FROM users WHERE u_uid = ($1)`;
            const result = await conct.query(sql, [u_uid]);
            conct.release();
            console.log(result.command, result.rows);
            return result.rows;
        }
        catch (err) {
            throw new Error(`can't get user with id ${u_uid} from table users \n ${err}`);
        }
    }
    async createUser(values) {
        try {
            const conct = await database_1.default.connect();
            const sql = `INSERT INTO users (u_name, u_password) VALUES ($1, $2) RETURNING *`;
            const hash = (0, control_1.encrypt)(values.u_password);
            const result = await conct.query(sql, [values.u_name, hash]);
            conct.release();
            console.log(result.command, result.rows);
            return result.rows;
        }
        catch (err) {
            throw new Error(`Can't insert into table Users \n\n ${err}`);
        }
    }
    async updateUser(u_uid, u_password) {
        try {
            const conct = await database_1.default.connect();
            const sql = `UPDATE users SET u_password = ($2) WHERE u_uid = ($1) RETURNING *`;
            const hash = (0, control_1.encrypt)(u_password);
            const result = await conct.query(sql, [u_uid, hash]);
            conct.release();
            console.log(result.command, result.rowCount);
            return result.rows;
        }
        catch (err) {
            throw new Error(`Can't update user with id (${u_uid}) from table Users \n\n ${err}`);
        }
    }
    async delUser(u_uid) {
        try {
            const conct = await database_1.default.connect();
            const sql = `DELETE FROM users WHERE u_uid = ($1) RETURNING *`;
            const result = await conct.query(sql, [u_uid]);
            conct.release();
            console.log(result.command, result.rowCount, result.rows[0]);
            return result.rows;
        }
        catch (err) {
            throw new Error(`can't delete user with id ${u_uid} from table users \n ${err}`);
        }
    }
}
exports.userStore = new UsersStore();
