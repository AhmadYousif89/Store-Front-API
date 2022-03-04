import pgDB from "../database";
import { Orders, Error } from "../utils/control";

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
      const str = (err as Error).message?.includes("uuid");
      const enumStr = (err as Error).message?.includes("enum");
      const userFk = (err as Error).message?.includes("foreign");
      if (str) {
        errMsg = (err as Error).message
          ?.replace("", "Please enter a valid user id !.")
          .split(".")[0];
      } else if (enumStr) {
        errMsg = (err as Error).message
          ?.replace("", "Please enter value between (active) and (complete) for order status !.")
          .split(".")[0];
      } else if (userFk) {
        errMsg = (err as Error).message
          ?.replace("", "Incorrect user id or user does not exist !.")
          .split(".")[0];
      } else {
        errMsg = (err as Error).message?.replace(`relation "orders"`, "TABLE (orders)");
      }
      throw new Error(`Unable to create new Order - ${errMsg}`);
    }
  }
  // Get orders
  async getAllOrders(): Promise<Orders[]> {
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
      const sql = `SELECT * FROM orders WHERE id = ($1)`;
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
      const int = (err as Error).message?.includes("integer");
      if (int) {
        errMsg = (err as Error).message
          ?.replace(``, "Please enter a positive integer value for order id !.")
          .split(".")[0];
      } else {
        errMsg = (err as Error).message?.replace(`relation "orders"`, "TABLE (orders)");
      }
      throw new Error(`Unable to get order with id (${id}) - ${errMsg}`);
    }
  }
  // Update Orders
  async updateOrder(id: number, status: string): Promise<Orders | null> {
    try {
      const conct = await pgDB.connect();
      const sql = `UPDATE orders SET order_status = ($2) WHERE id = ($1) RETURNING *`;
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
      const userFk = (err as Error).message?.includes("foreign");
      const enumStr = (err as Error).message?.includes("enum");
      const int = (err as Error).message?.includes("integer");
      if (userFk) {
        errMsg = (err as Error).message
          ?.replace(``, "Please make sure you have a User first !.")
          .split(".")[0];
      } else if (enumStr) {
        errMsg = (err as Error).message
          ?.replace(``, "Please enter value between (active) and (complete) for order status !.")
          .split(".")[0];
      } else if (int) {
        errMsg = (err as Error).message
          ?.replace(``, "Please enter a positive integer value for order id !.")
          .split(".")[0];
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
      const sql = `DELETE FROM orders WHERE id = ($1) RETURNING *`;
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
      const str = (err as Error).message?.includes("uuid");
      const int = (err as Error).message?.includes("integer");
      if (str) {
        errMsg = (err as Error).message
          ?.replace(``, "Please enter valid order id !.")
          .split(".")[0];
      } else if (int) {
        errMsg = (err as Error).message
          ?.replace(``, "Please enter a positive integer value for order id !.")
          .split(".")[0];
      } else {
        errMsg = (err as Error).message?.replace(`relation "orders"`, "TABLE (orders)");
      }
      throw new Error(`Unable to delete orders with id (${id}) - ${errMsg}`);
    }
  }

  // Add new product order.
  async addProductToOrder(values: Orders): Promise<Orders | null> {
    try {
      // openning connection with db.
      const conct = await pgDB.connect();
      // making query.
      const sql = `INSERT INTO ordered_products (order_id, product_id, p_quantity) VALUES ($1, $2, $3) RETURNING order_id, product_id, p_quantity`;
      // retrieving query result.
      const result = await conct.query(sql, [values.order_id, values.product_id, values.quantity]);
      // check if row has been created.
      if (result.rows.length) {
        const product = result.rows[0];
        console.log(result.command, result.rows);
        conct.release();
        return {
          msg: `Product has been added successfully to order number ${values.order_id}`,
          data: product,
        };
      }
      return null;
    } catch (err) {
      const str = (err as Error).message?.includes("uuid");
      const strFK = (err as Error).message?.includes("foreign");
      if (str) {
        errMsg = (err as Error).message
          ?.replace("", "Please enter a valid product id !.")
          .split(".")[0];
      } else if (strFK) {
        errMsg = (err as Error).message
          ?.replace("", "Please enter a valid order id !.")
          .split(".")[0];
      } else {
        errMsg = (err as Error).message?.replace(
          `relation "ordered_products"`,
          "TABLE (ordered_products)"
        );
      }
      throw new Error(`Unable to add new order-product - ${errMsg}`);
    }
  }
}

export const ordersModel = new OrdersModel();
