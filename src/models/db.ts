import pgDB from "../database";
import { Error } from "../utils/control";

const { PG_DB } = process.env;
class StoreDB {
  async createTableUsers(): Promise<void> {
    try {
      const conn = await pgDB.connect();
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
    } catch (err) {
      throw new Error(
        `Unable to create table users in database ${PG_DB} - ${(err as Error).message}`
      );
    }
  }

  async createTableMobiles(): Promise<void> {
    try {
      const conn = await pgDB.connect();
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
    } catch (err) {
      throw new Error(
        `Unable to create table mobiles in database ${PG_DB} - ${(err as Error).message}`
      );
    }
  }

  async dropTables(): Promise<void> {
    try {
      const conn = await pgDB.connect();
      const sql = "DROP TABLE IF EXISTS mobiles , users;";
      await conn.query(sql);
      conn.release();
      console.log("Tables droped");
    } catch (err) {
      throw new Error(`Unable to drop tables from database ${PG_DB} - ${(err as Error).message}`);
    }
  }
}

export const db = new StoreDB();
