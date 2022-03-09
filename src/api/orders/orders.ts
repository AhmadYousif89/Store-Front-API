import pgDB from "../../database";
import { Error, customErr, DbSchema } from "../../utils/control";

let errMsg: unknown;
// Building CRUD System for Orders.
class OrdersModel {
  // Create Orders
  async create(values: DbSchema): Promise<DbSchema | null> {
    // don't set new orders as complete.
    if (values.order_status === "complete") {
      return { msg: `New orders can not be set as (${values.order_status})` };
    }
    try {
      // openning connection with db.
      const conct = await pgDB.connect();
      // making query.
      const sql = `INSERT INTO orders (order_status, user_id) VALUES ($1, $2) RETURNING *`;
      // retrieving query result.
      const result = await conct.query(sql, [values.order_status, values.u_id]);
      // check if row has been created.
      if (result.rows.length) {
        const orders = result.rows[0];
        console.log(result.command, result.rows);
        // colsing connection with db.
        conct.release();
        return {
          msg: `Order created successfully`,
          data: orders,
        };
      }
      return null;
    } catch (err) {
      // handling error.
      // making my custom error syntax.
      if ((err as Error).message?.includes("uuid")) {
        errMsg = customErr(err as Error, "Please enter a valid user id !.", ".");
      } else if ((err as Error).message?.includes("enum")) {
        errMsg = customErr(
          err as Error,
          "Please enter value between [ new | active ] for order status !.",
          "."
        );
      } else if ((err as Error).message?.includes("foreign")) {
        errMsg = customErr(err as Error, "Incorrect user id or user does not exist !.", ".");
      } else {
        errMsg = customErr(err as Error, "TABLE (orders) does not exist !.", ".");
      }
      throw new Error(`Unable to create new Order - ${errMsg}`);
    }
  }
  // Get orders
  async index(): Promise<DbSchema[]> {
    try {
      const conct = await pgDB.connect();
      const sql = "SELECT * FROM orders";
      const result = await conct.query(sql);
      conct.release();
      console.log(result.command, result.rowCount, result.rows, "\n");
      return result.rows;
    } catch (err) {
      errMsg = customErr(err as Error, "TABLE (orders) does not exist !.", ".");
      throw new Error(`Unable to get data - ${errMsg}`);
    }
  }
  // Get one order
  async show(id: number): Promise<DbSchema | null> {
    try {
      const conct = await pgDB.connect();
      const sql = `SELECT * FROM orders WHERE o_id = ($1)`;
      const result = await conct.query(sql, [id]);
      if (result.rows.length) {
        const orders = result.rows[0];
        console.log(result.command, result.rowCount, orders);
        conct.release();
        return {
          msg: `Order generated successfully`,
          data: orders,
        };
      }
      conct.release();
      return null;
    } catch (err) {
      errMsg = customErr(err as Error, "TABLE (orders) does not exist !.", ".");
      throw new Error(`Unable to get order with id (${id}) - ${errMsg}`);
    }
  }
  // Update Orders
  async update(oid: number, status: string): Promise<DbSchema | null> {
    // check if order status
    try {
      const sql = "SELECT * FROM orders WHERE o_id = ($1) ";
      const conn = await pgDB.connect();
      const result = await conn.query(sql, [oid]);
      const order = result.rows[0];
      // check if the order status is complete
      if (order.order_status === "complete") {
        conn.release();
        return {
          msg: `Can not set status of Order number (${oid}) to (${status}) because it is already (${order.order_status}) - you may review your order or delete it if you want !`,
        };
      }
      // check for other status
      if (order.order_status === status) {
        conn.release();
        return { msg: `Order number (${oid}) already has a status of (${order.order_status}) ` };
      } else {
        try {
          const conct = await pgDB.connect();
          const sql = `UPDATE orders SET order_status = ($2) WHERE o_id = ($1) RETURNING *`;
          const result = await conct.query(sql, [oid, status]);
          if (result.rows.length) {
            const order = result.rows[0];
            console.log(result.command, result.rowCount, order);
            conct.release();
            return {
              msg: `Order updated successfully`,
              data: order,
            };
          }
          return null;
        } catch (err) {
          if ((err as Error).message?.includes("enum")) {
            errMsg = customErr(
              err as Error,
              "Please enter value between [ active | complete ] for order status !.",
              "."
            );
          } else {
            errMsg = customErr(err as Error, "TABLE (orders) does not exist !.", ".");
          }
          throw new Error(`Unable to update orders with id (${oid}) - ${errMsg}`);
        }
      }
    } catch (err) {
      // if we don't have the order in the table.
      if ((err as Error).message?.includes("undefined")) {
        errMsg = customErr(err as Error, "Incorrect order id or order does not exist !.", ".");
      } else {
        errMsg = err;
      }
      throw new Error(`${errMsg}`);
    }
  }
  // Delete Orders
  async delete(id: number): Promise<DbSchema | null> {
    try {
      const conct = await pgDB.connect();
      const sql = `DELETE FROM orders WHERE o_id = ($1) RETURNING *`;
      const result = await conct.query(sql, [id]);
      if (result.rows.length) {
        const orders = result.rows[0];
        console.log(result.command, result.rowCount, orders);
        conct.release();
        return {
          msg: `Order deleted successfully`,
          data: orders,
        };
      }
      conct.release();
      return null;
    } catch (err) {
      if ((err as Error).message?.includes("foreign")) {
        errMsg = customErr(
          err as Error,
          "Please remove any products related to this order first !.",
          "."
        );
      } else {
        errMsg = customErr(err as Error, "TABLE (orders) does not exist !.", ".");
      }
      throw new Error(`Unable to delete order with id (${id}) - ${errMsg}`);
    }
  }
}

export const orderModel = new OrdersModel();
