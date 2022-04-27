import bCrypt from "bcrypt";

type Users = {
  user_id?: string;
  name?: string;
  email?: string;
  password?: string;
};
type UserToken = {
  user_id?: string;
  token?: string;
  i_at?: string;
};
type Orders = {
  order_id?: number;
  order_status?: string;
  user_id?: string;
  created_at?: string;
  updated_at?: string | null;
};
type Products = {
  p_id?: string;
  category?: string;
  p_name?: string;
  brand?: string;
  color?: string;
  price?: number;
  image_url?: string;
  description?: string;
};
type OP = {
  op_id?: number;
  order_id?: number;
  product_id?: string;
  quantity?: number;
  created_at?: string;
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

export {
  Users,
  UserToken,
  Orders,
  Products,
  OP,
  Error,
  encrypt,
  isPwValide,
  customErr,
  validateEmail,
};
