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
const createUser = (0, express_1.Router)().post("/users", async (req, res, next) => {
    const { name, password } = req.body;
    console.log(`data:
      ${name}
      ${password}`);
    try {
        if (!name || !password) {
            const error = { status: 400, message: "Please provide user name and password !" };
            next(error);
            return;
        }
        const data = await users_1.userStore.createUser({ u_name: name, u_password: password });
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
// method => POST /users/login
// desc   => Authenticate user data.
const loginUser = (0, express_1.Router)().post("/users/login", async (req, res, next) => {
    const { name, password } = req.body;
    console.log(`data:
      ${name}
      ${password}`);
    const { SECRET_TOKEN } = process.env;
    try {
        if (!name || !password) {
            const error = { status: 401, message: "Please provide user name and password !" };
            next(error);
            return;
        }
        const user = await users_1.userStore.validateUser(name, password);
        const token = jsonwebtoken_1.default.sign({ user }, SECRET_TOKEN);
        if (!user) {
            res
                .status(401)
                .json({ msg: "Authentication failed !", data: "Invalid password or User Name" });
            return;
        }
        res.status(200).json({
            msg: "User authenticated successfully",
            data: user,
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
// method => GET /users/id
// desc   => Return a specific user.
const getUserById = (0, express_1.Router)().get("/users/id", async (req, res, next) => {
    const { uid } = req.body;
    console.log("data: ", uid);
    try {
        if (!uid) {
            const error = { status: 400, message: "Please provide user id !" };
            next(error);
            return;
        }
        const data = await users_1.userStore.getUserById(uid);
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
// method => PUT /users
// desc   => Update a specific user .
const updateUser = (0, express_1.Router)().put("/users", async (req, res, next) => {
    const { uid, password } = req.body;
    console.log(`data: 
      ${uid} 
      ${password}`);
    try {
        if (!uid || !password) {
            const error = { status: 400, message: "Please provide user id and password !" };
            next(error);
            return;
        }
        const data = await users_1.userStore.updateUser(uid, password);
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
// method => DELETE /users/id
// desc   => Delete a specific user.
const deleteUser = (0, express_1.Router)().delete("/users/id", async (req, res, next) => {
    const { uid } = req.body;
    console.log("params: \n", uid);
    try {
        if (!uid) {
            const error = { status: 400, message: "Please provide user id !" };
            next(error);
            return;
        }
        const data = await users_1.userStore.delUser(uid);
        if (!data) {
            res.status(404).json({
                msg: "Delete failed !",
                data: `User with id (${uid}) doesn't exist`,
            });
            return;
        }
        res.status(200).json(data);
    }
    catch (err) {
        next(err);
    }
});
exports.default = { createUser, loginUser, getUsers, getUserById, updateUser, deleteUser };
