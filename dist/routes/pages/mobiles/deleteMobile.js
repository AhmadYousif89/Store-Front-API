"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMobile = void 0;
const express_1 = require("express");
const mobile_1 = require("../../../models/mobile");
// method => DELETE /delete/:id
// desc   => Delete a specific mobile.
exports.deleteMobile = (0, express_1.Router)().delete("/products/mobiles/delete/:id", async (req, res) => {
    const mob_uid = req.params.id;
    try {
        console.log("params: \n", mob_uid);
        const data = await mobile_1.mobileStore.delMob(mob_uid);
        res.status(200).json(data);
    }
    catch (err) {
        res.status(404).json(err);
        console.error(err);
    }
});
