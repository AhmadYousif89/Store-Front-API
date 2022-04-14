import bCrypt from "bcrypt";

type DbSchema = {
  p_id?: string;
  op_id?: number;
  i_at?: string;
  name?: string;
  email?: string;
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
  price?: number;
  imageUrl?: string;
  image_url?: string;
  description?: string;
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
