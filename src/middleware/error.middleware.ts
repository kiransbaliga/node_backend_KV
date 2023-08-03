import express from "express";
import HttpException from "../exception/http.exception";
import ValidationException from "../exception/validation.exception";
import { ValidationError } from "class-validator";

function findConstraints(error) {
    const err = {};
    
    for (let i of error) {
        // console.log(i)
      if (i.property === "address" && i.children.length>0) {
        // console.log(i.children)
        err[i.property] = findConstraints(i.children);
      } else {
          const constraints = [];
          for (let j in i.constraints) {
            // console.log(j)
          constraints.push(i.constraints[j]);
        }
        if (constraints.length>0)
        err[i.property] = constraints;
      }
    }
    return err;
  }

const errorMiddleware = (
  error: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    console.error(error.stack);
    if (error instanceof HttpException) {
      res.status(error.status).send({ error: error.message });
    }
    if (error instanceof ValidationException) {
        const finError = findConstraints(error.errors);
    //   const finError = {};

      
      res.status(error.status).send({
        message: error.message,
        error: {finErrors: finError },
      });
    }
    console.log(error);
    res.status(500).send({ error: error.message });
  } catch (err) {
    next(err);
  }
};

export default errorMiddleware;
