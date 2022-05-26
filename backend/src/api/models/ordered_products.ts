import { PoolClient } from "pg";
import pgClient from "../../db/database";
import { OP } from "../../types/types";
import { customErr } from "../../helpers/control";

class OrderedProducts {
  conct!: PoolClient;
  errMsg = "";
  async addProducts({ order_id, product_id, quantity }: OP, userId: string): Promise<OP> {
    try {
      this.conct = await pgClient.connect();
      const sql = "SELECT order_status, user_id FROM orders WHERE _id = ($1)";
      const query = await this.conct.query(sql, [order_id]);
      const user_id = query.rows[0].user_id;
      if (user_id !== userId) {
        throw new Error(`invalid user signature`);
      }
      const status = query.rows[0].order_status;
      if (status === "complete") {
        throw new Error(`can't add more products as order status is (${status})`);
      }
    } catch (err) {
      this.conct.release();
      if ((err as Error).message?.includes("undefined")) {
        this.errMsg = customErr(err as Error, "Incorrect order id or order does not exist !.", ".");
      } else {
        this.errMsg = err as string;
      }
      throw new Error(`${this.errMsg}`);
    }
    try {
      this.conct = await pgClient.connect();
      const sql = `
      INSERT INTO ordered_products 
      (order_id, product_id, quantity) 
      VALUES ($1, $2, $3) RETURNING *`;
      const query = await this.conct.query(sql, [order_id, product_id, quantity]);
      const product = query.rows[0];
      this.conct.release();
      return product;
    } catch (err) {
      this.conct.release();
      if ((err as Error).message?.includes("foreign")) {
        this.errMsg = customErr(
          err as Error,
          "Incorrect product id or product does not exist !.",
          "."
        );
      } else {
        this.errMsg = err as string;
      }
      throw new Error(`${this.errMsg}`);
    }
  }

  async index(): Promise<OP[]> {
    try {
      this.conct = await pgClient.connect();
      const sql = "SELECT * FROM ordered_products";
      const query = await this.conct.query(sql);
      this.conct.release();
      return query.rows;
    } catch (err) {
      this.conct.release();
      throw new Error(`${err}`);
    }
  }

  async show({ _id }: OP): Promise<OP> {
    try {
      this.conct = await pgClient.connect();
      const sql = `SELECT * FROM ordered_products WHERE _id = ($1)`;
      const query = await this.conct.query(sql, [_id]);
      const data = query.rows[0];
      this.conct.release();
      return data;
    } catch (err) {
      this.conct.release();
      throw new Error(`${err}`);
    }
  }

  async updateUserOrderedProduct(
    { order_id, product_id, quantity }: OP,
    userId: string
  ): Promise<OP> {
    try {
      this.conct = await pgClient.connect();
      const sql = "SELECT order_status, user_id FROM orders WHERE _id = ($1)";
      const query = await this.conct.query(sql, [order_id]);
      const user_id = query.rows[0].user_id;
      if (user_id !== userId) {
        throw new Error(`invalid user signature`);
      }
      const status = query.rows[0].order_status;
      if (status === "complete") {
        throw new Error(`can't modify quantity for completed orders`);
      }
    } catch (err) {
      this.conct.release();
      throw new Error(`${err}`);
    }
    try {
      this.conct = await pgClient.connect();
      const sql = `
      UPDATE ordered_products 
      SET quantity = ($3), updated_at = NOW() 
      WHERE product_id = ($2) AND order_id =($1) RETURNING quantity`;
      const query = await this.conct.query(sql, [order_id, product_id, quantity]);
      const product = query.rows[0];
      this.conct.release();
      return product;
    } catch (err) {
      this.conct.release();
      throw new Error(`${err}`);
    }
  }

  async delUserOrderedProduct({ order_id }: OP, userId: string): Promise<OP> {
    try {
      this.conct = await pgClient.connect();
      const sql = "SELECT user_id FROM orders WHERE _id = ($1)";
      const query = await this.conct.query(sql, [order_id]);
      const user_id = query.rows[0].user_id;
      if (user_id !== userId) {
        throw new Error(`invalid user signature`);
      }
    } catch (err) {
      this.conct.release();
      throw new Error(`${err}`);
    }
    try {
      this.conct = await pgClient.connect();
      const sql = `DELETE FROM ordered_products WHERE order_id = ($1) RETURNING order_id`;
      const query = await this.conct.query(sql, [order_id]);
      const order = query.rows[0];
      this.conct.release();
      return order;
    } catch (err) {
      this.conct.release();
      throw new Error(`${err}`);
    }
  }

  async getUserOrderedProducts<T>(uid: string): Promise<T[] | null> {
    try {
      this.conct = await pgClient.connect();
      const sql = `
      SELECT product_id, orders._id as order_id, order_status, quantity, ordered_products.created_at 
      FROM orders JOIN ordered_products 
      ON orders._id = ordered_products.order_id 
      WHERE orders.user_id = ($1)`;
      const result = await this.conct.query(sql, [uid]);
      if (result.rows.length) {
        this.conct.release();
        return result.rows;
      }
      this.conct.release();
      return null;
    } catch (err) {
      this.conct.release();

      throw new Error(`${err}`);
    }
  }

  async getUserOrderedProductsByid<T>(uid: string, oid: string): Promise<T[] | null> {
    try {
      this.conct = await pgClient.connect();
      const sql = `
        SELECT product_id, orders._id as order_id, order_status, quantity, ordered_products.created_at 
        FROM orders JOIN ordered_products
        ON orders._id = ordered_products.order_id 
        WHERE orders.user_id = ($1) AND orders._id = ($2)`;
      const result = await this.conct.query(sql, [uid, oid]);
      if (result.rows.length) {
        this.conct.release();
        return result.rows;
      }
      this.conct.release();
      return null;
    } catch (err) {
      this.conct.release();
      throw new Error(`${err}`);
    }
  }
}

export const OPT = new OrderedProducts();
