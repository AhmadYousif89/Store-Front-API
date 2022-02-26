"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchMobile = void 0;
const express_1 = require("express");
const mobile_1 = require("../../../models/mobile");
// method => PATCH /edit/:id
// desc   => Update (partially) a specific row .
exports.patchMobile = (0, express_1.Router)().put("/products/mobiles/update/:id/:price", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mob_uid = req.params.id;
    const price = req.params.price;
    try {
        console.log("params: ", mob_uid, " ", price);
        const data = yield mobile_1.mobileStore.update(mob_uid, price);
        res.json(data);
    }
    catch (err) {
        res.json(err).status(400);
        console.error(err);
    }
}));
