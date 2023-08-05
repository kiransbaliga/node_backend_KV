import { NextFunction, Response } from "express";
import { RequestWithUser } from "../utils/requestWithUser";
import { Role } from "../utils/role.enum";
import HttpException from "../exception/http.exception";

const authorize = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const role = req.role;
    if(role !=Role.HR){
      throw new HttpException(403,"You do not have the permission to perform this task");
    }
    next();
  } catch (err) {
    next(err)
  }
};

export default authorize;