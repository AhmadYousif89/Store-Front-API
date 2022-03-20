"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const { PG_PORT, PG_USER, PG_HOST, PG_DB, PG_DB_TEST, PG_PASSWORD, ENV } = process.env;
console.log("environment: ", process.env.ENV);
const pgDB = new pg_1.Pool({
    port: PG_PORT,
    host: PG_HOST,
    user: PG_USER,
    database: ENV === "dev" ? PG_DB : PG_DB_TEST,
    password: PG_PASSWORD,
});
pgDB.on("error", (err) => {
    throw new Error(`pg-DB error: \n ${err.message}`);
});
exports.default = pgDB;
