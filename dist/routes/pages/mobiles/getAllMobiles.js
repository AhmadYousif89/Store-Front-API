"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMobiles = void 0;
const express_1 = require("express");
const mobile_1 = require("../../../models/mobile");
// method => GET
// desc   => Return all mobile data.
exports.getMobiles = (0, express_1.Router)().get("/products/mobiles", async (_req, res, next) => {
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
