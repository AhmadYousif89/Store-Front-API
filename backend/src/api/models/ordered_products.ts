import { PoolClient } from "pg";
import pgDB from "../../database";
import { Error, customErr, OP } from "../../utils/control";

let conct: PoolClient;
let errMsg: string | undefined;
class OrderedProducts {
  async addProducts(values: OP): Promise<OP | null> {
    // accessing orders table first
    try {
      conct = await pgDB.connect();
      const sql = "SELECT * FROM orders WHERE order_id = ($1)";
      const result = await conct.query(sql, [values.order_id]);
      const order = result.rows[0];
      // check if order is complete or not.
      if (order.order_status === "complete") {
        throw new Error(
          `Unable to add products to order number (${values.order_id}) because order status is already (${order.order_status})`
        );
      }
    } catch (err) {
      conct.release();
      if ((err as Error).message?.includes("undefined")) {
        errMsg = customErr(err as Error, "Incorrect order id or order does not exist !.", ".");
      } else if ((err as Error).message?.includes("relation")) {
        errMsg = customErr(err as Error, "Table (orders) does not exist !.", ".");
      } else {
        errMsg = err as string;
      }
      throw new Error(`${errMsg}`);
    }
    try {
      conct = await pgDB.connect();
      const sql = `INSERT INTO ordered_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *`;
      const result = await conct.query(sql, [values.order_id, values.product_id, values.quantity]);
      if (result.rows.length) {
        const product = result.rows[0];
        conct.release();
        return {
          message: `Product has been added successfully to order number (${values.order_id})`,
          data: product,
        };
      }
      conct.release();
      return null;
    } catch (err) {
      conct.release();
      if ((err as Error).message?.includes("uuid")) {
        errMsg = customErr(err as Error, "Please enter a valid product id !.", ".");
      } else if ((err as Error).message?.includes("foreign")) {
        errMsg = customErr(err as Error, "Incorrect product id or product does not exist !.", ".");
      } else if ((err as Error).message?.includes("relation")) {
        errMsg = customErr(err as Error, "TABLE (ordered_products) does not exist !.", ".");
      } else {
        errMsg = err as string;
      }
      throw new Error(`Unable to add product to order - ${errMsg}`);
    }
  }

  // Get all data from ordered_products table.
  async index(): Promise<OP[]> {
    try {
      conct = await pgDB.connect();
      const sql = "SELECT * FROM ordered_products";
      const result = await conct.query(sql);
      conct.release();
      return result.rows;
    } catch (err) {
      conct.release();
      if ((err as Error).message?.includes("relation")) {
        errMsg = customErr(err as Error, "TABLE (ordered_products) does not exist !.", ".");
      } else {
        errMsg = err as string;
      }
      throw new Error(`Unable to get data - ${errMsg}`);
    }
  }

  // Get one row from table ordered_products.
  async show({ op_id }: OP): Promise<OP | null> {
    try {
      conct = await pgDB.connect();
      const sql = `SELECT * FROM ordered_products WHERE op_id = ($1)`;
      const result = await conct.query(sql, [op_id]);
      if (result.rows.length) {
        const data = result.rows[0];
        conct.release();
        return {
          message: "Data generated successfully",
          data: data,
        };
      }
      conct.release();
      return null;
    } catch (err) {
      conct.release();
      if ((err as Error).message?.includes("relation")) {
        errMsg = customErr(err as Error, "TABLE (ordered_products) does not exist !.", ".");
      } else {
        errMsg = err as string;
      }
      throw new Error(`Unable to get data - ${errMsg}`);
    }
  }

  // Update quantity of specific Product.
  async update({ product_id, quantity }: OP): Promise<OP | null> {
    try {
      conct = await pgDB.connect();
      const sql = `UPDATE ordered_products SET quantity = ($2) WHERE product_id = ($1) RETURNING *`;
      const result = await conct.query(sql, [product_id, quantity]);
      if (result.rows.length) {
        const product = result.rows[0];
        conct.release();
        return {
          message: `Product quantity updated successfully`,
          data: product,
        };
      }
      conct.release();
      return null;
    } catch (err) {
      conct.release();
      if ((err as Error).message?.includes("uuid")) {
        errMsg = customErr(err as Error, "Please enter a valid product id !.", ".");
      } else if ((err as Error).message?.includes("relation")) {
        errMsg = customErr(err as Error, "TABLE (ordered_products) does not exist !.", ".");
      } else {
        errMsg = err as string;
      }
      throw new Error(`Unable to update Product with id (${product_id}) - ${errMsg}`);
    }
  }

  // Delete one row from table ordered_products by id.
  async delete({ op_id }: OP): Promise<OP | null> {
    try {
      conct = await pgDB.connect();
      const sql = `DELETE FROM ordered_products WHERE op_id = ($1) RETURNING *`;
      const result = await conct.query(sql, [op_id]);
      if (result.rows.length) {
        const product = result.rows[0];
        conct.release();
        return {
          message: `Row number ${op_id} was deleted successfully`,
          data: product,
        };
      }
      conct.release();
      return null;
    } catch (err) {
      conct.release();
      if ((err as Error).message?.includes("uuid")) {
        errMsg = customErr(err as Error, "Please enter a valid product id !.", ".");
      } else if ((err as Error).message?.includes("foreign")) {
        errMsg = customErr(
          err as Error,
          "Product can not be deleted - remove this product from any related orders !.",
          "."
        );
      } else if ((err as Error).message?.includes("relation")) {
        errMsg = customErr(err as Error, "TABLE (ordered_products) does not exist !.", ".");
      } else {
        errMsg = err as string;
      }
      throw new Error(`Unable to delete row with id (${op_id}) - ${errMsg}`);
    }
  }
}

export const OPT = new OrderedProducts();
