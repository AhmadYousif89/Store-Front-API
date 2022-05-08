import { Response, Request, NextFunction } from "express";
import { Error } from "../utils/control";
import JWT from "jsonwebtoken";

const { SECRET_TOKEN } = process.env;
const handleAuthErr = (next: NextFunction) => {
  const err: Error = { message: "Access denied, Faild to authenticate !", status: 401 };
  next(err);
};

const handleAuthentication = (req: Request, _res: Response, next: NextFunction) => {
  try {
    // get authHeader
    const authheader = req.headers.authorization;
    if (authheader) {
      // get authHeader token
      const token = authheader.split(" ")[1];
      // get authHeader bearer
      const bearer = authheader.split(" ")[0];
      // check and vaildate bearer and token
      if (token && bearer === "Bearer") {
        // verify and decode based on my secret token
        const decode = JWT.verify(token, SECRET_TOKEN as string);
        if (decode) {
          next();
        } else {
          // authentication failed
          handleAuthErr(next);
        }
      } else {
        // token not of type Bearer
        handleAuthErr(next);
      }
    } else {
      // no token sent in header
      handleAuthErr(next);
    }
  } catch (err) {
    // handle jwt errors
    handleAuthErr(next);
    console.log(err);
  }
};

export default handleAuthentication;
