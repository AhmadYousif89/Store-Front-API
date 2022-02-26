"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = void 0;
const express_1 = require("express");
const users_1 = require("../../../models/users");
// method => DELETE /delete/:id
// desc   => Delete a specific user.
exports.deleteUser = (0, express_1.Router)().delete("/users/delete/:id", async (req, res) => {
    const u_uid = req.params.id;
    try {
        console.log("params: \n", u_uid);
        const data = await users_1.userStore.delUser(u_uid);
        res.status(200).json(data);
    }
    catch (err) {
        res.status(404).json(err);
        console.error(err);
    }
});
