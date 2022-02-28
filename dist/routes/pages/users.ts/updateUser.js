"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const express_1 = require("express");
const users_1 = require("../../../models/users");
// method => PUT /edit/:id
// desc   => Update a specific user .
exports.updateUser = (0, express_1.Router)().put("/users/update/:id/:pw", async (req, res, next) => {
    const u_uid = req.params.id;
    const u_password = req.params.pw;
    console.log(`params: 
      ${u_uid} 
      ${u_password}`);
    try {
        const data = await users_1.userStore.updateUser(u_uid, u_password);
        if (!data) {
            res.status(404).json(data);
        }
        res.status(200).json(data);
    }
    catch (err) {
        next(err);
    }
});
