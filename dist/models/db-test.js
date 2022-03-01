"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.StoreDB = void 0;
const database_1 = __importDefault(require("../database"));
class StoreDB {
    async createTestDB() {
        try {
            const conn = await database_1.default.connect();
            const sql = "CREATE DATABASE tech_store_test;";
            conn.query(sql);
            conn.release();
            console.log("DB_test created");
        }
        catch (err) {
            throw new Error(`can't create database tech_store_test \n ${err.message}`);
        }
    }
    async dropTestDB() {
        try {
            const conn = await database_1.default.connect();
            const sql = "DROP DATABASE tech_store_test;";
            conn.query(sql);
            conn.release();
            console.log("DB_test droped");
        }
        catch (err) {
            throw new Error(`can't drop database tech_store_test \n ${err.message}`);
        }
    }
    async createTableMobiles() {
        try {
            const conn = await database_1.default.connect();
            const sql = `
      CREATE TABLE mobiles (
      mob_uid UUID PRIMARY KEY,
      brand_name VARCHAR(100) NOT NULL,
      model_name VARCHAR(100) NOT NULL,
      manufacturer VARCHAR(100) NOT NULL,
      price integer NOT NULL,
      made_in VARCHAR(50) NOT NULL
    );`;
            await conn.query(sql);
            conn.release();
            console.log("Table created");
        }
        catch (err) {
            throw new Error(`can't create table mobiles \n ${err.message}`);
        }
    }
    async createTableUsers() {
        try {
            const conn = await database_1.default.connect();
            const sql = `
      CREATE TABLE mobiles (
      u_uid UUID PRIMARY KEY,
      username VARCHAR(100),
      u_password VARCHAR
    );`;
            await conn.query(sql);
            conn.release();
            console.log("Table created");
        }
        catch (err) {
            throw new Error(`can't create table users \n ${err.message}`);
        }
    }
    async dropTables() {
        try {
            const conn = await database_1.default.connect();
            const sql = "DROP TABLE mobiles , users , migrations;";
            await conn.query(sql);
            conn.release();
            console.log("Tables droped");
        }
        catch (err) {
            throw new Error(`can't drop tables from database ${process.env.PG_DB_TEST} \n ${err.message}`);
        }
    }
}
exports.StoreDB = StoreDB;
exports.db = new StoreDB();
