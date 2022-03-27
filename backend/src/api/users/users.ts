import { PoolClient } from "pg";
import pgDB from "../../database";
import { encrypt, Error, isPwValide, customErr, DbSchema } from "../../utils/control";

let conct: PoolClient;
let errMsg: string | undefined;
// Building CRUD System for Users
class UserModel {
  // Create user
  async create(values: DbSchema): Promise<DbSchema | null> {
    try {
      // openning connection with db.
      conct = await pgDB.connect();
      // making sql query.
      const sql = `INSERT INTO users (u_name, password) VALUES ($1, $2) RETURNING u_id , u_name`;
      // encrypting password.
      const hash = encrypt(values.password as string);
      // retrieving query result.
      const result = await conct.query(sql, [values.u_name, hash]);
      // check for data.
      if (result.rows.length) {
        const user = result.rows[0];
        console.log(result.command, result.rows);
        conct.release();
        return {
          message: `User created successfully`,
          data: user,
        };
      }
      return null;
    } catch (err) {
      // handling error.
      conct.release();
      if ((err as Error).message?.includes("relation")) {
        errMsg = customErr(err as Error, "TABLE (users) does not exist !.", ".");
      } else {
        errMsg = err as string;
      }
      throw new Error(`Unable to create new User (${values.u_name}) - ${errMsg}`);
    }
  }

  // Get all users => (without retrieving user password as it consider sensitive information)
  async index(): Promise<DbSchema[]> {
    try {
      conct = await pgDB.connect();
      const sql = `SELECT u_id, u_name FROM users`;
      const result = await conct.query(sql);
      conct.release();
      console.log(result.command, result.rowCount, result.rows, "\n");
      return result.rows;
    } catch (err) {
      conct.release();
      if ((err as Error).message?.includes("relation")) {
        errMsg = customErr(err as Error, "TABLE (users) does not exist !.", ".");
      } else {
        errMsg = err as string;
      }
      throw new Error(`Unable to get Users - ${errMsg}`);
    }
  }
  // Get one user
  async show(uid: string): Promise<DbSchema | null> {
    try {
      conct = await pgDB.connect();
      const sql = `SELECT u_id, u_name FROM users WHERE u_id = $1 `;
      const result = await conct.query(sql, [uid]);
      if (result.rows.length) {
        const user = result.rows[0];
        console.log(result.command, result.rowCount, user);
        conct.release();
        return {
          message: `User generated successfully`,
          data: user,
        };
      }
      conct.release();
      return null;
    } catch (err) {
      conct.release();
      if ((err as Error).message?.includes("uuid")) {
        errMsg = customErr(err as Error, "Please enter a valid user id !.", ".");
      } else if ((err as Error).message?.includes("relation")) {
        errMsg = customErr(err as Error, "TABLE (users) does not exist !.", ".");
      } else {
        errMsg = err as string;
      }
      throw new Error(`Unable to get user with id (${uid}) - ${errMsg}`);
    }
  }
  // Update user
  async update(u_id: string, password: string): Promise<DbSchema | null> {
    try {
      conct = await pgDB.connect();
      const sql = `UPDATE users SET password = ($2) WHERE u_id = ($1) RETURNING u_id , u_name`;
      const hash = encrypt(password);
      const result = await conct.query(sql, [u_id, hash]);
      if (result.rows.length) {
        const user = result.rows[0];
        console.log(result.command, result.rowCount, user);
        conct.release();
        return {
          message: `User updated successfully`,
          data: user,
        };
      }
      conct.release();
      return null;
    } catch (err) {
      conct.release();
      if ((err as Error).message?.includes("uuid")) {
        errMsg = customErr(err as Error, "Please enter a valid user id !.", ".");
      } else if ((err as Error).message?.includes("relation")) {
        errMsg = customErr(err as Error, "TABLE (users) does not exist !.", ".");
      } else {
        errMsg = err as string;
      }
      throw new Error(`Unable to update user with id (${u_id}) - ${errMsg}`);
    }
  }
  // Delete user
  async delete(u_id: string): Promise<DbSchema | null> {
    try {
      conct = await pgDB.connect();
      const sql = `DELETE FROM users WHERE u_id = ($1) RETURNING u_id , u_name`;
      const result = await conct.query(sql, [u_id]);
      if (result.rows.length) {
        const user = result.rows[0];
        console.log(result.command, result.rowCount, user);
        conct.release();
        return {
          message: `User deleted successfully`,
          data: user,
        };
      }
      conct.release();
      return null;
    } catch (err) {
      conct.release();
      if ((err as Error).message?.includes("uuid")) {
        errMsg = customErr(err as Error, "Please enter a valid user id !.", ".");
      } else if ((err as Error).message?.includes("foreign")) {
        errMsg = customErr(err as Error, `Please delete any related orders first !.`, ".");
      } else if ((err as Error).message?.includes("relation")) {
        errMsg = customErr(err as Error, "TABLE (users) does not exist !.", ".");
      } else {
        errMsg = err as string;
      }
      throw new Error(`Unable to delete user with id (${u_id}) - ${errMsg}`);
    }
  }
  // Authenticate user.
  async authenticateUser(u_name: string, password: string): Promise<DbSchema | null> {
    try {
      conct = await pgDB.connect();
      const sql = `SELECT password FROM users WHERE u_name = ($1)`;
      const result = await conct.query(sql, [u_name]);
      // checking for data.
      if (result.rows.length) {
        const user = result.rows[0];
        // checking user password authenticity.
        if (isPwValide(password, user.password)) {
          const sql = `SELECT u_id, u_name FROM users WHERE u_name = ($1)`;
          const data = await conct.query(sql, [u_name]);
          conct.release();
          return data.rows[0];
        }
      }
      conct.release();
      return null;
    } catch (err) {
      // handling error
      conct.release();
      if ((err as Error).message?.includes("relation")) {
        errMsg = customErr(err as Error, "TABLE (users) does not exist !.", ".");
      } else {
        errMsg = err as string;
      }
      throw new Error(`Unable to authenticate user - ${errMsg}`);
    }
  }
}

export const userModel = new UserModel();
