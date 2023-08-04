import { ValidationError } from "class-validator";

class ValidationException extends Error {
  public status: number;
  public errors: object;
  constructor(status: number, message: string, error: ValidationError[]) {
    super(message);
    this.status = 400;
    this.errors = this.findConstraints(error);
  }
  findConstraints = (error: ValidationError[]) => {
    const err = {};
    for (let i of error) {
      if (i.children.length > 0) {
        err[i.property] = this.findConstraints(i.children);
      } else {
        const constraints = [];
        for (let j in i.constraints) {
          constraints.push(i.constraints[j]);
        }
        if (constraints.length > 0) err[i.property] = constraints;
      }
    }
    return err;
  };
}

export default ValidationException;
