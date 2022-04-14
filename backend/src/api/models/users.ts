import { PoolClient } from "pg";
import pgDB from "../../database";
import { encrypt, Error, isPwValide, customErr, DbSchema } from "../../utils/control";

let conct: PoolClient;
let errMsg: string | undefined;
class UserModel {
  async create(values: DbSchema): Promise<DbSchema | null> {
    try {
      conct = await pgDB.connect();
      const sql = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING user_id , name, email`;
      // encrypting password.
      const hash = encrypt(values.password as string);
      const result = await conct.query(sql, [values.name, values.email, hash]);
      if (result.rows.length) {
        const user = result.rows[0];
        conct.release();
        return {
          message: `user created successfully`,
          data: user,
        };
      }
      return null;
    } catch (err) {
      conct.release();
      if ((err as Error).message?.includes("unique_user_email")) {
        errMsg = customErr(err as Error, "email already exist !.", ".");
      } else if ((err as Error).message?.includes("not exist")) {
        errMsg = customErr(err as Error, "TABLE (users) does not exist !.", ".");
      } else {
        errMsg = err as string;
      }
      throw new Error(`${errMsg}`);
    }
  }

  // Get all users
  async index(): Promise<DbSchema[]> {
    try {
      conct = await pgDB.connect();
      const sql = `SELECT user_id, name, email FROM users`;
      const result = await conct.query(sql);
      conct.release();
      return result.rows;
    } catch (err) {
      conct.release();
      if ((err as Error).message?.includes("not exist")) {
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
      const sql = `SELECT user_id, name, email FROM users WHERE user_id = ($1) `;
      const result = await conct.query(sql, [uid]);
      if (result.rows.length) {
        const user = result.rows[0];
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
      } else if ((err as Error).message?.includes("not exist")) {
        errMsg = customErr(err as Error, "TABLE (users) does not exist !.", ".");
      } else {
        errMsg = err as string;
      }
      throw new Error(`Unable to get user with id (${uid}) - ${errMsg}`);
    }
  }

  // Update user
  async update(uid: string, password: string): Promise<DbSchema | null> {
    try {
      conct = await pgDB.connect();
      const sql = `UPDATE users SET password = ($2) WHERE user_id = ($1) RETURNING user_id , name, email`;
      // hashing user password before updating to database
      const hash = encrypt(password);
      const result = await conct.query(sql, [uid, hash]);
      if (result.rows.length) {
        const user = result.rows[0];
        conct.release();
        return {
          message: `user updated successfully`,
          data: user,
        };
      }
      conct.release();
      return null;
    } catch (err) {
      conct.release();
      if ((err as Error).message?.includes("uuid")) {
        errMsg = customErr(err as Error, "Please enter a valid user id !.", ".");
      } else if ((err as Error).message?.includes("not exist")) {
        errMsg = customErr(err as Error, "TABLE (users) does not exist !.", ".");
      } else {
        errMsg = err as string;
      }
      throw new Error(`Unable to update user with id (${uid}) - ${errMsg}`);
    }
  }

  // Delete user
  async delete(uid: string): Promise<DbSchema | null> {
    try {
      conct = await pgDB.connect();
      const sql = `DELETE FROM users WHERE user_id = ($1) RETURNING user_id , name, email`;
      const result = await conct.query(sql, [uid]);
      if (result.rows.length) {
        const user = result.rows[0];
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
      } else if ((err as Error).message?.includes("orders_user_id_fkey")) {
        errMsg = customErr(err as Error, `Please delete any related orders first !.`, ".");
      } else if ((err as Error).message?.includes("not exist")) {
        errMsg = customErr(err as Error, "TABLE (users) does not exist !.", ".");
      } else {
        errMsg = err as string;
      }
      throw new Error(`Unable to delete user with id (${uid}) - ${errMsg}`);
    }
  }

  // Authenticate user.
  async authenticateUser(email: string, password: string): Promise<DbSchema | null> {
    try {
      conct = await pgDB.connect();
      const sql = `SELECT password, email FROM users WHERE email = ($1)`;
      const result = await conct.query(sql, [email]);
      const userEmail = result.rows[0].email;
      if (!userEmail || userEmail === undefined) {
        conct.release();
        return null;
      }
      if (result.rows.length) {
        const hashed = result.rows[0].password;
        // checking user password authenticity.
        if (isPwValide(password, hashed)) {
          const sql = `SELECT user_id, name, email FROM users WHERE email = ($1)`;
          const user = await conct.query(sql, [email]);
          conct.release();
          return user.rows[0];
        }
      }
      conct.release();
      return null;
    } catch (err) {
      conct.release();
      if ((err as Error).message?.includes("undefined")) {
        errMsg = customErr(err as Error, "user does not exist !.", ".");
      } else if ((err as Error).message?.includes("not exist")) {
        errMsg = customErr(err as Error, "TABLE (users) does not exist !.", ".");
      } else {
        errMsg = err as string;
      }
      throw new Error(`${errMsg}`);
    }
  }

  async userToken<T>(user_id: string, token: string, time: string): Promise<T> {
    try {
      conct = await pgDB.connect();
      const sql1 = `INSERT INTO user_tokens (user_id, token, i_at) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING`;
      await pgDB.query(sql1, [user_id, token, time]);
      const sql2 = `UPDATE user_tokens SET token = ($2) , i_at = ($3) WHERE user_id = ($1) RETURNING token, i_at`;
      const query = await pgDB.query(sql2, [user_id, token, time]);
      conct.release();
      return query.rows[0];
    } catch (err) {
      conct.release();
      throw new Error(`user-token: ${err}`);
    }
  }
}

export const userModel = new UserModel();
