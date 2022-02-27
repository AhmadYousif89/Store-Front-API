"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = void 0;
const express_1 = require("express");
const users_1 = require("../../../models/users");
// method => DELETE /delete/:id
// desc   => Delete a specific user.
exports.deleteUser = (0, express_1.Router)().delete("/users/delete/:id", async (req, res) => {
    const u_uid = req.params.id;
    console.log("params: \n", u_uid);
    try {
        const data = await users_1.userStore.delUser(u_uid);
        if (data.length === 0) {
            res.status(404).json({ msg: `User with ID ${u_uid} Doesn't Exist !` });
            return;
        }
        res.status(200).json(data);
    }
    catch (err) {
        res.status(404).json({ msg: "Data not found !" });
        console.error(err);
    }
});
