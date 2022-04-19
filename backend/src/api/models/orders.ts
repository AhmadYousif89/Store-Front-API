import { PoolClient } from "pg";
import pgDB from "../../database";
import { Error, customErr, Orders } from "../../utils/control";

let conct: PoolClient;
let errMsg: string | undefined;
class OrdersModel {
  async create(values: Orders): Promise<Orders | object | null> {
    // don't set new orders as complete.
    if (values.order_status === "complete") {
      return { message: `New orders can not be set as (${values.order_status})` };
    }
    try {
      conct = await pgDB.connect();
      const sql = `INSERT INTO orders (user_id) VALUES ($1) RETURNING *`;
      const query = await conct.query(sql, [values.user_id]);
      if (query.rows.length) {
        const orders = query.rows[0];
        conct.release();
        return orders;
      }
      conct.release();
      return null;
    } catch (err) {
      conct.release();
      if ((err as Error).message?.includes("uuid")) {
        errMsg = customErr(err as Error, "Please enter a valid user id !.", ".");
      } else if ((err as Error).message?.includes("foreign")) {
        errMsg = customErr(err as Error, "Incorrect user id or user does not exist !.", ".");
      } else {
        errMsg = err as string;
      }
      throw new Error(`Unable to create new Order - ${errMsg}`);
    }
  }

  // Get orders
  async index(): Promise<Orders[]> {
    try {
      conct = await pgDB.connect();
      const sql = "SELECT * FROM orders";
      const query = await conct.query(sql);
      conct.release();
      return query.rows;
    } catch (err) {
      conct.release();
      throw new Error(`${err}`);
    }
  }

  // Get one order
  async show({ order_id }: Orders): Promise<Orders | null> {
    try {
      conct = await pgDB.connect();
      const sql = `SELECT * FROM orders WHERE order_id = ($1)`;
      const query = await conct.query(sql, [order_id]);
      if (query.rows.length) {
        const orders = query.rows[0];
        conct.release();
        return orders;
      }
      conct.release();
      return null;
    } catch (err) {
      conct.release();
      throw new Error(`${err}`);
    }
  }

  // Update Orders
  async update(values: Orders): Promise<Orders | object | null> {
    try {
      conct = await pgDB.connect();
      const sql1 = `SELECT * FROM orders WHERE order_id = ($1)`;
      const query = await conct.query(sql1, [values.order_id]);
      const status = query.rows[0].order_status;
      // checking if order has status of (complete) or have the same incoming status
      if (status === "complete") {
        throw new Error(
          `Order number (${values.order_id}) already has a status of (${status}) - you may review your order or delete it if you want !`
        );
      } else if (values.order_status?.toLocaleLowerCase() === status) {
        throw new Error(`Order number (${values.order_id}) already has a status of (${status}) !`);
      }
    } catch (err) {
      conct.release();
      if ((err as Error).message?.includes("undefined")) {
        errMsg = customErr(err as Error, "Incorrect order id or order does not exist !.", ".");
      } else {
        errMsg = err as string;
      }
      throw new Error(`${errMsg}`);
    }
    try {
      const sql = `UPDATE orders SET order_status = ($2) , updated_at = NOW() WHERE order_id = ($1) RETURNING *`;
      const query = await conct.query(sql, [values.order_id, values.order_status]);
      if (query.rows.length) {
        const order = query.rows[0];
        conct.release();
        return order;
      }
      conct.release();
      return null;
    } catch (err) {
      conct.release();
      if ((err as Error).message?.includes("enum")) {
        errMsg = customErr(
          err as Error,
          "Please enter value between [ active | complete ] for order status !.",
          "."
        );
      } else {
        errMsg = err as string;
      }
      throw new Error(`Unable to update orders with id (${values.order_id}) - ${errMsg}`);
    }
  }

  // Delete Orders
  async delete({ order_id }: Orders): Promise<Orders | null> {
    try {
      conct = await pgDB.connect();
      const sql = `DELETE FROM orders WHERE order_id = ($1) RETURNING *`;
      const query = await conct.query(sql, [order_id]);
      if (query.rows.length) {
        const orders = query.rows[0];
        conct.release();
        return orders;
      }
      conct.release();
      return null;
    } catch (err) {
      conct.release();
      if ((err as Error).message?.includes("foreign")) {
        errMsg = customErr(
          err as Error,
          "Please remove any products related to this order first !.",
          "."
        );
      } else {
        errMsg = err as string;
      }
      throw new Error(`Unable to delete order with id (${order_id}) - ${errMsg}`);
    }
  }

  // Get user orders.
  async getUserOrders({ user_id }: Orders): Promise<Orders[]> {
    try {
      conct = await pgDB.connect();
      const sql = `SELECT order_id, order_status, created_at FROM orders WHERE user_id = ($1)`;
      const result = await conct.query(sql, [user_id]);
      conct.release();
      return result.rows;
    } catch (err) {
      conct.release();
      if ((err as Error).message?.includes("uuid")) {
        errMsg = customErr(err as Error, "please enter a valid user id !.", ".");
      } else {
        errMsg = err as string;
      }
      throw new Error(`${errMsg}`);
    }
  }
}

export const orderModel = new OrdersModel();
