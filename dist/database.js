"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
require("dotenv/config");
const { PG_PORT, PG_USER, PG_HOST, PG_DB, PG_DB_TEST, PG_PASSWORD, ENV } = process.env;
console.log("environment: ", process.env.ENV);
const pgClient = new pg_1.Pool({
    port: PG_PORT,
    host: PG_HOST,
    user: PG_USER,
    database: ENV === "development" ? PG_DB : PG_DB_TEST,
    password: PG_PASSWORD,
});
pgClient.on("error", (err) => {
    throw new Error(`pg-client error: \n ${err}`);
});
exports.default = pgClient;
