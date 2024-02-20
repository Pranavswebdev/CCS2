import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt, { Secret, VerifyOptions } from "jsonwebtoken";
import { IUser } from "../types";
// interface AuthenticatedRequest extends Request {
//   user?: IUser;
// }

export const isLoggedIn: RequestHandler = async (req, res, next) => {
  console.log("Log Checking");

  const token =
    req?.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
  const secret: Secret = process.env.JWT_SECRET || "";
  if (!token) {
    return res.status(403).json({
      message: "Unauthorized request",
      success: false,
    });
  }

  var decoded: any = jwt.verify(token, secret);

  console.log(decoded.user, "decoded user");

  req.user = decoded.user;

  console.log({ decoded });

  next();
};
