"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const express_1 = require("express");
const users_1 = require("./../../../models/users");
// import { uuid } from "../../../utils/control";
// method => POST /create
// desc   => Create new user data.
exports.createUser = (0, express_1.Router)().post("/users/create/:name/:pw", async (req, res) => {
    const params = {
        u_name: req.params.name,
        u_password: req.params.pw,
    };
    try {
        const data = await users_1.userStore.createUser(params);
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
