"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOps = void 0;
const app_1 = require("./routes/app");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
// app.use(express.static("public"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/", app_1.routes);
exports.corsOps = {
    origin: process.env.PG_HOST,
    optionsSuccessStatus: 200,
};
app.get("/", (0, cors_1.default)(exports.corsOps), (_req, res) => {
    res.send(`<h2>Home Page ...</h2>`);
});
const port = process.env.SERVER_PORT || 2020;
app.listen(port, () => console.log(`server running on port ${port}...\n`));
exports.default = app;
