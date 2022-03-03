"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const app_routes_1 = require("./routes/app.routes");
const express_1 = __importDefault(require("express"));
const error_middleware_1 = __importDefault(require("./routes/middlewares/error.middleware"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
// app.use(express.static("public"));
app.use(express_1.default.json());
exports.corsOptions = {
    origin: process.env.PG_HOST,
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(exports.corsOptions));
app.use("/", app_routes_1.routes);
app.get("/", (_req, res) => {
    res.status(200).json(`<h2>Home Page ...</h2>`);
});
app.use(error_middleware_1.default);
app.use((_req, res) => {
    res.status(404).json({
        msg: "Please read our API documention to know how to use the application, Good Luck !",
    });
});
const port = process.env.SERVER_PORT || 2020;
app.listen(port, async () => {
    console.log(`server running on port ${port}...\n`);
});
exports.default = app;
