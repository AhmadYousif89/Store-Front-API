"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putMobile = void 0;
const express_1 = require("express");
const mobile_1 = require("../../../models/mobile");
// method => PATCH /edit/:id
// desc   => Update (partially) a specific row .
exports.putMobile = (0, express_1.Router)().put("/products/mobiles/update/:id/:price", async (req, res) => {
    const mob_uid = req.params.id;
    const price = req.params.price;
    try {
        console.log(`params: 
        ${mob_uid} 
        ${price}`);
        const data = await mobile_1.mobileStore.update(mob_uid, price);
        res.json(data).status(200);
    }
    catch (err) {
        res.json(err).status(400);
        console.error(err);
    }
});
