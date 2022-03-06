import bCrypt from "bcrypt";

type Users = {
  u_id?: string;
  u_name?: string;
  password?: string;
  msg?: string;
  data?: string | object;
};
type Orders = {
  o_id?: number;
  order_status?: string;
  user_id?: string;
  msg?: string;
  data?: string | object;
};
type OP = {
  op_id?: number;
  order_id?: number;
  quantity?: number;
  product_id?: string;
  msg?: string;
  data?: string | object;
};
type Product = {
  p_id?: string;
  category?: string;
  p_name?: string;
  brand?: string;
  maker?: string;
  price?: number;
  popular?: string;
  msg?: string;
  data?: string | object;
};
type Error = {
  name?: string;
  message?: string;
  stack?: string;
  status?: number;
};

const { SALT, PEPPER } = process.env;

const encrypt = (password: string): string => {
  const hash = bCrypt.hashSync(password + PEPPER, parseInt(SALT as string));
  return hash;
};

const isPwValide = (password: string, hashed: string): boolean | null => {
  return bCrypt.compareSync(password + PEPPER, hashed);
};

const customErr = (err: Error, msg: string, spliter: string) => {
  const str = (err as Error).message?.replace("", msg).split(spliter)[0];
  return str;
};

export { Users, Orders, Product, OP, Error, encrypt, isPwValide, customErr };
