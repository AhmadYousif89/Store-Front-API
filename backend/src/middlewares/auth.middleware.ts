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
          // on success move to next route
          next();
        } else {
          // authentication failed
          handleAuthErr(next);
        }
      } else {
        // if token not type of bearer
        handleAuthErr(next);
      }
    } else {
      // no token given
      handleAuthErr(next);
    }
  } catch (err) {
    // handle error
    handleAuthErr(next);
    console.log(err);
  }
};

export default handleAuthentication;
