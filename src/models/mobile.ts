import pgDB from "../database";
import { Mobile, Error } from "../utils/control";

let errMsg: string | undefined;
// Building CRUD System for Product.
class MobileModel {
  // Create mobile
  async createMob(values: Mobile): Promise<Mobile | null> {
    try {
      // openning connection with db.
      const conct = await pgDB.connect();
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
    } catch (err) {
      // handling error.
      // making my custom error syntax.
      errMsg = (err as Error).message?.replace(`relation "mobiles"`, "TABLE (mobiles)");
      throw new Error(`Unable to create new mobile - ${errMsg}`);
    }
  }
  // Get mobiles
  async getAllMobs(): Promise<Mobile[]> {
    try {
      const conct = await pgDB.connect();
      const sql = "SELECT * FROM mobiles";
      const result = await conct.query(sql);
      conct.release();
      console.log(result.command, result.rowCount, result.rows, "\n");
      return result.rows;
    } catch (err) {
      errMsg = (err as Error).message?.replace(`relation "mobiles"`, "TABLE (mobiles)");
      throw new Error(`Unable to get data - ${errMsg}`);
    }
  }
  // Get one mobile
  async getMobById(mob_uid: string): Promise<Mobile | null> {
    try {
      const conct = await pgDB.connect();
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
    } catch (err) {
      const str = (err as Error).message?.includes("uuid");
      if (str) {
        errMsg = (err as Error).message?.replace(
          `invalid input syntax for type uuid: "${mob_uid}"`,
          "Please enter valid mobile id !"
        );
      } else {
        errMsg = (err as Error).message?.replace(`relation "mobiles"`, "TABLE (mobiles)");
      }
      throw new Error(`Unable to get mobile with id (${mob_uid}) - ${errMsg}`);
    }
  }
  // Update mobile
  async updateMob(mob_uid: string, price: number): Promise<Mobile | null> {
    try {
      const conct = await pgDB.connect();
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
    } catch (err) {
      const str = (err as Error).message?.includes("uuid");
      if (str) {
        errMsg = (err as Error).message?.replace(
          `invalid input syntax for type uuid: "${mob_uid}"`,
          "Please enter valid mobile id !"
        );
      } else {
        errMsg = (err as Error).message?.replace(`relation "mobiles"`, "TABLE (mobiles)");
      }
      throw new Error(`Unable to update mobile with id (${mob_uid}) - ${errMsg}`);
    }
  }
  // Delete mobile
  async delMob(mob_uid: string): Promise<Mobile | null> {
    try {
      const conct = await pgDB.connect();
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
    } catch (err) {
      const str = (err as Error).message?.includes("uuid");
      if (str) {
        errMsg = (err as Error).message?.replace(
          `invalid input syntax for type uuid: "${mob_uid}"`,
          "Please enter valid mobile id !"
        );
      } else {
        errMsg = (err as Error).message?.replace(`relation "mobiles"`, "TABLE (mobiles)");
      }
      throw new Error(`Unable to delete mobile with id (${mob_uid}) - ${errMsg}`);
    }
  }
}

export const mobileModel = new MobileModel();
