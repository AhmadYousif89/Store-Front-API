"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_1 = require("./products");
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
let error;
// method => POST /products
// desc   => Create new product data.
const createProducts = (0, express_1.Router)().post("/products", auth_middleware_1.default, async (req, res, next) => {
    const { name, brand, maker } = req.body;
    const category = req.body.category.toLowerCase();
    const price = parseInt(req.body.price);
    const popular = req.body.popular.toLowerCase();
    console.log(`params:
      ${category} ${name} ${brand}  ${maker} ${price} ${popular}`);
    // validating values before submitting.
    if (!category || !name || !brand || !maker || !price || price <= 0) {
        res
            .status(400)
            .json({ status: "Error", message: "Please enter a valid details before submiting !" });
        return;
    }
    try {
        const data = await products_1.productModel.create({
            category: category,
            p_name: name,
            brand: brand,
            maker: maker,
            price: price,
            popular: popular,
        });
        res.status(201).json(data);
    }
    catch (err) {
        error = {
            message: `Request Failed ! ${err.message}`,
        };
        next(error);
    }
});
// method => GET /products
// desc   => Return all products data.
const getProducts = (0, express_1.Router)().get("/products", async (_req, res, next) => {
    try {
        const data = await products_1.productModel.index();
        if (data.length === 0) {
            res.status(404).json({ msg: `No Products Were Found !` });
            return;
        }
        res.status(200).json({ msg: "Data generated successfully", data });
    }
    catch (err) {
        error = {
            message: `Request Failed ! ${err.message}`,
        };
        next(error);
    }
});
// method => GET /products/:id
// desc   => Return a specific product by id.
const getProductById = (0, express_1.Router)().get("/products/:id", async (req, res, next) => {
    const id = req.params.id;
    console.log("data: \n", id);
    try {
        const data = await products_1.productModel.show(id);
        if (!data) {
            res
                .status(404)
                .json({ msg: "Request failed !", data: `Product with id (${id}) Doesn't Exist !` });
            return;
        }
        res.status(200).json(data);
    }
    catch (err) {
        error = {
            message: `Request Failed ! ${err.message}`,
        };
        next(error);
    }
});
// method => PUT /products
// desc   => Update a specific product .
const updateProduct = (0, express_1.Router)().put("/products", async (req, res, next) => {
    const pid = req.body.id;
    const price = parseInt(req.body.price);
    const popular = req.body.popular.toLowerCase();
    console.log(`data: 
      ${pid} 
      ${price}
      ${popular}`);
    if (!pid || !price || price <= 0) {
        res
            .status(400)
            .json({ status: "Error", message: "Please provide a valid details before updating !" });
        return;
    }
    try {
        const data = await products_1.productModel.update(pid, price, popular);
        if (!data) {
            res.status(404).json({
                msg: "Update failed !",
                data: `Product with id (${pid}) doesn't exist`,
            });
            return;
        }
        res.status(200).json(data);
    }
    catch (err) {
        error = {
            message: `Request Failed ! ${err.message}`,
        };
        next(error);
    }
});
// method => DELETE /products/:id
// desc   => Delete a specific Product.
const deleteProduct = (0, express_1.Router)().delete("/products/:id", async (req, res, next) => {
    const pid = req.params.id;
    console.log("data: \n", pid);
    if (!pid) {
        res.status(400).json({ status: "Error", message: "Please provide product id !" });
        return;
    }
    try {
        const data = await products_1.productModel.delete(pid);
        if (!data) {
            res.status(404).json({
                msg: "Delete failed !",
                data: `Product with id (${pid}) doesn't exist`,
            });
            return;
        }
        res.status(200).json(data);
    }
    catch (err) {
        error = {
            message: `Request Failed ! ${err.message}`,
        };
        next(error);
    }
});
exports.default = {
    createProducts,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
