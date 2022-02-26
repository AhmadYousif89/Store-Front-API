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

// const { SALT, PEPPER } = process.env;

export const encrypt = (password: string): string => {
  // password = salt + PEPPER;
  const salt = bCrypt.genSaltSync(10);
  const hash = bCrypt.hashSync(password, salt);
  return hash;
};

// console.log(encrypt("123"));

export const isPwValide = (password: string, hashed: string): boolean | null => {
  return bCrypt.compareSync(password, hashed);
};

// console.log(userMatchPw("123", "$2b$10$E8bAZojjglA/yBJ7QJrTouwytf8rt5aqvnkzqitinqZW.3Ou6CVdS"));
