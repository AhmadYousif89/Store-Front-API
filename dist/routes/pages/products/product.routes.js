"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_1 = require("../../../models/products");
let error;
// method => POST /products
// desc   => Create new product data.
const createProducts = (0, express_1.Router)().post("/products", async (req, res, next) => {
    const { name, category } = req.body;
    const price = Number.parseInt(req.body.price);
    console.log(`params:
      ${name} ${price} ${category}`);
    // validating values before submitting.
    if (!name || !price || price <= 0 || !category) {
        res
            .status(400)
            .json({ status: "Error", message: "Please provide correct details before submiting !" });
        return;
    }
    try {
        const data = await products_1.productModel.createProduct({
            name: name,
            price: price,
            category: category,
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
        const data = await products_1.productModel.getAllProducts();
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
// method => GET /products/id
// desc   => Return a specific product.
const getProductById = (0, express_1.Router)().get("/products/id/", async (req, res, next) => {
    const { id } = req.body;
    console.log("data: \n", id);
    if (!id) {
        res.status(400).json({ status: "Error", message: "Please provide product id !" });
        return;
    }
    try {
        const data = await products_1.productModel.getProductById(id);
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
const updateProduct = (0, express_1.Router)().put("/products/", async (req, res, next) => {
    const { id } = req.body;
    const price = Number.parseInt(req.body.price);
    console.log(`data: 
      ${id} 
      ${price}`);
    if (!id || !price || price <= 0) {
        res
            .status(400)
            .json({ status: "Error", message: "Please provide product id and new price !" });
        return;
    }
    try {
        const data = await products_1.productModel.updateProduct(id, price);
        if (!data) {
            res.status(404).json({
                msg: "Update failed !",
                data: `Product with id (${id}) doesn't exist`,
            });
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
// method => DELETE /products/Products/id
// desc   => Delete a specific Product.
const deleteProduct = (0, express_1.Router)().delete("/products/Products/id/", async (req, res, next) => {
    const { id } = req.body;
    console.log("data: \n", id);
    if (!id) {
        res.status(400).json({ status: "Error", message: "Please provide product id !" });
        return;
    }
    try {
        const data = await products_1.productModel.delProduct(id);
        if (!data) {
            res.status(404).json({
                msg: "Delete failed !",
                data: `Product with id (${id}) doesn't exist`,
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
exports.default = { createProducts, getProducts, getProductById, updateProduct, deleteProduct };
