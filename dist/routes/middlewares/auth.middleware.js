"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { SECRET_TOKEN } = process.env;
const handleAuthErr = (next) => {
    const err = { message: "Access denied, Faild to authenticate !", status: 401 };
    next(err);
};
const handleAuthentication = (req, _res, next) => {
    try {
        // get authHeader
        const authheader = req.headers.authorization;
        if (authheader) {
            // get authHeader token
            const token = authheader.split(" ")[1];
            // get authHeader bearer
            const bearer = authheader.split(" ")[0];
            // check and vaildate bearer and token
            if (token && bearer === "bearer") {
                // verify and decode based on my secret token
                const decode = jsonwebtoken_1.default.verify(token, SECRET_TOKEN);
                if (decode) {
                    // move forword to next route
                    next();
                }
                else {
                    // authentication failed
                    handleAuthErr(next);
                }
            }
            else {
                // if token not type of bearer
                handleAuthErr(next);
            }
        }
        else {
            // no token given
            handleAuthErr(next);
        }
    }
    catch (err) {
        // handle error
        handleAuthErr(next);
    }
};
exports.default = handleAuthentication;
