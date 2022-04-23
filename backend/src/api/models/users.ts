import { PoolClient } from "pg";
import pgDB from "../../database";
import { encrypt, Error, isPwValide, customErr, Users, UserToken } from "../../utils/control";

let conct: PoolClient;
let errMsg: string | undefined;
class UserModel {
  async create(values: Users): Promise<Users | null> {
    try {
      conct = await pgDB.connect();
      const sql = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING user_id , name, email`;
      // encrypting password.
      const hash = encrypt(values.password as string);
      const query = await conct.query(sql, [values.name, values.email, hash]);
      if (query.rows.length) {
        conct.release();
        return query.rows[0];
      }
      return null;
    } catch (err) {
      conct.release();
      if ((err as Error).message?.includes("unique_user_email")) {
        errMsg = customErr(err as Error, "email already exist !.", ".");
      } else {
        errMsg = err as string;
      }
      throw new Error(`${errMsg}`);
    }
  }

  // Get all users
  async index(): Promise<Users[]> {
    try {
      conct = await pgDB.connect();
      const sql = `SELECT user_id, name, email FROM users`;
      const query = await conct.query(sql);
      conct.release();
      return query.rows;
    } catch (err) {
      conct.release();
      throw new Error(`${err}`);
    }
  }

  // Get one user
  async show({ user_id }: Users): Promise<Users | null> {
    try {
      conct = await pgDB.connect();
      const sql = `SELECT user_id, name, email FROM users WHERE user_id = ($1) `;
      const query = await conct.query(sql, [user_id]);
      if (query.rows.length) {
        conct.release();
        return query.rows[0];
      }
      conct.release();
      return null;
    } catch (err) {
      conct.release();
      if ((err as Error).message?.includes("uuid")) {
        errMsg = customErr(err as Error, "Please enter a valid user id !.", ".");
      } else {
        errMsg = err as string;
      }
      throw new Error(`Unable to get user with id (${user_id}) - ${errMsg}`);
    }
  }

  // Update user
  async update({ user_id, password }: Users): Promise<Users | null> {
    try {
      conct = await pgDB.connect();
      const sql = `UPDATE users SET password = ($2) WHERE user_id = ($1) RETURNING user_id , name, email`;
      // hashing user password before updating to database
      const hash = encrypt(password as string);
      const query = await conct.query(sql, [user_id, hash]);
      if (query.rows.length) {
        conct.release();
        return query.rows[0];
      }
      conct.release();
      return null;
    } catch (err) {
      conct.release();
      if ((err as Error).message?.includes("uuid")) {
        errMsg = customErr(err as Error, "Please enter a valid user id !.", ".");
      } else {
        errMsg = err as string;
      }
      throw new Error(`Unable to update user with id (${user_id}) - ${errMsg}`);
    }
  }

  // Delete user
  async delete({ user_id }: Users): Promise<Users | null> {
    try {
      conct = await pgDB.connect();
      const sql = `DELETE FROM users WHERE user_id = ($1) RETURNING user_id , name, email`;
      const query = await conct.query(sql, [user_id]);
      if (query.rows.length) {
        conct.release();
        return query.rows[0];
      }
      conct.release();
      return null;
    } catch (err) {
      conct.release();
      if ((err as Error).message?.includes("uuid")) {
        errMsg = customErr(err as Error, "Please enter a valid user id !.", ".");
      } else if ((err as Error).message?.includes("orders_user_id_fkey")) {
        errMsg = customErr(err as Error, `Please delete any related orders first !.`, ".");
      } else {
        errMsg = err as string;
      }
      throw new Error(`Unable to delete user with id (${user_id}) - ${errMsg}`);
    }
  }

  // Authenticate user.
  async authenticateUser({ email, password }: Users): Promise<Users | null> {
    try {
      conct = await pgDB.connect();
      const sql = `SELECT password, email FROM users WHERE email = ($1)`;
      const query = await conct.query(sql, [email]);
      const userEmail = query.rows[0].email;
      if (!userEmail || userEmail === undefined) {
        conct.release();
        return null;
      }
      if (query.rows.length) {
        const hashed = query.rows[0].password;
        // checking user password authenticity.
        if (isPwValide(password as string, hashed)) {
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
      } else {
        errMsg = err as string;
      }
      throw new Error(`${errMsg}`);
    }
  }

  async addUserToken(values: UserToken): Promise<UserToken> {
    try {
      conct = await pgDB.connect();
      const sql1 = `INSERT INTO user_tokens (user_id, token) VALUES ($1, $2) ON CONFLICT DO NOTHING`;
      await pgDB.query(sql1, [values.user_id, values.token]);
      const sql2 = `UPDATE user_tokens SET token = ($2) , i_at = NOW() WHERE user_id = ($1) RETURNING token, i_at`;
      const query = await pgDB.query(sql2, [values.user_id, values.token]);
      conct.release();
      return query.rows[0];
    } catch (err) {
      conct.release();
      throw new Error(`${err}`);
    }
  }

  async delUserToken({ token }: UserToken): Promise<UserToken | null> {
    try {
      conct = await pgDB.connect();
      const sql = `DELETE FROM user_tokens WHERE token = ($1) RETURNING token`;
      const query = await pgDB.query(sql, [token]);
      if (query.rows.length) {
        conct.release();
        return query.rows[0];
      }
      conct.release();
      return null;
    } catch (err) {
      conct.release();
      throw new Error(`${err}`);
    }
  }
}

export const userModel = new UserModel();
