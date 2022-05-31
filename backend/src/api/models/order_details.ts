import { PoolClient } from "pg";
import pgClient from "../../db/database";
import { OrderDetail } from "../../types/types";

class Order_Details {
  conct!: PoolClient;
  errMsg = "";
  async createOrderDetails({ _id, customerId, order_info }: OrderDetail): Promise<OrderDetail> {
    try {
      this.conct = await pgClient.connect();
      const sql = `
      INSERT INTO order_details (_id, customerId, order_info) VALUES ($1, $2, $3) RETURNING *`;
      const query = await this.conct.query(sql, [_id, customerId, order_info]);
      const order = query.rows[0];
      this.conct.release();
      return order;
    } catch (err) {
      this.conct.release();
      throw new Error(`${err}`);
    }
  }

  async index(): Promise<OrderDetail[]> {
    try {
      this.conct = await pgClient.connect();
      const sql = "SELECT * FROM order_details";
      const query = await this.conct.query(sql);
      this.conct.release();
      return query.rows;
    } catch (err) {
      this.conct.release();
      throw new Error(`${err}`);
    }
  }

  async show({ _id }: OrderDetail): Promise<OrderDetail> {
    try {
      this.conct = await pgClient.connect();
      const sql = `SELECT * FROM order_details WHERE _id = ($1)`;
      const query = await this.conct.query(sql, [_id]);
      const data = query.rows[0];
      this.conct.release();
      return data;
    } catch (err) {
      this.conct.release();
      throw new Error(`${err}`);
    }
  }

  async updateUserOrderDetails(
    { _id, order_info }: OrderDetail,
    userId: string
  ): Promise<OrderDetail> {
    try {
      this.conct = await pgClient.connect();
      const sql = "SELECT order_status, user_id FROM orders WHERE _id = ($1)";
      const query = await this.conct.query(sql, [_id]);
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
      UPDATE order_details 
      SET order_info = ($2), updated_at = NOW() 
      WHERE _id = ($1) RETURNING *`;
      const query = await this.conct.query(sql, [order_info]);
      const product = query.rows[0];
      this.conct.release();
      return product;
    } catch (err) {
      this.conct.release();
      throw new Error(`${err}`);
    }
  }

  async delUserOrderDetails({ _id }: OrderDetail, userId: string): Promise<OrderDetail> {
    try {
      this.conct = await pgClient.connect();
      const sql = "SELECT user_id FROM orders WHERE _id = ($1)";
      const query = await this.conct.query(sql, [_id]);
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
      const sql = `DELETE FROM order_details WHERE _id = ($1) RETURNING order_id`;
      const query = await this.conct.query(sql, [_id]);
      const order = query.rows[0];
      this.conct.release();
      return order;
    } catch (err) {
      this.conct.release();
      throw new Error(`${err}`);
    }
  }

  async getUserOrderDetails<T>(uid: string): Promise<T[] | null> {
    try {
      this.conct = await pgClient.connect();
      const sql = `SELECT * FROM order_details WHERE _id = ($1)`;
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

  async getUserOrderDetailsByid<T>(uid: string, oid: string): Promise<T[] | null> {
    try {
      this.conct = await pgClient.connect();
      const sql = `
        SELECT product_id, orders._id as order_id, order_status, quantity, order_details.created_at 
        FROM orders JOIN order_details
        ON orders._id = order_details._id 
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

export const OrderDetails = new Order_Details();
