import pgDB from "../database";
import { Error, isPwValide, Users } from "../utils/control";

// Authentication function.
export const validateUser = async (u_name: string, u_password: string): Promise<Users | string> => {
  try {
    const conct = await pgDB.connect();
    const sql = `SELECT u_password FROM users WHERE u_name = ($1)`;
    const result = await conct.query(sql, [u_name]);
    // checking for data.
    if (result.rows.length) {
      const user = result.rows[0];
      // checking user password authenticity.
      if (isPwValide(u_password, user.u_password)) {
        return { msg: "User authenticated successfully", data: user };
      }
    }
    return { msg: "Authentication failed !", data: "Invalid password or User Name" };
  } catch (err) {
    // handling error
    throw new Error(
      `Can't validate user with name |${u_name}| from table Users \n ${(err as Error).message}`
    );
  }
};
