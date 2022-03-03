import bCrypt from "bcrypt";

type Users = {
  u_uid?: string;
  u_name?: string;
  password?: string;
  msg?: string;
  data?: string | object;
};
type Orders = {
  id?: number;
  order_status?: string;
  user_id?: string;
  msg?: string;
  data?: string | object;
};
type Product = {
  id?: number;
  name?: string;
  price?: number;
  category?: string;
  msg?: string;
  data?: string | object;
};
type Mobile = {
  mob_uid?: string;
  brand?: string;
  model?: string;
  maker?: string;
  price?: number;
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

export { Product, Orders, Error, Mobile, Users, encrypt, isPwValide };
