import bCrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Users } from "../types/types";

const { SALT, PEPPER, SECRET_TOKEN } = process.env;

const generateAccessToken = (user: Users): string => {
  const token = jwt.sign(user, SECRET_TOKEN as string, { expiresIn: "30d" });
  return token;
};

const encrypt = (password: string): string => {
  const hash = bCrypt.hashSync(password + PEPPER, parseInt(SALT as string));
  return hash;
};

const isPasswordValide = (password: string, hashed: string): boolean | null => {
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

export { encrypt, isPasswordValide, customErr, validateEmail, generateAccessToken };
