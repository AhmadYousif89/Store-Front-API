import { Response, Request, NextFunction } from "express";
import { Error } from "../../utils/control";
import JWT from "jsonwebtoken";

const handleAuthErr = (next: NextFunction) => {
  const err: Error = { message: "Access denied, Faild to authenticate !", status: 401 };
  next(err);
};
const handleAuthentication = (req: Request, _res: Response, next: NextFunction) => {
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
  } catch (err) {
    // handle error
    handleAuthErr(next);
  }
};

export default handleAuthentication;
