import pgDB from "../database";
import { Mobile, Error } from "../utils/control";

// Building CRUD System for Product.
class MobileStore {
  // Create mobile
  async createMob(values: Mobile): Promise<Mobile> {
    try {
      // openning connection with db.
      const conct = await pgDB.connect();
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
        const mobile = result.rows[0];
        console.log(result.command, result.rows);
        return {
          msg: `Mobile created successfuly`,
          data: mobile,
        };
      }
      // colsing connection with db.
      conct.release();
      return {
        msg: "update failed !",
      };
    } catch (err) {
      // handling error.
      throw new Error(`Can't insert into table mobiles \n\n ${(err as Error).message}`);
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
      throw new Error(`can't get data from table mobiles \n ${(err as Error).message}`);
    }
  }
  // Get one mobile
  async getMobById(mob_uid: string): Promise<Mobile> {
    try {
      const conct = await pgDB.connect();
      const sql = `SELECT * FROM mobiles WHERE mob_uid = ($1)`;
      const result = await conct.query(sql, [mob_uid]);
      conct.release();
      console.log(result.command, result.rowCount, result.rows);
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `can't get mobile number (${mob_uid}) from table mobiles \n ${(err as Error).message}`
      );
    }
  }
  // Update mobile
  async updateMob(mob_uid: string, price: number): Promise<Mobile> {
    try {
      const conct = await pgDB.connect();
      const sql = `UPDATE mobiles SET price = ($2) WHERE mob_uid = ($1) RETURNING *`;
      const result = await conct.query(sql, [mob_uid, price]);
      if (result.rows.length) {
        const mob = result.rows[0];
        console.log(result.command, result.rowCount, mob);
        return {
          msg: `Mobile updated successfuly`,
          data: mob,
        };
      }
      conct.release();
      return {
        msg: "update failed !",
        data: `Mobile with id (${mob_uid}) doesn't exist`,
      };
    } catch (err) {
      throw new Error(
        `Can't update mobile with id (${mob_uid}) from table mobiles \n\n ${(err as Error).message}`
      );
    }
  }
  // Delete mobile
  async delMob(mob_uid: string): Promise<Mobile> {
    try {
      const conct = await pgDB.connect();
      const sql = `DELETE FROM mobiles WHERE mob_uid = ($1) RETURNING *`;
      const result = await conct.query(sql, [mob_uid]);
      if (result.rows.length) {
        const mobile = result.rows[0];
        console.log(result.command, result.rowCount, mobile);
        return {
          msg: `Mobile deleted successfuly`,
          data: mobile,
        };
      }
      conct.release();
      return {
        msg: "delete failed !",
        data: `Mobile with id (${mob_uid}) doesn't exist`,
      };
    } catch (err) {
      throw new Error(
        `Can't delete mobile with id (${mob_uid}) from table mobiles \n\n ${(err as Error).message}`
      );
    }
  }
}

export const mobileStore = new MobileStore();
