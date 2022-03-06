"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (error, _req, res) => {
    const status = error.status || 500;
    const message = error.message || "Oops, Something went wrong !";
    res.status(status).json({ message });
};
exports.default = errorHandler;
