import express from "express";
import HttpException from "../exception/http.exception";
import ValidationException from "../exception/validation.exception";
import { ValidationError } from "class-validator";

const errorMiddleware = (
  error: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    if (error instanceof HttpException) {
      res.status(error.status).send({ error: error.message });
    }
    if (error instanceof ValidationException) {
      res.status(error.status).send({
        message: error.message,
        error: error.errors,
      });
    }
    console.log(error);
    res.status(500).send({ error: error.message });
  } catch (err) {
    next(err);
  }
};

export default errorMiddleware;
