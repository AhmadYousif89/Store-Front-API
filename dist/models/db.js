"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const database_1 = __importDefault(require("../database"));
const { PG_DB } = process.env;
class StoreDB {
    async createTableUsers() {
        try {
            const conn = await database_1.default.connect();
            const sql = `
      CREATE TABLE IF NOT EXISTS users (
      u_uid UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      u_name VARCHAR(100),
      u_password VARCHAR
    );
      `;
            await conn.query(sql);
            conn.release();
            console.log("Table created");
        }
        catch (err) {
            throw new Error(`Unable to create table users in database ${PG_DB} - ${err.message}`);
        }
    }
    async createTableMobiles() {
        try {
            const conn = await database_1.default.connect();
            const sql = `
      CREATE TABLE IF NOT EXISTS mobiles (
      mob_uid UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      brand_name VARCHAR(100) NOT NULL,
      model_name VARCHAR(100) NOT NULL,
      manufacturer VARCHAR(100) NOT NULL,
      price integer NOT NULL,
      made_in VARCHAR(50) NOT NULL
    );
      `;
            await conn.query(sql);
            conn.release();
            console.log("Table created");
        }
        catch (err) {
            throw new Error(`Unable to create table mobiles in database ${PG_DB} - ${err.message}`);
        }
    }
    async dropTables() {
        try {
            const conn = await database_1.default.connect();
            const sql = "DROP TABLE IF EXISTS mobiles , users;";
            await conn.query(sql);
            conn.release();
            console.log("Tables droped");
        }
        catch (err) {
            throw new Error(`Unable to drop tables from database ${PG_DB} - ${err.message}`);
        }
    }
}
exports.db = new StoreDB();
