"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMobile = void 0;
const express_1 = require("express");
const mobile_1 = require("../../../models/mobile");
// method => PUT /edit/:id
// desc   => Update a specific mobile .
exports.updateMobile = (0, express_1.Router)().put("/products/mobiles/update/:id/:price", async (req, res, next) => {
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
