import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import HttpException from "../exception/http.exception";
import { RequestWithUser } from "../utils/requestWithUser";
import { jwtPayload } from "../utils/jwtPayload.types";

const authenticate = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = getTokenFromRequestHeader(req);
    const payload = jwt.verify(token, process.env.JWT_SECRET) as jwtPayload;
    req.name = payload.name;
    req.email = payload.email;
    req.role = payload.role;
    req.id = payload.id;
    next();
  } catch (Err) {
    next(new HttpException(401, Err.message));
  }
};
const getTokenFromRequestHeader = (req: Request) => {
  const bearertoken = req.header("Authorization");
  const token = bearertoken ? bearertoken.replace("Bearer ", "") : "";
  return token;
};

export default authenticate;
