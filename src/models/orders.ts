import pgDB from "../database";
import { Orders, Error, OP } from "../utils/control";

let errMsg: string | undefined;
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
          msg: `Orders created successfully`,
          data: orders,
        };
      }
      // colsing connection with db.
      conct.release();
      return null;
    } catch (err) {
      // handling error.
      // making my custom error syntax.
      errMsg = (err as Error).message?.replace(`relation "orders"`, "TABLE (orders)");
      throw new Error(`Unable to create new Orders - ${errMsg}`);
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
  async getOrderById(id: string): Promise<Orders | null> {
    try {
      const conct = await pgDB.connect();
      const sql = `SELECT * FROM orders WHERE id = ($1)`;
      const result = await conct.query(sql, [id]);
      if (result.rows.length) {
        const orders = result.rows[0];
        console.log(result.command, result.rowCount, orders);
        conct.release();
        return {
          msg: `Orders generated successfully`,
          data: orders,
        };
      }
      conct.release();
      return null;
    } catch (err) {
      const str = (err as Error).message?.includes("uuid");
      if (str) {
        errMsg = (err as Error).message?.replace(
          `invalid input syntax for type uuid: "${id}"`,
          "Please enter valid order id !"
        );
      } else {
        errMsg = (err as Error).message?.replace(`relation "orders"`, "TABLE (orders)");
      }
      throw new Error(`Unable to get orders with id (${id}) - ${errMsg}`);
    }
  }
  // Update Orders
  async updateOrder(id: string, status: string): Promise<Orders | null> {
    try {
      const conct = await pgDB.connect();
      const sql = `UPDATE orders SET status = ($2) WHERE id = ($1) RETURNING *`;
      const result = await conct.query(sql, [id, status]);
      if (result.rows.length) {
        const order = result.rows[0];
        console.log(result.command, result.rowCount, order);
        conct.release();
        return {
          msg: `Orders updated successfully`,
          data: order,
        };
      }
      conct.release();
      return null;
    } catch (err) {
      const str = (err as Error).message?.includes("uuid");
      if (str) {
        errMsg = (err as Error).message?.replace(
          `invalid input syntax for type uuid: "${id}"`,
          "Please enter valid order id !"
        );
      } else {
        errMsg = (err as Error).message?.replace(`relation "orders"`, "TABLE (orders)");
      }
      throw new Error(`Unable to update orders with id (${id}) - ${errMsg}`);
    }
  }
  // Delete Orders
  async delOrder(id: string): Promise<Orders | null> {
    try {
      const conct = await pgDB.connect();
      const sql = `DELETE FROM orders WHERE id = ($1) RETURNING *`;
      const result = await conct.query(sql, [id]);
      if (result.rows.length) {
        const orders = result.rows[0];
        console.log(result.command, result.rowCount, orders);
        conct.release();
        return {
          msg: `Orders deleted successfully`,
          data: orders,
        };
      }
      conct.release();
      return null;
    } catch (err) {
      const str = (err as Error).message?.includes("uuid");
      if (str) {
        errMsg = (err as Error).message?.replace(
          `invalid input syntax for type uuid: "${id}"`,
          "Please enter valid order id !"
        );
      } else {
        errMsg = (err as Error).message?.replace(`relation "orders"`, "TABLE (orders)");
      }
      throw new Error(`Unable to delete orders with id (${id}) - ${errMsg}`);
    }
  }

  // Add new product order.
  async addProductOrder(values: OP): Promise<OP | null> {
    try {
      // openning connection with db.
      const conct = await pgDB.connect();
      // making query.
      const sql = `INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING order_id, product_id, quantity`;
      // retrieving query result.
      const result = await conct.query(sql, [values.order_id, values.product_id, values.quantity]);
      // check if row has been created.
      if (result.rows.length) {
        const product = result.rows[0];
        console.log(result.command, result.rows);
        conct.release();
        return {
          msg: `Order-product added successfully`,
          data: product,
        };
      }
      return null;
    } catch (err) {
      errMsg = (err as Error).message?.replace(
        `relation "order_products"`,
        "TABLE (order_products)"
      );
      throw new Error(`Unable to add new order-product - ${errMsg}`);
    }
  }
}

export const ordersModel = new OrdersModel();
