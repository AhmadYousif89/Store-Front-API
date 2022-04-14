import { PoolClient } from "pg";
import pgDB from "../../database";
import { customErr } from "../../utils/control";

let conct: PoolClient;
let errMsg;
// Business logic functions.
class Dashboard {
  // Get ordered products for specific user.
  async getUserProducts<T>(uid: string): Promise<T[] | null> {
    try {
      conct = await pgDB.connect();
      const sql = `
      SELECT op_id, orders.order_id, order_status, product_id, quantity, created_at FROM orders 
      JOIN ordered_products 
      ON orders.order_id = ordered_products.order_id 
      WHERE orders.user_id = ($1)`;
      const result = await conct.query(sql, [uid]);
      if (result.rows.length) {
        conct.release();
        return result.rows;
      }
      conct.release();
      return null;
    } catch (err) {
      conct.release();
      if ((err as Error).message?.includes("uuid")) {
        errMsg = customErr(err as Error, "Please enter a valid user id !.", ".");
      } else {
        errMsg = customErr(
          err as Error,
          "Make sure to add products to this user before trying to access this page !.",
          "."
        );
      }
      throw new Error(`Unable to get User data - ${errMsg}`);
    }
  }

  // Get ordered products for specific user by order id.
  async getUserProductsByOid<T>(uid: string, oid: number): Promise<T[] | null> {
    try {
      conct = await pgDB.connect();
      const sql = `
        SELECT op_id, order_status, product_id, quantity, created_at FROM orders
        JOIN ordered_products
        ON orders.order_id = ordered_products.order_id 
        WHERE orders.user_id = ($1) AND orders.order_id = ($2)`;
      const result = await conct.query(sql, [uid, oid]);
      if (result.rows.length) {
        conct.release();
        return result.rows;
      }
      conct.release();
      return null;
    } catch (err) {
      conct.release();
      if ((err as Error).message?.includes("uuid")) {
        errMsg = customErr(err as Error, "Please enter a valid user id !.", ".");
      } else if ((err as Error).message?.includes("integer")) {
        errMsg = customErr(err as Error, "Please enter a valid order id !.", ".");
      } else {
        errMsg = customErr(
          err as Error,
          "Make sure to add orders and products to this user before trying to access this page !.",
          "."
        );
      }
      throw new Error(`Unable to get User products data - ${errMsg}`);
    }
  }

  // Get user most recent purchases .
  async getUserMostPurchases<T>(uid: string): Promise<T[] | null> {
    try {
      conct = await pgDB.connect();
      const sql = `
      SELECT op_id, orders.order_id, order_status, product_id, quantity, created_at FROM orders 
      JOIN ordered_products 
      ON orders.order_id = ordered_products.order_id 
      WHERE orders.user_id = ($1) AND orders.order_status = 'complete' 
      ORDER BY created_at DESC`;
      const result = await conct.query(sql, [uid]);
      if (result.rows.length) {
        conct.release();
        return result.rows;
      }
      conct.release();
      return null;
    } catch (err) {
      conct.release();
      if ((err as Error).message?.includes("uuid")) {
        errMsg = customErr(err as Error, "Please enter a valid user id !.", ".");
      } else {
        errMsg = customErr(
          err as Error,
          "Make sure to add orders and products to this user before trying to access this page !.",
          "."
        );
      }
      throw new Error(`Unable to get User products data - ${errMsg}`);
    }
  }
}

export const dashBoard = new Dashboard();
