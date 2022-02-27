"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = void 0;
const express_1 = require("express");
exports.products = (0, express_1.Router)().get("/products", (_req, res) => {
    try {
        res.status(200).send(`<h2>Products Page ...</h2>`);
    }
    catch (err) {
        res.status(404).json({ msg: "No Products Found !" });
    }
});
