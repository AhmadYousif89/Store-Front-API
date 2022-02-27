"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPwValide = exports.encrypt = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const { SALT, PEPPER } = process.env;
const encrypt = (password) => {
    const hash = bcrypt_1.default.hashSync(password + PEPPER, parseInt(SALT));
    return hash;
};
exports.encrypt = encrypt;
const isPwValide = (password, hashed) => {
    return bcrypt_1.default.compareSync(password + PEPPER, hashed);
};
exports.isPwValide = isPwValide;
