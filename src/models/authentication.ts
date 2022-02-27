import pgClient from "../database";
import { isPwValide, Users } from "../utils/control";

export const validateUser = async (
  u_name: string,
  u_password: string
): Promise<Users[] | string> => {
  try {
    const conct = await pgClient.connect();
    const sql = `SELECT u_password FROM users WHERE u_name = ($1)`;
    const result = await conct.query(sql, [u_name]);
    if (result.rows.length) {
      const user = result.rows[0];
      if (isPwValide(u_password, user.u_password)) {
        console.log("user pw is : ", user);
        return user;
      }
    }
    return `Invalid password or User Name`;
  } catch (err) {
    throw new Error(`Can't validate user with name (${u_name}) from table Users \n\n ${err}`);
  }
};
