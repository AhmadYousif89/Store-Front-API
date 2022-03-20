import pgDB from "../../database";
import { customErr, DbSchema } from "../../utils/control";

let errMsg;
// Business logic functions.
class Dashboard {
  // Get ordered products for specific user.
  async getUserProducts(uid: string): Promise<DbSchema[] | null> {
    try {
      const conct = await pgDB.connect();
      const sql = `
      SELECT op_id, orders.order_id, order_status, product_id, quantity, created_in FROM orders 
      JOIN ordered_products 
      ON orders.order_id = ordered_products.order_id 
      WHERE orders.user_id = ($1)`;
      const result = await conct.query(sql, [uid]);
      if (result.rows.length) {
        console.log(result.command, result.rowCount, result.rows);
        conct.release();
        return result.rows;
      }
      return null;
    } catch (err) {
      if ((err as Error).message?.includes("uuid")) {
        errMsg = customErr(err as Error, "Please enter a valid user id !.", ".");
      } else {
        errMsg = customErr(
          err as Error,
          "Make sure to add products to this user before tring to access this page !.",
          "."
        );
      }
      throw new Error(`Unable to get User data - ${errMsg}`);
    }
  }

  // Get ordered products for specific user by order id.
  async getUserProductsByOid(uid: string, oid: number): Promise<DbSchema[] | null> {
    try {
      const conct = await pgDB.connect();
      const sql = `
        SELECT op_id, order_status, product_id, quantity, created_in FROM orders
        JOIN ordered_products
        ON orders.order_id = ordered_products.order_id 
        WHERE orders.user_id = ($1) AND orders.order_id = ($2)`;
      const result = await conct.query(sql, [uid, oid]);
      if (result.rows.length) {
        console.log(result.command, result.rowCount, result.rows);
        conct.release();
        return result.rows;
      }
      return null;
    } catch (err) {
      if ((err as Error).message?.includes("uuid")) {
        errMsg = customErr(err as Error, "Please enter a valid user id !.", ".");
      } else if ((err as Error).message?.includes("integer")) {
        errMsg = customErr(err as Error, "Please enter a valid order id !.", ".");
      } else {
        errMsg = customErr(
          err as Error,
          "Make sure to add orders and products to this user before tring to access this page !.",
          "."
        );
      }
      throw new Error(`Unable to get User products data - ${errMsg}`);
    }
  }

  // Get user most recent purchases .
  async getUserMostPurchases(uid: string): Promise<DbSchema[] | null> {
    try {
      const conct = await pgDB.connect();
      const sql = `
      SELECT op_id, orders.order_id, order_status, product_id, quantity, created_in FROM orders 
      JOIN ordered_products 
      ON orders.order_id = ordered_products.order_id 
      WHERE orders.user_id = ($1) AND orders.order_status = 'complete' 
      ORDER BY created_in DESC`;
      const result = await conct.query(sql, [uid]);
      if (result.rows.length) {
        console.log(result.command, result.rowCount, result.rows);
        conct.release();
        return result.rows;
      }
      return null;
    } catch (err) {
      if ((err as Error).message?.includes("uuid")) {
        errMsg = customErr(err as Error, "Please enter a valid user id !.", ".");
      } else {
        errMsg = customErr(
          err as Error,
          "Make sure to add orders and products to this user before tring to access this page !.",
          "."
        );
      }
      throw new Error(`Unable to get User products data - ${errMsg}`);
    }
  }

  // Get Popular Products
  async getProductByPopularity(): Promise<DbSchema[]> {
    try {
      const conct = await pgDB.connect();
      const sql =
        "SELECT p_id, price, popular FROM products WHERE popular = 'yes' ORDER BY price DESC LIMIT 5";
      const result = await conct.query(sql);
      conct.release();
      console.log(result.command, result.rowCount, result.rows, "\n");
      return result.rows;
    } catch (err) {
      errMsg = customErr(err as Error, "TABLE (products) does not exist !.", ".");
      throw new Error(`Unable to get data - ${errMsg}`);
    }
  }
}

export const dashBoard = new Dashboard();
