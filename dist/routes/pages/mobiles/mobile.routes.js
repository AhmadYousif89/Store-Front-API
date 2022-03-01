"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mobile_1 = require("../../../models/mobile");
// method => POST /products/mobiles
// desc   => Create new mobile data.
const createMobile = (0, express_1.Router)().post("/products/mobiles/:brand/:model/:price/:maker/:com", async (req, res, next) => {
    const params = {
        brand_name: req.params.brand,
        model_name: req.params.model,
        price: req.params.price,
        manufacturer: req.params.maker,
        made_in: req.params.com,
    };
    console.log(`params:
      ${params.brand_name} ${params.model_name} ${params.price} ${params.manufacturer} ${params.made_in}`);
    try {
        const data = await mobile_1.mobileStore.createMob(params);
        if (!data) {
            res.status(404).json(data);
        }
        res.status(201).json(data);
    }
    catch (err) {
        next(err);
    }
});
// method => GET /products/mobiles
// desc   => Return all mobile data.
const getMobiles = (0, express_1.Router)().get("/products/mobiles", async (_req, res, next) => {
    try {
        const data = await mobile_1.mobileStore.getAllMobs();
        if (data.length === 0) {
            res.status(404).json({ msg: `No Mobiles Were Found !` });
            return;
        }
        res.status(200).json({ msg: "data generated successfuly", data });
    }
    catch (err) {
        next(err);
    }
});
// method => GET /products/mobiles/:id
// desc   => Return a specific mobile.
const getMobById = (0, express_1.Router)().get("/products/mobiles/:id", async (req, res, next) => {
    const mob_uid = req.params.id;
    console.log("params: ", mob_uid);
    try {
        const data = await mobile_1.mobileStore.getMobById(mob_uid);
        if (!data) {
            res.status(404).json({ msg: `Mobile with ID ${mob_uid} Doesn't Exist !` });
            return;
        }
        res.status(200).json({ msg: "mobile generated successfuly", data });
    }
    catch (err) {
        next(err);
    }
});
// method => PUT /products/mobiles/:id
// desc   => Update a specific mobile .
const updateMobile = (0, express_1.Router)().put("/products/mobiles/:id/:price", async (req, res, next) => {
    const mob_uid = req.params.id;
    const price = req.params.price;
    console.log(`params: 
      ${mob_uid} 
      ${price}`);
    try {
        const data = await mobile_1.mobileStore.updateMob(mob_uid, price);
        if (!data) {
            res.status(404).json(data);
        }
        res.status(200).json(data);
    }
    catch (err) {
        next(err);
    }
});
// method => DELETE /products/mobiles/:id
// desc   => Delete a specific mobile.
const deleteMobile = (0, express_1.Router)().delete("/products/mobiles/:id", async (req, res, next) => {
    const mob_uid = req.params.id;
    console.log("params: \n", mob_uid);
    try {
        const data = await mobile_1.mobileStore.delMob(mob_uid);
        if (!data) {
            res.status(404).json(data);
        }
        res.status(200).json(data);
    }
    catch (err) {
        next(err);
    }
});
exports.default = { createMobile, getMobiles, getMobById, updateMobile, deleteMobile };
