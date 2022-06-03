import { Response, Request, NextFunction } from "express";
import { User } from "./../api/models/users";
import { Error, Users } from "../types/types";
import jwt from "jsonwebtoken";

const handleAuthErr = (message: string, status: number, next: NextFunction) => {
  const err: Error = { message, status };
  next(err);
};

const userAuth = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authheader = req.headers.authorization;
    if (authheader) {
      const token = authheader.split(" ")[1];
      const bearer = authheader.split(" ")[0];
      if (token && bearer === "Bearer") {
        const decode = jwt.verify(token, process.env.SECRET_TOKEN as string);
        const user = await User.show({ _id: (decode as Users)._id });
        req.user = user as Users;
        if (decode) {
          next();
        } else {
          handleAuthErr("Authentication failed", 401, next);
        }
      } else {
        // token not of type Bearer
        handleAuthErr("Authentication failed, invalid token type", 401, next);
      }
    } else {
      // token not sent in header
      handleAuthErr("Authentication failed, token not found", 401, next);
    }
  } catch (err) {
    // handle jwt errors
    handleAuthErr(`Authentication failed, ${(err as Error).message}`, 401, next);
  }
};

const adminAuth = (req: Request, _res: Response, next: NextFunction) => {
  const user = req.user as Users;
  if (user.isadmin) {
    next();
  } else {
    handleAuthErr(`Access denied, not authorized`, 403, next);
  }
};

export { userAuth, adminAuth };
