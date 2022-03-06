import pgDB from "../database";
import { Product, Error, customErr } from "../utils/control";

let errMsg: string | undefined;
// Building CRUD System for Product.
class ProductModel {
  // Create Product
  async createProduct(values: Product): Promise<Product | null> {
    try {
      // openning connection with db.
      const conct = await pgDB.connect();
      // making query.
      const sql = `INSERT INTO products (category, p_name, brand, maker, price, popular) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
      // retrieving query result.
      const result = await conct.query(sql, [
        values.category,
        values.p_name,
        values.brand,
        values.maker,
        values.price,
        values.popular,
      ]);
      // check if row has been created.
      if (result.rows.length) {
        const product = result.rows[0];
        console.log(result.command, result.rows);
        // colsing connection with db.
        conct.release();
        return {
          msg: `Product created successfully`,
          data: product,
        };
      }
      // colsing connection with db.
      conct.release();
      return null;
    } catch (err) {
      // handling error.
      // making my custom error syntax.
      if ((err as Error).message?.includes("enum category")) {
        errMsg = customErr(
          err as Error,
          "Please enter category between (electronics) and (mobiles) !.",
          "."
        );
      } else if ((err as Error).message?.includes("enum popular")) {
        errMsg = customErr(err as Error, "Please choose popularity between (yes) or (no) !.", ".");
      } else {
        errMsg = (err as Error).message?.replace(`relation "products"`, "TABLE (Products)");
      }
      throw new Error(`Unable to create new Product - ${errMsg}`);
    }
  }
  // Get Products
  async getProducts(): Promise<Product[]> {
    try {
      const conct = await pgDB.connect();
      const sql = "SELECT * FROM products";
      const result = await conct.query(sql);
      conct.release();
      console.log(result.command, result.rowCount, result.rows, "\n");
      return result.rows;
    } catch (err) {
      errMsg = (err as Error).message?.replace(`relation "products"`, "TABLE (products)");
      throw new Error(`Unable to get data - ${errMsg}`);
    }
  }
  // Get one Product
  async getProductById(id: string): Promise<Product | null> {
    try {
      const conct = await pgDB.connect();
      const sql = `SELECT * FROM products WHERE p_id = ($1)`;
      const result = await conct.query(sql, [id]);
      if (result.rows.length) {
        const product = result.rows[0];
        console.log(result.command, result.rowCount, product);
        conct.release();
        return {
          msg: `Product generated successfully`,
          data: product,
        };
      }
      conct.release();
      return null;
    } catch (err) {
      if ((err as Error).message?.includes("uuid")) {
        errMsg = customErr(err as Error, "Please enter a valid product id !.", ".");
      } else {
        errMsg = (err as Error).message?.replace(`relation "products"`, "TABLE (products)");
      }
      throw new Error(`Unable to get Product with id (${id}) - ${errMsg}`);
    }
  }
  // Update Product
  async updateProduct(id: string, price: number, popular: string): Promise<Product | null> {
    try {
      const conct = await pgDB.connect();
      const sql = `UPDATE Products SET price = ($2), popular = ($3) WHERE p_id = ($1) RETURNING *`;
      const result = await conct.query(sql, [id, price, popular]);
      if (result.rows.length) {
        const product = result.rows[0];
        console.log(result.command, result.rowCount, product);
        conct.release();
        return {
          msg: `Product updated successfully`,
          data: product,
        };
      }
      conct.release();
      return null;
    } catch (err) {
      if ((err as Error).message?.includes("uuid")) {
        errMsg = customErr(err as Error, "Please enter a valid product id !.", ".");
      } else if ((err as Error).message?.includes("enum")) {
        errMsg = customErr(
          err as Error,
          "Please enter a value between [ yes | no ] for popular !.",
          "."
        );
      } else {
        errMsg = (err as Error).message?.replace(`relation "products"`, "TABLE (products)");
      }
      throw new Error(`Unable to update Product with id (${id}) - ${errMsg}`);
    }
  }
  // Delete Product
  async delProduct(id: string): Promise<Product | null> {
    try {
      const conct = await pgDB.connect();
      const sql = `DELETE FROM products WHERE p_id = ($1) RETURNING *`;
      const result = await conct.query(sql, [id]);
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
        errMsg = (err as Error).message?.replace(`relation "products"`, "TABLE (products)");
      }
      throw new Error(`Unable to delete Product with id (${id}) - ${errMsg}`);
    }
  }
  // Get Popular Products
  async getProductByPopularity(): Promise<Product[]> {
    try {
      const conct = await pgDB.connect();
      const sql =
        "SELECT p_id, price, popular FROM products WHERE popular = 'yes' ORDER BY price DESC LIMIT 5";
      const result = await conct.query(sql);
      conct.release();
      console.log(result.command, result.rowCount, result.rows, "\n");
      return result.rows;
    } catch (err) {
      errMsg = (err as Error).message?.replace(`relation "products"`, "TABLE (products)");
      throw new Error(`Unable to get data - ${errMsg}`);
    }
  }
}

export const productModel = new ProductModel();
