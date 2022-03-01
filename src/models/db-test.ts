import pgDB from "../database";
import { Error } from "../utils/control";

export class StoreDB {
  async createTestDB(): Promise<void> {
    try {
      const conn = await pgDB.connect();
      const sql = "CREATE DATABASE tech_store_test;";
      conn.query(sql);
      conn.release();
      console.log("DB_test created");
    } catch (err) {
      throw new Error(`can't create database tech_store_test \n ${(err as Error).message}`);
    }
  }

  async dropTestDB(): Promise<void> {
    try {
      const conn = await pgDB.connect();
      const sql = "DROP DATABASE tech_store_test;";
      conn.query(sql);
      conn.release();
      console.log("DB_test droped");
    } catch (err) {
      throw new Error(`can't drop database tech_store_test \n ${(err as Error).message}`);
    }
  }

  async createTableMobiles(): Promise<void> {
    try {
      const conn = await pgDB.connect();
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
    } catch (err) {
      throw new Error(`can't create table mobiles \n ${(err as Error).message}`);
    }
  }

  async createTableUsers(): Promise<void> {
    try {
      const conn = await pgDB.connect();
      const sql = `
      CREATE TABLE mobiles (
      u_uid UUID PRIMARY KEY,
      username VARCHAR(100),
      u_password VARCHAR
    );`;
      await conn.query(sql);
      conn.release();
      console.log("Table created");
    } catch (err) {
      throw new Error(`can't create table users \n ${(err as Error).message}`);
    }
  }

  async dropTables(): Promise<void> {
    try {
      const conn = await pgDB.connect();
      const sql = "DROP TABLE mobiles , users , migrations;";
      await conn.query(sql);
      conn.release();
      console.log("Tables droped");
    } catch (err) {
      throw new Error(
        `can't drop tables from database ${process.env.PG_DB_TEST} \n ${(err as Error).message}`
      );
    }
  }
}

export const db = new StoreDB();
