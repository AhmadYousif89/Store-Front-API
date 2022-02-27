"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = void 0;
const express_1 = require("express");
const authentication_1 = require("../../../models/authentication");
// method => GET /auth
// desc   => Authenticate user data.
exports.authUser = (0, express_1.Router)().get("/auth/:name/:pw", async (req, res) => {
    const u_name = req.params.name;
    const u_password = req.params.pw;
    console.log(`params:
      ${u_name}
      ${u_password}`);
    try {
        const data = await (0, authentication_1.validateUser)(u_name, u_password);
        res.status(200).json(data);
    }
    catch (err) {
        res.status(404).json({ msg: "Data Not Found !" });
        console.error(err);
    }
});
