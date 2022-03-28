import { PoolClient } from "pg";
import pgDB from "../../database";
import { Error, customErr, DbSchema } from "../../utils/control";

let conct: PoolClient;
let errMsg: string | undefined;
// Building CRUD System for Orders.
class OrdersModel {
  // Create Orders
  async create(values: DbSchema): Promise<DbSchema | null> {
    // don't set new orders as complete.
    if (values.order_status === "complete") {
      return { message: `New orders can not be set as (${values.order_status})` };
    }
    try {
      // openning connection with db.
      conct = await pgDB.connect();
      // making query.
      const sql = `INSERT INTO orders (order_status, user_id) VALUES ($1, $2) RETURNING *`;
      // retrieving query result.
      const result = await conct.query(sql, [values.order_status, values.u_id]);
      // check if row has been created.
      if (result.rows.length) {
        const orders = result.rows[0];
        console.log(result.command, orders);
        // colsing connection with db.
        conct.release();
        return {
          message: `Order created successfully`,
          data: orders,
        };
      }
      conct.release();
      return null;
    } catch (err) {
      // handling error.
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
      } else if ((err as Error).message?.includes("relation")) {
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
      const result = await conct.query(sql);
      conct.release();
      console.log(result.command, result.rowCount, result.rows, "\n");
      return result.rows;
    } catch (err) {
      conct.release();
      if ((err as Error).message?.includes("relation")) {
        errMsg = customErr(err as Error, "TABLE (orders) does not exist !.", ".");
      } else {
        errMsg = err as string;
      }
      throw new Error(`Unable to get data - ${errMsg}`);
    }
  }
  // Get one order
  async show(id: number): Promise<DbSchema | null> {
    try {
      conct = await pgDB.connect();
      const sql = `SELECT * FROM orders WHERE order_id = ($1)`;
      const result = await conct.query(sql, [id]);
      if (result.rows.length) {
        const orders = result.rows[0];
        console.log(result.command, result.rowCount, orders);
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
      if ((err as Error).message?.includes("relation")) {
        errMsg = customErr(err as Error, "TABLE (orders) does not exist !.", ".");
      } else {
        errMsg = err as string;
      }
      throw new Error(`Unable to get order with id (${id}) - ${errMsg}`);
    }
  }
  // Update Orders
  async update(oid: number, status: string): Promise<DbSchema | null> {
    try {
      conct = await pgDB.connect();
      const sql1 = `SELECT * FROM orders WHERE order_id = ($1)`;
      const rowResult = await conct.query(sql1, [oid]);
      const order_status = rowResult.rows[0].order_status;
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
      const updateResult = await conct.query(sql2, [oid, status]);
      if (updateResult.rows.length) {
        const order = updateResult.rows[0];
        console.log(updateResult.command, updateResult.rowCount, order);
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
      } else if ((err as Error).message?.includes("relation")) {
        errMsg = customErr(err as Error, "TABLE (orders) does not exist !.", ".");
      } else {
        errMsg = err as string;
      }
      throw new Error(`Unable to update orders with id (${oid}) - ${errMsg}`);
    }
  }
  // Delete Orders
  async delete(id: number): Promise<DbSchema | null> {
    try {
      conct = await pgDB.connect();
      const sql = `DELETE FROM orders WHERE order_id = ($1) RETURNING *`;
      const result = await conct.query(sql, [id]);
      if (result.rows.length) {
        const orders = result.rows[0];
        console.log(result.command, result.rowCount, orders);
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
      } else if ((err as Error).message?.includes("relation")) {
        errMsg = customErr(err as Error, "TABLE (orders) does not exist !.", ".");
      } else {
        errMsg = err as string;
      }
      throw new Error(`Unable to delete order with id (${id}) - ${errMsg}`);
    }
  }
}

export const orderModel = new OrdersModel();
