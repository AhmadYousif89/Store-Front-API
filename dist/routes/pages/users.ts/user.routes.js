"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../../../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// method => POST /users
// desc   => Create new user data.
const createUser = (0, express_1.Router)().post("/users/:name/:pw", async (req, res, next) => {
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
            return;
        }
        res.status(201).json(data);
    }
    catch (err) {
        next(err);
    }
});
// method => POST /users/auth
// desc   => Authenticate user data.
const authUser = (0, express_1.Router)().post("/users/auth/:name/:pw", async (req, res, next) => {
    const u_name = req.params.name;
    const u_password = req.params.pw;
    console.log(`params:
      ${u_name}
      ${u_password}`);
    const { SECRET_TOKEN } = process.env;
    try {
        const user = await users_1.userStore.validateUser(u_name, u_password);
        const token = jsonwebtoken_1.default.sign({ user }, SECRET_TOKEN);
        if (!user) {
            res
                .status(401)
                .json({ msg: "Authentication failed !", data: "Invalid password or User Name" });
            return;
        }
        res.status(200).json({
            msg: "User authenticated successfully",
            token,
        });
    }
    catch (err) {
        next(err);
    }
});
// method => GET /users
// desc   => Return all users data.
const getUsers = (0, express_1.Router)().get("/users", async (_req, res, next) => {
    try {
        const data = await users_1.userStore.getAllUsers();
        if (data.length === 0) {
            res.json({ msg: `No Users Were Found !` });
            return;
        }
        res.status(200).json({ msg: "Data generated successfully", data });
    }
    catch (err) {
        next(err);
    }
});
// method => GET /users/:id
// desc   => Return a specific user.
const getUserById = (0, express_1.Router)().get("/users/:id", async (req, res, next) => {
    const u_uid = req.params.id;
    console.log("params: ", u_uid);
    try {
        const data = await users_1.userStore.getUserById(u_uid);
        if (!data) {
            res.status(404).json(data);
            return;
        }
        res.status(200).json(data);
        return;
    }
    catch (err) {
        next(err);
    }
});
// method => PUT /users/:id
// desc   => Update a specific user .
const updateUser = (0, express_1.Router)().put("/users/:id/:pw", async (req, res, next) => {
    const u_uid = req.params.id;
    const u_password = req.params.pw;
    console.log(`params: 
      ${u_uid} 
      ${u_password}`);
    try {
        const data = await users_1.userStore.updateUser(u_uid, u_password);
        if (!data) {
            res.status(404).json(data);
            return;
        }
        res.status(200).json(data);
    }
    catch (err) {
        next(err);
    }
});
// method => DELETE /users/:id
// desc   => Delete a specific user.
const deleteUser = (0, express_1.Router)().delete("/users/:id", async (req, res, next) => {
    const u_uid = req.params.id;
    console.log("params: \n", u_uid);
    try {
        const data = await users_1.userStore.delUser(u_uid);
        if (!data) {
            res.status(404).json(data);
            return;
        }
        res.status(200).json(data);
    }
    catch (err) {
        next(err);
    }
});
exports.default = { createUser, authUser, getUsers, getUserById, updateUser, deleteUser };
