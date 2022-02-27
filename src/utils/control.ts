import bCrypt from "bcrypt";

export type Mobile = {
  mob_uid?: string;
  brand_name: string;
  model_name: string;
  manufacturer: string;
  price: number;
  made_in: string;
};
export type Users = {
  u_uid?: string;
  u_name: string;
  u_password: string;
};

const { SALT, PEPPER } = process.env;

export const encrypt = (password: string): string => {
  const hash = bCrypt.hashSync(password + PEPPER, parseInt(SALT as string));
  return hash;
};

export const isPwValide = (password: string, hashed: string): boolean | null => {
  return bCrypt.compareSync(password + PEPPER, hashed);
};
