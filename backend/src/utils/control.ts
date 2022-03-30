import bCrypt from "bcrypt";

type DbSchema = {
  u_id?: string;
  p_id?: string;
  op_id?: number;
  u_name?: string;
  u_email?: string;
  user_id?: string;
  order_id?: number;
  password?: string;
  product_id?: string;
  order_status?: string;
  created_at?: string;
  category?: string;
  quantity?: number;
  p_name?: string;
  brand?: string;
  maker?: string;
  price?: number;
  popular?: string;
  message?: string;
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

const validateEmail = (email: string): boolean => {
  const emailPattern = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,8}$/i;
  return emailPattern.test(email);
};

export { DbSchema, Error, encrypt, isPwValide, customErr, validateEmail };
