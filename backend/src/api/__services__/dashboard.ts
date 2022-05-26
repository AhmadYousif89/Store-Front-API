import { PoolClient } from "pg";
import pgClient from "../../db/database";

class Dashboard {
  conct!: PoolClient;
  // Get user most recent purchases by quantity.
  async getUserPurchases<T>(uid: string): Promise<T[] | null> {
    try {
      this.conct = await pgClient.connect();
      const sql = `
      SELECT product_id, orders._id as order_id, order_status, quantity, ordered_products.created_at
      FROM orders JOIN ordered_products 
      ON orders._id = ordered_products.order_id 
      WHERE orders.user_id = ($1) AND orders.order_status = 'complete' 
      ORDER BY quantity DESC`;
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
}

export const dashBoard = new Dashboard();
