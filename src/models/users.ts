import pgDB from "../database";
import { encrypt, Error, isPwValide, Users } from "./../utils/control";

let errMsg: string | undefined;
// Building CRUD System for Users
class UserModel {
  // Create user
  async createUser(values: Users): Promise<Users | null> {
    try {
      // openning connection with db.
      const conct = await pgDB.connect();
      // making query.
      const sql = `INSERT INTO users (u_name, u_password) VALUES ($1, $2) RETURNING u_uid , u_name`;
      // encrypting password.
      const hash = encrypt(values.u_password as string);
      // retrieving query result.
      const result = await conct.query(sql, [values.u_name, hash]);
      // check if row has been created.
      if (result.rows.length) {
        const user = result.rows[0];
        console.log(result.command, result.rows);
        conct.release();
        return {
          msg: `User created successfully`,
          data: user,
        };
      }
      return null;
    } catch (err) {
      // handling error.
      // making my output error syntax.
      errMsg = (err as Error).message?.replace(`relation "users"`, "TABLE (users)");
      throw new Error(`Unable to create new User (${values.u_name}) - ${errMsg}`);
    }
  }
  // Get users => (without retrieving user password as it consider sensitive information)
  async getAllUsers(): Promise<Users[]> {
    try {
      const conct = await pgDB.connect();
      const sql = `SELECT u_uid, u_name FROM users `;
      const result = await conct.query(sql);
      conct.release();
      console.log(result.command, result.rowCount, result.rows, "\n");
      return result.rows;
    } catch (err) {
      errMsg = (err as Error).message?.replace(`relation "users"`, "TABLE (users)");
      throw new Error(`Unable to get data - ${errMsg}`);
    }
  }
  // Get one user
  async getUserById(u_uid: string): Promise<Users | null> {
    try {
      const conct = await pgDB.connect();
      const sql = `SELECT u_uid , u_name FROM users WHERE u_uid = ($1) `;
      const result = await conct.query(sql, [u_uid]);
      if (result.rows.length) {
        const user = result.rows[0];
        console.log(result.command, result.rowCount, user);
        conct.release();
        return {
          msg: `User generated successfully`,
          data: user,
        };
      }
      conct.release();
      return null;
    } catch (err) {
      const str = (err as Error).message?.includes("uuid");
      if (str) {
        errMsg = (err as Error).message?.replace(
          `invalid input syntax for type uuid: "${u_uid}"`,
          "Please enter valid uuid !"
        );
      } else {
        errMsg = (err as Error).message?.replace(`relation "users"`, "TABLE (users)");
      }
      throw new Error(`Unable to get user with id (${u_uid}) - ${errMsg}`);
    }
  }
  // Update user
  async updateUser(u_uid: string, u_password: string): Promise<Users | null> {
    try {
      const conct = await pgDB.connect();
      const sql = `UPDATE users SET u_password = ($2) WHERE u_uid = ($1) RETURNING u_uid , u_name`;
      const hash = encrypt(u_password);
      const result = await conct.query(sql, [u_uid, hash]);
      if (result.rows.length) {
        const user = result.rows[0];
        console.log(result.command, result.rowCount, user);
        conct.release();
        return {
          msg: `User updated successfully`,
          data: user,
        };
      }
      conct.release();
      return null;
    } catch (err) {
      const str = (err as Error).message?.includes("uuid");
      if (str) {
        errMsg = (err as Error).message?.replace(
          `invalid input syntax for type uuid: "${u_uid}"`,
          "Please enter valid uuid !"
        );
      } else {
        errMsg = (err as Error).message?.replace(`relation "users"`, "TABLE (users)");
      }
      throw new Error(`Unable to update user with id (${u_uid}) - ${errMsg}`);
    }
  }
  // Delete user
  async delUser(u_uid: string): Promise<Users | null> {
    try {
      const conct = await pgDB.connect();
      const sql = `DELETE FROM users WHERE u_uid = ($1) RETURNING u_uid , u_name`;
      const result = await conct.query(sql, [u_uid]);
      if (result.rows.length) {
        const user = result.rows[0];
        console.log(result.command, result.rowCount, user);
        conct.release();
        return {
          msg: `User deleted successfully`,
          data: user,
        };
      }
      conct.release();
      return null;
    } catch (err) {
      const str = (err as Error).message?.includes("uuid");
      if (str) {
        errMsg = (err as Error).message?.replace(
          `invalid input syntax for type uuid: "${u_uid}"`,
          "Please enter valid uuid !"
        );
      } else {
        errMsg = (err as Error).message?.replace(`relation "users"`, "TABLE (users)");
      }
      throw new Error(`Unable to delete user with id (${u_uid}) - ${errMsg}`);
    }
  }
  // Authenticate user.
  async authenticateUser(u_name: string, u_password: string): Promise<Users | null> {
    try {
      const conct = await pgDB.connect();
      const sql = `SELECT u_password FROM users WHERE u_name = ($1)`;
      const result = await conct.query(sql, [u_name]);
      // checking for data.
      if (result.rows.length) {
        const user = result.rows[0];
        // checking user password authenticity.
        if (isPwValide(u_password, user.u_password)) {
          const sql = `SELECT u_uid, u_name FROM users WHERE u_name = ($1)`;
          const data = await conct.query(sql, [u_name]);
          return data.rows[0];
        }
      }
      conct.release();
      return null;
    } catch (err) {
      // handling error
      errMsg = (err as Error).message?.replace(`relation "users"`, "TABLE (users)");
      throw new Error(`Unable to authenticate user - ${errMsg}`);
    }
  }
}

export const userModel = new UserModel();
// userStore.validateUser("aaa", "123");
// console.log("invalid input syntax for type uuid: " + "\\" + `"666` + '\\"');
