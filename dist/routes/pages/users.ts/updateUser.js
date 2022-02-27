"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const express_1 = require("express");
const users_1 = require("../../../models/users");
// method => PUT /edit/:id
// desc   => Update a specific user .
exports.updateUser = (0, express_1.Router)().put("/users/update/:id/:pw", async (req, res) => {
    const u_uid = req.params.id;
    const password = req.params.pw;
    console.log(`params: 
      ${u_uid} 
      ${password}`);
    try {
        const data = await users_1.userStore.updateUser(u_uid, password);
        res.status(200).json(data);
    }
    catch (err) {
        res.status(400).json({ msg: "Can't update user !" });
        console.error(err);
    }
});
