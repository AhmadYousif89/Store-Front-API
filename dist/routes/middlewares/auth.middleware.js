"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleAuthErr = (next) => {
    const err = { message: "Access denied, Faild to authenticate !", status: 401 };
    next(err);
};
const handleAuthentication = (req, _res, next) => {
    try {
        // get authHeader
        const authheader = req.headers.authorization;
        // console.log(authheader);
        // check and vaildate
        // get authHeader token
        // check it is bearer token or not
        // verify and decode based on my token secret
        // next()
        // auth failed
        // if token ype not bearer
        // no token given
    }
    catch (err) {
        // handle error
        handleAuthErr(next);
    }
};
exports.default = handleAuthentication;
