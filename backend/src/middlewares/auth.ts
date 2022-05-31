import { Response, Request, NextFunction } from "express";
import { User } from "./../api/models/users";
import { Error, Users } from "../types/types";
import jwt from "jsonwebtoken";

const handleAuthErr = (next: NextFunction, msg: string) => {
  const err: Error = { message: msg, status: 401 };
  next(err);
};

const handleAuthentication = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authheader = req.headers.authorization;
    if (authheader) {
      const token = authheader.split(" ")[1];
      const bearer = authheader.split(" ")[0];
      if (token && bearer === "Bearer") {
        const decode = jwt.verify(token, process.env.SECRET_TOKEN as string);
        // get a user based on the user_id from decoded token
        const user = await User.show({ _id: (decode as Users)._id });
        // create a user proprety inside the request header with the user auth info
        req.user = user as Users;
        if (decode) {
          next();
        } else {
          handleAuthErr(next, "Authentication failed");
        }
      } else {
        // token not of type Bearer
        handleAuthErr(next, "Authentication failed, Invalid token type");
      }
    } else {
      // token not sent in header
      handleAuthErr(next, "Authentication failed, No token provided");
    }
  } catch (err) {
    // handle jwt errors
    handleAuthErr(next, `Authentication failed, ${(err as Error).message}`);
  }
};

export default handleAuthentication;
