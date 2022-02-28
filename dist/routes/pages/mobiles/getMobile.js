"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMobById = void 0;
const express_1 = require("express");
const mobile_1 = require("../../../models/mobile");
// method => GET /:id
// desc   => Return a specific mobile.
exports.getMobById = (0, express_1.Router)().get("/products/mobiles/:id", async (req, res, next) => {
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
