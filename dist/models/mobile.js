"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mobileStore = void 0;
const database_1 = __importDefault(require("../database"));
// Building CRUD System for Product.
class MobileStore {
    // Create mobile
    async createMob(values) {
        try {
            // openning connection with db.
            const conct = await database_1.default.connect();
            // making query.
            const sql = `INSERT INTO mobiles (brand_name, model_name, manufacturer, price, made_in) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
            // retrieving query result.
            const result = await conct.query(sql, [
                values.brand_name,
                values.model_name,
                values.manufacturer,
                values.price,
                values.made_in,
            ]);
            // check if row has been created.
            if (result.rows.length) {
                const user = result.rows[0];
                // colsing connection with db.
                conct.release();
                console.log(result.command, result.rows);
                return {
                    msg: `User created successfuly`,
                    data: user,
                };
            }
            return {
                msg: "update failed !",
            };
        }
        catch (err) {
            // handling error.
            throw new Error(`Can't insert into table mobiles \n\n ${err.message}`);
        }
    }
    // Get mobiles
    async getAllMobs() {
        try {
            const conct = await database_1.default.connect();
            const sql = "SELECT * FROM mobiles";
            const result = await conct.query(sql);
            conct.release();
            console.log(result.command, result.rowCount, result.rows, "\n");
            return result.rows;
        }
        catch (err) {
            throw new Error(`can't get data from table mobiles \n ${err.message}`);
        }
    }
    // Get one mobile
    async getMobById(mob_uid) {
        try {
            const conct = await database_1.default.connect();
            const sql = `SELECT * FROM mobiles WHERE mob_uid = ($1)`;
            const result = await conct.query(sql, [mob_uid]);
            conct.release();
            console.log(result.command, result.rowCount, result.rows);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`can't get mobile number (${mob_uid}) from table mobiles \n ${err.message}`);
        }
    }
    // Update mobile
    async updateMob(mob_uid, price) {
        try {
            const conct = await database_1.default.connect();
            const sql = `UPDATE mobiles SET price = ($2) WHERE mob_uid = ($1) RETURNING *`;
            const result = await conct.query(sql, [mob_uid, price]);
            if (result.rows.length) {
                const mob = result.rows[0];
                conct.release();
                console.log(result.command, result.rowCount, mob);
                return {
                    msg: `Mobile updated successfuly`,
                    data: mob,
                };
            }
            return {
                msg: "update failed !",
                data: `Mobile with id (${mob_uid}) doesn't exist`,
            };
        }
        catch (err) {
            throw new Error(`Can't update mobile with id (${mob_uid}) from table mobiles \n\n ${err.message}`);
        }
    }
    // Delete mobile
    async delMob(mob_uid) {
        try {
            const conct = await database_1.default.connect();
            const sql = `DELETE FROM mobiles WHERE mob_uid = ($1) RETURNING *`;
            const result = await conct.query(sql, [mob_uid]);
            conct.release();
            console.log(result.command, result.rowCount, result.rows[0]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Can't delete mobile with id (${mob_uid}) from table mobiles \n\n ${err.message}`);
        }
    }
}
exports.mobileStore = new MobileStore();
