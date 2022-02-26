"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPwValide = exports.encrypt = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
// const { SALT, PEPPER } = process.env;
const encrypt = (password) => {
    // password = salt + PEPPER;
    const salt = bcrypt_1.default.genSaltSync(10);
    const hash = bcrypt_1.default.hashSync(password, salt);
    return hash;
};
exports.encrypt = encrypt;
// console.log(encrypt("123"));
const isPwValide = (password, hashed) => {
    return bcrypt_1.default.compareSync(password, hashed);
};
exports.isPwValide = isPwValide;
// console.log(userMatchPw("123", "$2b$10$E8bAZojjglA/yBJ7QJrTouwytf8rt5aqvnkzqitinqZW.3Ou6CVdS"));
