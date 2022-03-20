import pgDB from "../../database";
import { encrypt, Error, isPwValide, customErr, DbSchema } from "../../utils/control";

let errMsg: string | undefined;
// Building CRUD System for Users
class UserModel {
  // Create user
  async create(values: DbSchema): Promise<DbSchema | null> {
    try {
      // openning connection with db.
      const conct = await pgDB.connect();
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
          msg: `User created successfully`,
          data: user,
        };
      }
      return null;
    } catch (err) {
      // handling error.
      // making my custom error syntax.
      errMsg = customErr(err as Error, "TABLE (users) does not exist !.", ".");
      throw new Error(`Unable to create new User (${values.u_name}) - ${errMsg}`);
    }
  }
  /*
  - Get users => (without retrieving user password as it consider sensitive information)
  - If we want to control how much of data to be received when calling this route we could use keyword (LIMIT) like = LIMIT 5.
  */
  async index(): Promise<DbSchema[]> {
    try {
      const conct = await pgDB.connect();
      const sql = `SELECT u_id, u_name FROM users`;
      const result = await conct.query(sql);
      conct.release();
      console.log(result.command, result.rowCount, result.rows, "\n");
      return result.rows;
    } catch (err) {
      errMsg = customErr(err as Error, "TABLE (users) does not exist !.", ".");
      throw new Error(`Unable to get Users - ${errMsg}`);
    }
  }
  // Get one user
  async show(uid: string): Promise<DbSchema | null> {
    try {
      const conct = await pgDB.connect();
      const sql = `SELECT u_id, u_name FROM users WHERE u_id = $1 `;
      const result = await conct.query(sql, [uid]);
      if (result.rows.length) {
        const user = result.rows[0];
        console.log("show: ", result.command, result.rowCount, user);
        conct.release();
        return {
          msg: `User generated successfully`,
          data: user,
        };
      }
      return null;
    } catch (err) {
      if ((err as Error).message?.includes("uuid")) {
        errMsg = customErr(err as Error, "Please enter a valid user id !.", ".");
      } else {
        errMsg = customErr(err as Error, "TABLE (users) does not exist !.", ".");
      }
      throw new Error(`Unable to get user with id (${uid}) - ${errMsg}`);
    }
  }
  // Update user
  async update(u_id: string, password: string): Promise<DbSchema | null> {
    try {
      const conct = await pgDB.connect();
      const sql = `UPDATE users SET password = ($2) WHERE u_id = ($1) RETURNING u_id , u_name`;
      const hash = encrypt(password);
      const result = await conct.query(sql, [u_id, hash]);
      if (result.rows.length) {
        const user = result.rows[0];
        console.log(result.command, result.rowCount, user);
        conct.release();
        return {
          msg: `User updated successfully`,
          data: user,
        };
      }
      return null;
    } catch (err) {
      if ((err as Error).message?.includes("uuid")) {
        errMsg = customErr(err as Error, "Please enter a valid user id !.", ".");
      } else {
        errMsg = customErr(err as Error, "TABLE (users) does not exist !.", ".");
      }
      throw new Error(`Unable to update user with id (${u_id}) - ${errMsg}`);
    }
  }
  // Delete user
  async delete(u_id: string): Promise<DbSchema | null> {
    try {
      const conct = await pgDB.connect();
      const sql = `DELETE FROM users WHERE u_id = ($1) RETURNING u_id , u_name`;
      const result = await conct.query(sql, [u_id]);
      if (result.rows.length) {
        const user = result.rows[0];
        console.log(result.command, result.rowCount, user);
        conct.release();
        return {
          msg: `User deleted successfully`,
          data: user,
        };
      }
      return null;
    } catch (err) {
      if ((err as Error).message?.includes("uuid")) {
        errMsg = customErr(err as Error, "Please enter a valid user id !.", ".");
      } else if ((err as Error).message?.includes("foreign")) {
        errMsg = customErr(
          err as Error,
          `User can not be deleted - delete any related orders first !.`,
          "."
        );
      } else {
        errMsg = customErr(err as Error, "TABLE (users) does not exist !.", ".");
      }
      throw new Error(`Unable to delete user with id (${u_id}) - ${errMsg}`);
    }
  }
  // Authenticate user.
  async authenticateUser(u_name: string, password: string): Promise<DbSchema | null> {
    try {
      const conct = await pgDB.connect();
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
      return null;
    } catch (err) {
      // handling error
      errMsg = customErr(err as Error, "TABLE (users) does not exist !.", ".");
      throw new Error(`Unable to authenticate user - ${errMsg}`);
    }
  }
}

export const userModel = new UserModel();
userModel.show("bc91295b-9ee8-46a1-a4df-fc8de1d6f57c");
