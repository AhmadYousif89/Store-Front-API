"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMobile = void 0;
const express_1 = require("express");
const mobile_1 = require("../../../models/mobile");
const control_1 = require("../../../utils/control");
// method => POST /create
// desc   => Create new data.
exports.postMobile = (0, express_1.Router)().post("/products/mobiles/create/:brand/:model/:price/:maker/:com", async (req, res) => {
    const params = {
        mob_uid: control_1.uuid,
        brand_name: req.params.brand,
        model_name: req.params.model,
        price: req.params.price,
        manufacturer: req.params.maker,
        made_in: req.params.com,
    };
    try {
        const data = await mobile_1.mobileStore.createRow(params);
        // console.log(
        //   `params:
        //   ${params.mob_uid}
        //   ${params.brand_name} ${params.model_name} ${params.price}
        //   ${params.manufacturer} ${params.made_in}`
        // );
        res.json(data).status(201);
    }
    catch (err) {
        res.send(err).status(400);
        console.error(err);
    }
});
