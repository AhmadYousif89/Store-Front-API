import pgDB from "../database";
import { OP, Error, customErr } from "../utils/control";

let errMsg: string | undefined;
// Building CRUD System for products to Orders.
class OrderedProducts {
  // Add new product to order.
  async addProductToOrder(values: OP): Promise<OP | null> {
    // check if order is active or not.
    try {
      const ordersql = "SELECT * FROM orders WHERE o_id = ($1)";
      const conn = await pgDB.connect();
      const result = await conn.query(ordersql, [values.order_id]);
      const order = result.rows[0];
      if (order.order_status === "complete") {
        throw new Error(
          `Unable to add product (${values.product_id}) to order (${values.order_id}) because order status is (${order.order_status})`
        );
      }
      conn.release();
    } catch (err) {
      if (err) {
        errMsg = customErr(err as Error, "Incorrect order id or order does not exist !.", ".");
      } else {
        errMsg = (err as Error).message?.replace(`relation "orders"`, "TABLE (orders)");
      }
      throw new Error(`Unable to add product - ${errMsg}`);
    }
    try {
      // openning connection with db.
      const conct = await pgDB.connect();
      // making query.
      const sql = `INSERT INTO ordered_products (order_id, product_id, p_quantity) VALUES ($1, $2, $3) RETURNING *`;
      // retrieving query result.
      const result = await conct.query(sql, [values.order_id, values.product_id, values.quantity]);
      // check if row has been created.
      if (result.rows.length) {
        const product = result.rows[0];
        console.log(result.command, result.rows);
        conct.release();
        return {
          msg: `Product has been added successfully to order number (${values.order_id})`,
          data: product,
        };
      }
      return null;
    } catch (err) {
      // handling errors
      if ((err as Error).message?.includes("uuid")) {
        errMsg = customErr(err as Error, "Please enter a valid product id !.", ".");
      } else if ((err as Error).message?.includes("foreign")) {
        errMsg = customErr(err as Error, "Incorrect product id or product does not exist !.", ".");
      } else {
        errMsg = (err as Error).message?.replace(
          `relation "ordered_products"`,
          "TABLE (ordered_products)"
        );
      }
      throw new Error(`Unable to add product to order - ${errMsg}`);
    }
  }

  // Get all data from ordered_products table.
  async getOrderedProducts(): Promise<OP[]> {
    try {
      const conct = await pgDB.connect();
      const sql = "SELECT * FROM ordered_products";
      const result = await conct.query(sql);
      conct.release();
      console.log(result.command, result.rowCount, result.rows, "\n");
      return result.rows;
    } catch (err) {
      errMsg = (err as Error).message?.replace(
        `relation "ordered_products"`,
        "TABLE (ordered_products)"
      );
      throw new Error(`Unable to get data - ${errMsg}`);
    }
  }
  // Get one row from table ordered_products.
  async getRowByOPid(opId: number): Promise<OP | null> {
    try {
      const conct = await pgDB.connect();
      const sql = `SELECT * FROM ordered_products WHERE op_id = ($1)`;
      const result = await conct.query(sql, [opId]);
      if (result.rows.length) {
        const data = result.rows;
        console.log(result.command, result.rowCount, data);
        conct.release();
        return {
          msg: "Data generated successfully",
          data: data,
        };
      }
      conct.release();
      return null;
    } catch (err) {
      errMsg = (err as Error).message?.replace(
        `relation "ordered_products"`,
        "TABLE (ordered_products)"
      );
      throw new Error(`Unable to get data - ${errMsg}`);
    }
  }
  // Update quantity of specific Product.
  async updateOrderedProduct(pId: string, quantity: number): Promise<OP | null> {
    try {
      const conct = await pgDB.connect();
      const sql = `UPDATE ordered_products SET p_quantity = ($2) WHERE product_id = ($1) RETURNING *`;
      const result = await conct.query(sql, [pId, quantity]);
      if (result.rows.length) {
        const product = result.rows[0];
        console.log(result.command, result.rowCount, product);
        conct.release();
        return {
          msg: `Product quantity updated successfully`,
          data: product,
        };
      }
      conct.release();
      return null;
    } catch (err) {
      if ((err as Error).message?.includes("uuid")) {
        errMsg = customErr(err as Error, "Please enter a valid product id !.", ".");
      } else {
        errMsg = (err as Error).message?.replace(
          `relation "ordered_products"`,
          "TABLE (ordered_products)"
        );
      }
      throw new Error(
        `Unable to update Product with id (${pId}) from (ordered_products) - ${errMsg}`
      );
    }
  }
  // Delete one row from table ordered_products by id.
  async delOrderedProduct(opId: number): Promise<OP | null> {
    try {
      const conct = await pgDB.connect();
      const sql = `DELETE FROM ordered_products WHERE op_id = ($1) RETURNING *`;
      const result = await conct.query(sql, [opId]);
      if (result.rows.length) {
        const product = result.rows[0];
        console.log(result.command, result.rowCount, product);
        conct.release();
        return {
          msg: `Product deleted successfully`,
          data: product,
        };
      }
      conct.release();
      return null;
    } catch (err) {
      if ((err as Error).message?.includes("uuid")) {
        errMsg = customErr(err as Error, "Please enter a valid product id !.", ".");
      } else if ((err as Error).message?.includes("foreign")) {
        errMsg = customErr(
          err as Error,
          "Product can not be deleted - remove this product from any related orders !.",
          "."
        );
      } else {
        errMsg = (err as Error).message?.replace(
          `relation "ordered_products"`,
          "TABLE (ordered_products)"
        );
      }
      throw new Error(`Unable to delete row with id (${opId}) - ${errMsg}`);
    }
  }
}

export const OPT = new OrderedProducts();
