"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = void 0;
const express_1 = require("express");
const users_1 = require("../../../models/users");
// method => GET /:id
// desc   => Return a specific user.
exports.getUserById = (0, express_1.Router)().get("/users/:id", async (req, res) => {
    const u_uid = req.params.id;
    try {
        console.log("params: ", u_uid);
        const data = await users_1.userStore.getUserById(u_uid);
        res.status(200).json(data);
    }
    catch (err) {
        res.status(404).json(err);
        console.error(err);
    }
});
