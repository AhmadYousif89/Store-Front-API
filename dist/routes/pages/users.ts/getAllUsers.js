"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const express_1 = require("express");
const users_1 = require("./../../../models/users");
// method => GET
// desc   => Return all users data.
exports.getUsers = (0, express_1.Router)().get("/users", async (_req, res) => {
    try {
        const data = await users_1.userStore.getAllUsers();
        if (data.length === 0) {
            res.json({ msg: `No Users Were Found !` });
            return;
        }
        res.status(200).json(data);
    }
    catch (err) {
        res.status(404).json({ msg: "Data not found !" });
        console.error(err);
    }
});
