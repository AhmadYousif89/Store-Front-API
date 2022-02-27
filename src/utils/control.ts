import bCrypt from "bcrypt";

type Error = {
  name?: string;
  message?: string;
  stack?: string;
  status?: number;
};
type Mobile = {
  mob_uid?: string;
  brand_name: string;
  model_name: string;
  manufacturer: string;
  price: number;
  made_in: string;
};
type Users = {
  u_uid?: string;
  u_name: string;
  u_password: string;
};

const { SALT, PEPPER } = process.env;

const encrypt = (password: string): string => {
  const hash = bCrypt.hashSync(password + PEPPER, parseInt(SALT as string));
  return hash;
};

const isPwValide = (password: string, hashed: string): boolean | null => {
  return bCrypt.compareSync(password + PEPPER, hashed);
};

export { Error, Mobile, Users, encrypt, isPwValide };
