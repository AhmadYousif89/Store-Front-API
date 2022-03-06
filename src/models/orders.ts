import pgDB from "../database";
import { Orders, Error, customErr } from "../utils/control";

let errMsg: unknown;
// Building CRUD System for Orders.
class OrdersModel {
  // Create Orders
  async createOrder(values: Orders): Promise<Orders | null> {
    try {
      // openning connection with db.
      const conct = await pgDB.connect();
      // making query.
      const sql = `INSERT INTO orders (order_status, user_id) VALUES ($1, $2) RETURNING *`;
      // retrieving query result.
      const result = await conct.query(sql, [values.order_status, values.user_id]);
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
      // colsing connection with db.
      conct.release();
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
        errMsg = (err as Error).message?.replace(`relation "orders"`, "TABLE (orders)");
      }
      throw new Error(`Unable to create new Order - ${errMsg}`);
    }
  }
  // Get orders
  async getOrders(): Promise<Orders[]> {
    try {
      const conct = await pgDB.connect();
      const sql = "SELECT * FROM orders";
      const result = await conct.query(sql);
      conct.release();
      console.log(result.command, result.rowCount, result.rows, "\n");
      return result.rows;
    } catch (err) {
      errMsg = (err as Error).message?.replace(`relation "orders"`, "TABLE (orders)");
      throw new Error(`Unable to get data - ${errMsg}`);
    }
  }
  // Get one order
  async getOrderById(id: number): Promise<Orders | null> {
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
      errMsg = (err as Error).message?.replace(`relation "orders"`, "TABLE (orders)");
      throw new Error(`Unable to get order with id (${id}) - ${errMsg}`);
    }
  }
  // Update Orders
  async updateOrder(id: number, status: string): Promise<Orders | null> {
    try {
      const conct = await pgDB.connect();
      const sql = `UPDATE orders SET order_status = ($2) WHERE o_id = ($1) RETURNING *`;
      const result = await conct.query(sql, [id, status]);
      if (result.rows.length) {
        const order = result.rows[0];
        console.log(result.command, result.rowCount, order);
        conct.release();
        return {
          msg: `Order updated successfully`,
          data: order,
        };
      }
      conct.release();
      return null;
    } catch (err) {
      if ((err as Error).message?.includes("enum")) {
        errMsg = customErr(
          err as Error,
          "Please enter value between [ active | complete ] for order status !.",
          "."
        );
      } else {
        errMsg = (err as Error).message?.replace(`relation "orders"`, "TABLE (orders)");
      }
      throw new Error(`Unable to update orders with id (${id}) - ${errMsg}`);
    }
  }
  // Delete Orders
  async delOrder(id: number): Promise<Orders | null> {
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
        errMsg = (err as Error).message?.replace(`relation "orders"`, "TABLE (orders)");
      }
      throw new Error(`Unable to delete orders with id (${id}) - ${errMsg}`);
    }
  }
}

export const orderModel = new OrdersModel();
