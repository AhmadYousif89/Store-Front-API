import { PoolClient } from "pg";
import pgDB from "../../database";
import { Error, customErr, DbSchema } from "../../utils/control";

let conct: PoolClient;
let errMsg: string | undefined;
class OrdersModel {
  async create(values: DbSchema): Promise<DbSchema | null> {
    // don't set new orders as complete.
    if (values.order_status === "complete") {
      return { message: `New orders can not be set as (${values.order_status})` };
    }
    try {
      conct = await pgDB.connect();
      const sql = `INSERT INTO orders (order_status, user_id) VALUES ($1, $2) RETURNING *`;
      const query = await conct.query(sql, [values.order_status, values.user_id]);
      if (query.rows.length) {
        const orders = query.rows[0];
        conct.release();
        return {
          message: `Order created successfully`,
          data: orders,
        };
      }
      conct.release();
      return null;
    } catch (err) {
      conct.release();
      if ((err as Error).message?.includes("uuid")) {
        errMsg = customErr(err as Error, "Please enter a valid user id !.", ".");
      } else if ((err as Error).message?.includes("enum")) {
        errMsg = customErr(
          err as Error,
          "Please enter a value between [ new | active ] for order status !.",
          "."
        );
      } else if ((err as Error).message?.includes("foreign")) {
        errMsg = customErr(err as Error, "Incorrect user id or user does not exist !.", ".");
      } else if ((err as Error).message?.includes("not exist")) {
        errMsg = customErr(err as Error, "TABLE (orders) does not exist !.", ".");
      } else {
        errMsg = err as string;
      }
      throw new Error(`Unable to create new Order - ${errMsg}`);
    }
  }

  // Get orders
  async index(): Promise<DbSchema[]> {
    try {
      conct = await pgDB.connect();
      const sql = "SELECT * FROM orders";
      const query = await conct.query(sql);
      conct.release();
      return query.rows;
    } catch (err) {
      conct.release();
      if ((err as Error).message?.includes("not exist")) {
        errMsg = customErr(err as Error, "TABLE (orders) does not exist !.", ".");
      } else {
        errMsg = err as string;
      }
      throw new Error(`Unable to get data - ${errMsg}`);
    }
  }

  // Get one order
  async show(oid: number): Promise<DbSchema | null> {
    try {
      conct = await pgDB.connect();
      const sql = `SELECT * FROM orders WHERE order_id = ($1)`;
      const query = await conct.query(sql, [oid]);
      if (query.rows.length) {
        const orders = query.rows[0];
        conct.release();
        return {
          message: `Order generated successfully`,
          data: orders,
        };
      }
      conct.release();
      return null;
    } catch (err) {
      conct.release();
      if ((err as Error).message?.includes("not exist")) {
        errMsg = customErr(err as Error, "TABLE (orders) does not exist !.", ".");
      } else {
        errMsg = err as string;
      }
      throw new Error(`Unable to get order with id (${oid}) - ${errMsg}`);
    }
  }

  // Update Orders
  async update(oid: number, status: string): Promise<DbSchema | null> {
    try {
      conct = await pgDB.connect();
      const sql1 = `SELECT * FROM orders WHERE order_id = ($1)`;
      const query = await conct.query(sql1, [oid]);
      const order_status = query.rows[0].order_status;
      // checking if order has status of (complete) or have the same incoming status
      if (order_status === "complete") {
        conct.release();
        return {
          message: `Order number (${oid}) already has a status of (complete) - you may review your order or delete it if you want !`,
        };
      } else if (order_status === status) {
        conct.release();
        return {
          message: `Order number (${oid}) already has a status of (${order_status}) !`,
        };
      }
      const sql2 = `UPDATE orders SET order_status = ($2) WHERE order_id = ($1) RETURNING *`;
      const updateQuery = await conct.query(sql2, [oid, status]);
      if (updateQuery.rows.length) {
        const order = updateQuery.rows[0];
        conct.release();
        return {
          message: `Order updated successfully`,
          data: order,
        };
      }
      conct.release();
      return null;
    } catch (err) {
      conct.release();
      if ((err as Error).message?.includes("undefined")) {
        errMsg = customErr(err as Error, "Incorrect order id or order does not exist !.", ".");
      } else if ((err as Error).message?.includes("enum")) {
        errMsg = customErr(
          err as Error,
          "Please enter value between [ active | complete ] for order status !.",
          "."
        );
      } else if ((err as Error).message?.includes("not exist")) {
        errMsg = customErr(err as Error, "TABLE (orders) does not exist !.", ".");
      } else {
        errMsg = err as string;
      }
      throw new Error(`Unable to update orders with id (${oid}) - ${errMsg}`);
    }
  }

  // Delete Orders
  async delete(oid: number): Promise<DbSchema | null> {
    try {
      conct = await pgDB.connect();
      const sql = `DELETE FROM orders WHERE order_id = ($1) RETURNING *`;
      const query = await conct.query(sql, [oid]);
      if (query.rows.length) {
        const orders = query.rows[0];
        conct.release();
        return {
          message: `Order deleted successfully`,
          data: orders,
        };
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
      } else if ((err as Error).message?.includes("not exist")) {
        errMsg = customErr(err as Error, "TABLE (orders) does not exist !.", ".");
      } else {
        errMsg = err as string;
      }
      throw new Error(`Unable to delete order with id (${oid}) - ${errMsg}`);
    }
  }
}

export const orderModel = new OrdersModel();
