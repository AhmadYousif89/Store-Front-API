import { PoolClient } from "pg";
import pgClient from "../../db/database";
import { Orders } from "../../types/types";

class OrdersModel {
  conct!: PoolClient;
  errMsg = "";
  async createOrder({ user_id, stripe_customerId, order_status }: Orders): Promise<Orders> {
    try {
      this.conct = await pgClient.connect();
      const sql = `
      INSERT INTO orders 
      (user_id, stripe_customerId, order_status) 
      VALUES ($1, $2, $3) RETURNING *`;
      const query = await this.conct.query(sql, [user_id, stripe_customerId, order_status]);
      const order = query.rows[0];
      this.conct.release();
      return order;
    } catch (err) {
      this.conct.release();
      throw new Error(`${err}`);
    }
  }

  async index(): Promise<Orders[]> {
    try {
      this.conct = await pgClient.connect();
      const sql = "SELECT * FROM orders";
      const query = await this.conct.query(sql);
      this.conct.release();
      return query.rows;
    } catch (err) {
      this.conct.release();
      throw new Error(`${err}`);
    }
  }

  async show({ _id }: Orders): Promise<Orders> {
    try {
      this.conct = await pgClient.connect();
      const sql = `SELECT * FROM orders WHERE _id = ($1)`;
      const query = await this.conct.query(sql, [_id]);
      const orders = query.rows[0];
      this.conct.release();
      return orders;
    } catch (err) {
      this.conct.release();
      throw new Error(`${err}`);
    }
  }

  async getUserOrders({ user_id }: Orders): Promise<Orders[]> {
    try {
      this.conct = await pgClient.connect();
      const sql = `SELECT * FROM orders WHERE user_id = ($1)`;
      const query = await this.conct.query(sql, [user_id]);
      const orders = query.rows;
      this.conct.release();
      return orders;
    } catch (err) {
      this.conct.release();
      throw new Error(`${err}`);
    }
  }

  async updateUserOrders({ _id, user_id, order_status }: Orders): Promise<Orders> {
    try {
      this.conct = await pgClient.connect();
      const sql = `
      UPDATE orders 
      SET order_status = ($3), updated_at = NOW() 
      WHERE user_id = ($2) AND _id = ($1) 
      RETURNING _id, order_status`;
      const query = await this.conct.query(sql, [_id, user_id, order_status?.toLowerCase()]);
      const order = query.rows[0];
      this.conct.release();
      return order;
    } catch (err) {
      this.conct.release();
      throw new Error(`${err}`);
    }
  }

  async deleteUserOrders({ user_id, _id }: Orders): Promise<Orders> {
    try {
      this.conct = await pgClient.connect();
      const sql = `
      DELETE FROM orders 
      WHERE user_id = ($1) AND _id = ($2) 
      RETURNING _id`;
      const query = await this.conct.query(sql, [user_id, _id]);
      const order = query.rows[0];
      this.conct.release();
      return order;
    } catch (err) {
      this.conct.release();
      throw new Error(`${err}`);
    }
  }

  async deleteAllOrders({ user_id }: Orders): Promise<Orders[]> {
    try {
      this.conct = await pgClient.connect();
      const sql = `DELETE FROM orders WHERE user_id = ($1) RETURNING _id`;
      const query = await this.conct.query(sql, [user_id]);
      const orders = query.rows;
      this.conct.release();
      return orders;
    } catch (err) {
      this.conct.release();
      throw new Error(`${err}`);
    }
  }
}

export const Order = new OrdersModel();
