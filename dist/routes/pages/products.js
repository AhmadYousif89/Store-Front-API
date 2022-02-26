"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = void 0;
const express_1 = require("express");
exports.products = (0, express_1.Router)().get("/products", (_req, res) => {
    try {
        res.send(`<h2>Products Page ...</h2>`);
    }
    catch (err) {
        res.status(400);
        res.json({ msg: `Error \n${err}` });
    }
});
