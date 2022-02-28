"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = void 0;
const express_1 = require("express");
const users_1 = require("../../../models/users");
// method => GET /:id
// desc   => Return a specific user.
exports.getUserById = (0, express_1.Router)().get("/users/:id", async (req, res, next) => {
    const u_uid = req.params.id;
    console.log("params: ", u_uid);
    try {
        const data = await users_1.userStore.getUserById(u_uid);
        if (!data) {
            res.status(404).json({ msg: `User with ID ${u_uid} Doesn't Exist !` });
            return;
        }
        res.status(200).json({ msg: "user generated successfuly", data });
        return;
    }
    catch (err) {
        next(err);
    }
});
