import express, { NextFunction, Request, Response } from "express";
import DepartmentService from "../service/department.service";
import e from "express";
import { plainToInstance } from "class-transformer";
import CreateNewDepartmentDto from "../dto/create-department.dto";
import { error } from "console";
import { validate } from "class-validator";
import ValidationException from "../exception/validation.exception";
import authenticate from "../middleware/authenticate.middleware";
import authorize from "../middleware/authorize.middleware";
import logger from "../middleware/winston.middleware";
class DepartmentController {
  public router: express.Router;

  constructor(private departmentService: DepartmentService) {
    this.router = express.Router();
    this.router.get("/", authenticate, this.getAllDepartments);
    this.router.get("/:id", authenticate, this.getDepartmentById);
    this.router.post("/", authenticate, authorize, this.createNewDepartment);
    this.router.put("/:id", authenticate, authorize, this.updateDepartment);
    this.router.delete("/:id", authenticate, authorize, this.deleteDepartment);
  }

  getAllDepartments = async (req: express.Request, res: express.Response) => {
    const departments = await this.departmentService.getAllDepartments();
    res.status(200).send(departments);
    logger.log("info", "Got all Departments");
  };

  getDepartmentById = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const department = await this.departmentService.getDepartmentById(
        Number(req.params.id)
      );
      res.status(200).send(department);
      logger.log("info", `got department with id : ${req.params.id}`);
    } catch (err) {
      next(err);
    }
  };

  createNewDepartment = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const createNewDepartmentDto = plainToInstance(
        CreateNewDepartmentDto,
        req.body
      );
      const errors = await validate(createNewDepartmentDto);
      if (errors.length > 0) {
        throw new ValidationException(400, "Validation Errors", errors);
      }
      const newDepartment = await this.departmentService.createDepartment(
        createNewDepartmentDto.name
      );
      res.status(201).send(newDepartment);
      logger.log("info", `Created new department `);
    } catch (Err) {
      next(Err);
    }
  };
  updateDepartment = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const createNewDepartmentDto = plainToInstance(
        CreateNewDepartmentDto,
        req.body
      );
      const errors = await validate(createNewDepartmentDto);
      if (errors.length > 0) {
        throw new ValidationException(400, "Validation Errors", errors);
      }
      const updatedDepartment = await this.departmentService.updateDepartment(
        Number(req.params.id),
        createNewDepartmentDto.name
      );
      res.status(200).send(updatedDepartment);
      logger.log("info", `Updated department with id : ${req.params.id}`);
    } catch (err) {
      next(err);
    }
  };

  deleteDepartment = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const deleteDepartment = await this.departmentService.deleteDepartment(
        Number(req.params.id)
      );
      res.status(204).send(deleteDepartment);
      logger.log("info", `deleted department with id : ${req.params.id}`);
    } catch (err) {
      next(err);
    }
  };
}

export default DepartmentController;
