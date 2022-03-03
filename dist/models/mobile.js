"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mobileModel = void 0;
const database_1 = __importDefault(require("../database"));
let errMsg;
// Building CRUD System for Product.
class MobileModel {
    // Create mobile
    async createMob(values) {
        try {
            // openning connection with db.
            const conct = await database_1.default.connect();
            // making query.
            const sql = `INSERT INTO mobiles (brand, model, maker, price) VALUES ($1, $2, $3, $4) RETURNING *`;
            // retrieving query result.
            const result = await conct.query(sql, [
                values.brand,
                values.model,
                values.maker,
                values.price,
            ]);
            // check if row has been created.
            if (result.rows.length) {
                const mobile = result.rows[0];
                console.log(result.command, result.rows);
                // colsing connection with db.
                conct.release();
                return {
                    msg: `Mobile created successfully`,
                    data: mobile,
                };
            }
            // colsing connection with db.
            conct.release();
            return null;
        }
        catch (err) {
            // handling error.
            // making my custom error syntax.
            errMsg = err.message?.replace(`relation "mobiles"`, "TABLE (mobiles)");
            throw new Error(`Unable to create new mobile - ${errMsg}`);
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
            errMsg = err.message?.replace(`relation "mobiles"`, "TABLE (mobiles)");
            throw new Error(`Unable to get data - ${errMsg}`);
        }
    }
    // Get one mobile
    async getMobById(mob_uid) {
        try {
            const conct = await database_1.default.connect();
            const sql = `SELECT * FROM mobiles WHERE mob_uid = ($1)`;
            const result = await conct.query(sql, [mob_uid]);
            if (result.rows.length) {
                const mobile = result.rows[0];
                console.log(result.command, result.rowCount, mobile);
                conct.release();
                return {
                    msg: `Mobile generated successfully`,
                    data: mobile,
                };
            }
            conct.release();
            return null;
        }
        catch (err) {
            const str = err.message?.includes("uuid");
            if (str) {
                errMsg = err.message?.replace(`invalid input syntax for type uuid: "${mob_uid}"`, "Please enter valid mobile id !");
            }
            else {
                errMsg = err.message?.replace(`relation "mobiles"`, "TABLE (mobiles)");
            }
            throw new Error(`Unable to get mobile with id (${mob_uid}) - ${errMsg}`);
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
                console.log(result.command, result.rowCount, mob);
                conct.release();
                return {
                    msg: `Mobile updated successfully`,
                    data: mob,
                };
            }
            conct.release();
            return null;
        }
        catch (err) {
            const str = err.message?.includes("uuid");
            if (str) {
                errMsg = err.message?.replace(`invalid input syntax for type uuid: "${mob_uid}"`, "Please enter valid mobile id !");
            }
            else {
                errMsg = err.message?.replace(`relation "mobiles"`, "TABLE (mobiles)");
            }
            throw new Error(`Unable to update mobile with id (${mob_uid}) - ${errMsg}`);
        }
    }
    // Delete mobile
    async delMob(mob_uid) {
        try {
            const conct = await database_1.default.connect();
            const sql = `DELETE FROM mobiles WHERE mob_uid = ($1) RETURNING *`;
            const result = await conct.query(sql, [mob_uid]);
            if (result.rows.length) {
                const mobile = result.rows[0];
                console.log(result.command, result.rowCount, mobile);
                conct.release();
                return {
                    msg: `Mobile deleted successfully`,
                    data: mobile,
                };
            }
            conct.release();
            return null;
        }
        catch (err) {
            const str = err.message?.includes("uuid");
            if (str) {
                errMsg = err.message?.replace(`invalid input syntax for type uuid: "${mob_uid}"`, "Please enter valid mobile id !");
            }
            else {
                errMsg = err.message?.replace(`relation "mobiles"`, "TABLE (mobiles)");
            }
            throw new Error(`Unable to delete mobile with id (${mob_uid}) - ${errMsg}`);
        }
    }
}
exports.mobileModel = new MobileModel();
