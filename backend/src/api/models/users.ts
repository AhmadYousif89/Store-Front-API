import { PoolClient } from "pg";
import pgClient from "../../db/database";
import { Users } from "../../types/types";
import { encrypt, customErr, isPasswordValide, generateAccessToken } from "../../helpers/control";

class UserModel {
  conct!: PoolClient;
  errMsg = "";
  async create(user: Users): Promise<Users> {
    try {
      this.conct = await pgClient.connect();
      let sql = `
      INSERT INTO users 
      (name, email, password, isadmin) 
      VALUES ($1, $2, $3, $4) 
      RETURNING _id, name, email, isadmin`;
      const hashedPassword = encrypt(user.password as string);
      const query = await this.conct.query(sql, [
        user.name,
        user.email,
        hashedPassword,
        user.isadmin,
      ]);
      const { _id, name, email, isadmin } = query.rows[0] as Users;
      const token = generateAccessToken({ _id, name, email, isadmin });
      sql = `
      UPDATE users SET token = ($1) 
      WHERE _id = ($2) RETURNING _id, name, email, isadmin, token`;
      const _user = await this.conct.query(sql, [token, _id]);
      this.conct.release();
      return _user.rows[0];
    } catch (err) {
      this.conct.release();
      if ((err as Error).message?.includes("unique_user_email")) {
        this.errMsg = customErr(err as Error, "email already registered.", ".");
      } else {
        this.errMsg = err as string;
      }
      throw new Error(`${this.errMsg}`);
    }
  }

  async index(): Promise<Users[]> {
    try {
      this.conct = await pgClient.connect();
      const sql = `SELECT _id, name, email, isadmin FROM users`;
      const query = await this.conct.query(sql);
      this.conct.release();
      return query.rows;
    } catch (err) {
      this.conct.release();
      throw new Error(`${err}`);
    }
  }

  async show({ _id }: Users): Promise<Users | string> {
    try {
      this.conct = await pgClient.connect();
      const sql = `SELECT _id, name, email, isadmin FROM users WHERE _id = ($1) `;
      const query = await this.conct.query(sql, [_id]);
      this.conct.release();
      return query.rows[0];
    } catch (err) {
      this.conct.release();
      throw new Error(`${err}`);
    }
  }

  async updatePassword({ _id, password }: Users): Promise<Users> {
    try {
      this.conct = await pgClient.connect();
      const sql = `UPDATE users SET password = ($2) WHERE _id = ($1)`;
      const hash = encrypt(password as string);
      const query = await this.conct.query(sql, [_id, hash]);
      this.conct.release();
      return query.rows[0];
    } catch (err) {
      this.conct.release();
      throw new Error(`${err}`);
    }
  }

  async updateAdminState({ _id, isadmin }: Users): Promise<Users> {
    try {
      this.conct = await pgClient.connect();
      const sql = `UPDATE users SET isadmin = ($2) WHERE _id = ($1)`;
      const query = await this.conct.query(sql, [_id, isadmin]);
      this.conct.release();
      return query.rows[0];
    } catch (err) {
      this.conct.release();
      throw new Error(`${err}`);
    }
  }

  async delete({ _id }: Users): Promise<Users> {
    try {
      this.conct = await pgClient.connect();
      const sql = `DELETE FROM users WHERE _id = ($1) RETURNING _id`;
      const query = await this.conct.query(sql, [_id]);
      this.conct.release();
      return query.rows[0];
    } catch (err) {
      this.conct.release();
      if ((err as Error).message?.includes("orders_id_fkey")) {
        this.errMsg = customErr(err as Error, `Please delete any related orders first !.`, ".");
      } else {
        this.errMsg = err as string;
      }
      throw new Error(`${this.errMsg}`);
    }
  }

  async authenticateUser({ email, password }: Users): Promise<Users | null> {
    try {
      this.conct = await pgClient.connect();
      const sql = `SELECT password, email FROM users WHERE email = ($1)`;
      const query = await this.conct.query(sql, [email]);
      const userEmail = query.rows[0].email;
      if (!userEmail || userEmail == null) {
        this.conct.release();
        return null;
      }
      const hashed = query.rows[0].password;
      if (isPasswordValide(password as string, hashed)) {
        let sql = `SELECT _id, name, email, isadmin FROM users WHERE email = ($1)`;
        const user = await this.conct.query(sql, [email]);
        const token = generateAccessToken(user.rows[0]);
        sql = `
        UPDATE users SET token = ($1) WHERE email = ($2) 
        RETURNING _id, name, email, isadmin, token`;
        const loggedUser = await this.conct.query(sql, [token, email]);
        this.conct.release();
        return loggedUser.rows[0];
      }
      return null;
    } catch (err) {
      this.conct.release();
      if ((err as Error).message?.includes("undefined")) {
        this.errMsg = customErr(err as Error, "email is not registered.", ".");
      } else {
        this.errMsg = err as string;
      }
      throw new Error(`${this.errMsg}`);
    }
  }

  async delUserToken({ _id }: Users): Promise<Users> {
    try {
      this.conct = await pgClient.connect();
      const sql = `UPDATE users SET token = '' WHERE _id = ($1)`;
      const query = await pgClient.query(sql, [_id]);
      this.conct.release();
      return query.rows[0];
    } catch (err) {
      this.conct.release();
      throw new Error(`${err}`);
    }
  }
}

export const User = new UserModel();
