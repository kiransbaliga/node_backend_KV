import express from "express";
import HttpException from "../exception/http.exception";
import ValidationException from "../exception/validation.exception";
import { ValidationError } from "class-validator";
import logger from "./winston.middleware";
import ApiResponse from "../utils/response";

const errorMiddleware = (
  error: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    if (error instanceof HttpException) {
      res.status(error.status).send(
        new ApiResponse([], error.message, error, {
          total: 1,
          took: new Date().getTime() - req.body.time,
          length: 1,
        })
      );
      logger.log("error", error.message);
    }
    if (error instanceof ValidationException) {
      res.status(error.status).send(
        new ApiResponse([], error.message, error, {
          total: 1,
          took: new Date().getTime() - req.body.time,
          length: 1,
        })
      );
      logger.log("error", error.message, error.errors);
    }
    console.log(error);
    res.status(500).send(
      new ApiResponse([], error.message, error, {
        total: 1,
        took: new Date().getTime() - req.body.time,
        length: 1,
      })
    );
    logger.log("error", error.message);
  } catch (err) {
    next(err);
  }
};

export default errorMiddleware;
