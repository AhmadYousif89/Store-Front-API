"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMobiles = void 0;
const express_1 = require("express");
const mobile_1 = require("../../../models/mobile");
// method => GET
// desc   => Return all mobile data.
exports.getMobiles = (0, express_1.Router)().get("/products/mobiles", async (_req, res) => {
    try {
        const data = await mobile_1.mobileStore.getAllMobs();
        res.status(200).json(data);
    }
    catch (err) {
        res.status(404).json(err);
        console.error(err);
    }
});
