"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMobile = void 0;
const express_1 = require("express");
const mobile_1 = require("../../../models/mobile");
// method => POST /create
// desc   => Create new mobile data.
exports.createMobile = (0, express_1.Router)().post("/products/mobiles/create/:brand/:model/:price/:maker/:com", async (req, res) => {
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
        res.status(201).json(data);
    }
    catch (err) {
        res.status(400).json({ msg: "Can't create mobile !" });
        console.error(err);
    }
});
