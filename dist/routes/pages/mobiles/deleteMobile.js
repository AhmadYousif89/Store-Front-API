"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMobile = void 0;
const express_1 = require("express");
const mobile_1 = require("../../../models/mobile");
// method => DELETE /delete/:id
// desc   => Delete a specific mobile.
exports.deleteMobile = (0, express_1.Router)().delete("/products/mobiles/delete/:id", async (req, res, next) => {
    const mob_uid = req.params.id;
    console.log("params: \n", mob_uid);
    if (!mob_uid) {
        return;
    }
    try {
        const data = await mobile_1.mobileStore.delMob(mob_uid);
        if (!data) {
            res.status(404).json({ msg: `Mobile with ID ${mob_uid} Doesn't Exist !` });
            return;
        }
        res.status(200).json({ msg: "mobile deleted successfuly", data });
    }
    catch (err) {
        next(err);
    }
});
