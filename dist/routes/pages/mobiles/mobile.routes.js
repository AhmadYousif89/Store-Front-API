"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mobile_1 = require("../../../models/mobile");
let error;
// method => POST /products/mobiles
// desc   => Create new mobile data.
const createMobile = (0, express_1.Router)().post("/products/mobiles/", async (req, res, next) => {
    const { brand, model, maker, coo } = req.body;
    const price = Number.parseInt(req.body.price);
    console.log(`params:
      ${brand} ${model} ${price} ${maker} ${coo}`);
    // validating values before submitting.
    if (!brand || !model || !price || price <= 0 || !maker || !coo) {
        res
            .status(400)
            .json({ status: "Error", message: "Please provide correct details before submiting !" });
        return;
    }
    try {
        const data = await mobile_1.mobileModel.createMob({
            brand_name: brand,
            model_name: model,
            manufacturer: maker,
            price: price,
            made_in: coo,
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
// method => GET /products/mobiles
// desc   => Return all mobile data.
const getMobiles = (0, express_1.Router)().get("/products/mobiles/", async (_req, res, next) => {
    try {
        const data = await mobile_1.mobileModel.getAllMobs();
        if (data.length === 0) {
            res.status(404).json({ msg: `No Mobiles Were Found !` });
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
// method => GET /products/mobiles/id
// desc   => Return a specific mobile.
const getMobById = (0, express_1.Router)().get("/products/mobiles/id/", async (req, res, next) => {
    const { id } = req.body;
    console.log("data: \n", id);
    if (!id) {
        res.status(400).json({ status: "Error", message: "Please provide mobile id !" });
        return;
    }
    try {
        const data = await mobile_1.mobileModel.getMobById(id);
        if (!data) {
            res
                .status(404)
                .json({ msg: "Request failed !", data: `Mobile with id (${id}) Doesn't Exist !` });
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
// method => PUT /products/mobiles
// desc   => Update a specific mobile .
const updateMobile = (0, express_1.Router)().put("/products/mobiles/", async (req, res, next) => {
    const { id } = req.body;
    const price = Number.parseInt(req.body.price);
    console.log(`data: 
      ${id} 
      ${price}`);
    if (!id || !price || price <= 0) {
        res
            .status(400)
            .json({ status: "Error", message: "Please provide mobile id and new price !" });
        return;
    }
    try {
        const data = await mobile_1.mobileModel.updateMob(id, price);
        if (!data) {
            res.status(404).json({
                msg: "Update failed !",
                data: `Mobile with id (${id}) doesn't exist`,
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
// method => DELETE /products/mobiles/id
// desc   => Delete a specific mobile.
const deleteMobile = (0, express_1.Router)().delete("/products/mobiles/id/", async (req, res, next) => {
    const { id } = req.body;
    console.log("data: \n", id);
    if (!id) {
        res.status(400).json({ status: "Error", message: "Please provide mobile id !" });
        return;
    }
    try {
        const data = await mobile_1.mobileModel.delMob(id);
        if (!data) {
            res.status(404).json({
                msg: "Delete failed !",
                data: `Mobile with id (${id}) doesn't exist`,
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
exports.default = { createMobile, getMobiles, getMobById, updateMobile, deleteMobile };
