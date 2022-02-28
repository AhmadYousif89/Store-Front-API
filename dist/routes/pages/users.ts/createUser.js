"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const express_1 = require("express");
const users_1 = require("../../../models/users");
// method => POST /create
// desc   => Create new user data.
exports.createUser = (0, express_1.Router)().post("/users/create/:name/:pw", async (req, res, next) => {
    const params = {
        u_name: req.params.name,
        u_password: req.params.pw,
    };
    console.log(`params:
      ${params.u_name}
      ${params.u_password}`);
    try {
        const data = await users_1.userStore.createUser(params);
        if (!data) {
            res.status(404).json(data);
        }
        res.status(201).json(data);
    }
    catch (err) {
        next(err);
    }
});
