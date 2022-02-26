"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const express_1 = require("express");
const users_1 = require("../../models/users");
// method => GET /create
// desc   => Authenticate user data.
exports.createUser = (0, express_1.Router)().get("/auth/:", async (req, res) => {
    const params = {
        u_name: req.params.name,
        u_password: req.params.pw,
    };
    try {
        const data = await users_1.userStore.validateUser(params.u_name, params.u_password);
        console.log(`params:
        ${params.u_name}
        ${params.u_password}`);
        res.status(201).json(data);
    }
    catch (err) {
        res.status(400).send(err);
        console.error(err);
    }
});
