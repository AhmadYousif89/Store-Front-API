import pgClient from "../database";
import { Mobile } from "../utils/control";

class MobileStore {
  async getAllMobs(): Promise<Mobile[]> {
    try {
      const conct = await pgClient.connect();
      const sql = "SELECT * FROM mobiles";
      const result = await conct.query(sql);
      conct.release();
      console.log(result.command, result.rows);
      return result.rows;
    } catch (err) {
      throw new Error(`can't get data from table mobiles \n ${err}`);
    }
  }

  async getMobById(mob_uid: string): Promise<Mobile[]> {
    try {
      const conct = await pgClient.connect();
      const sql = `SELECT * FROM mobiles WHERE mob_uid = ($1)`;
      const result = await conct.query(sql, [mob_uid]);
      conct.release();
      console.log(result.command, result.rows);
      return result.rows;
    } catch (err) {
      throw new Error(`can't get mobile number (${mob_uid}) from table mobiles \n ${err}`);
    }
  }

  async createMob(values: Mobile): Promise<Mobile[]> {
    try {
      const conct = await pgClient.connect();
      const sql = `INSERT INTO mobiles (brand_name, model_name, manufacturer, price, made_in) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
      const result = await conct.query(sql, [
        values.brand_name,
        values.model_name,
        values.manufacturer,
        values.price,
        values.made_in,
      ]);
      conct.release();
      console.log(result.command, result.rows);
      return result.rows;
    } catch (err) {
      throw new Error(`Can't insert into table mobiles \n\n ${err}`);
    }
  }

  async createMobTest(values: Mobile): Promise<Mobile[]> {
    try {
      const conct = await pgClient.connect();
      const sql = `INSERT INTO mobiles (brand_name, model_name, manufacturer, price, made_in) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
      const result = await conct.query(sql, [
        values.brand_name,
        values.model_name,
        values.manufacturer,
        values.price,
        values.made_in,
      ]);
      conct.release();
      console.log(result.command, result.rows);
      return result.rows;
    } catch (err) {
      throw new Error(`Can't insert into table mobiles \n\n ${err}`);
    }
  }

  async updateMob(mob_uid: string, price: number): Promise<Mobile[]> {
    try {
      const conct = await pgClient.connect();
      const sql = `UPDATE mobiles SET price = ($2) WHERE mob_uid = ($1) RETURNING *`;
      const result = await conct.query(sql, [mob_uid, price]);
      conct.release();
      console.log(result.command, result.rowCount);
      return result.rows;
    } catch (err) {
      throw new Error(`Can't update mobile with id (${mob_uid}) from table mobiles \n\n ${err}`);
    }
  }

  async delMob(mob_uid: string): Promise<Mobile[]> {
    try {
      const conct = await pgClient.connect();
      const sql = `DELETE FROM mobiles WHERE mob_uid = ($1) RETURNING *`;
      const result = await conct.query(sql, [mob_uid]);
      conct.release();
      console.log(result.command, result.rowCount, result.rows[0]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Can't delete mobile with id (${mob_uid}) from table mobiles \n\n ${err}`);
    }
  }
}

export const mobileStore = new MobileStore();
