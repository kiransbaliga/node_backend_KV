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
import ApiResponse from "../utils/response";
import { Role } from "../utils/role.enum";
class DepartmentController {
  public router: express.Router;

  constructor(private departmentService: DepartmentService) {
    this.router = express.Router();
    this.router.get("/", authenticate, this.getAllDepartments);
    this.router.get("/:id", authenticate, this.getDepartmentById);
    this.router.post("/", authenticate, authorize([Role.ADMIN,Role.HR]), this.createNewDepartment);
    this.router.put("/:id", authenticate, authorize([Role.ADMIN,Role.HR]), this.updateDepartment);
    this.router.delete("/:id", authenticate, authorize([Role.ADMIN,Role.HR]), this.deleteDepartment);
  }

  getAllDepartments = async (req: express.Request, res: express.Response) => {
    const departments = await this.departmentService.getAllDepartments();
    res.status(200).send(
      new ApiResponse(departments, "ok", null, {
        total: departments.length,
        took: new Date().getTime() - req.body.time,
        length: departments.length,
      })
    );
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
      res
        .status(200)
        .send(
          new ApiResponse(department, "ok", null, {
            total: 1,
            took: new Date().getTime() - req.body.time,
            length: 1,
          })
        );
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
      res
        .status(201)
        .send(
          new ApiResponse(newDepartment, "ok", null, {
            total: 1,
            took: new Date().getTime() - req.body.time,
            length: 1,
          })
        );
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
      res
        .status(200)
        .send(
          new ApiResponse(updatedDepartment, "ok", null, {
            total: 1,
            took: new Date().getTime() - req.body.time,
            length: 1,
          })
        );
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
      res
        .status(204)
        .send(
          new ApiResponse(deleteDepartment, "ok", null, {
            total: 1,
            took: new Date().getTime() - req.body.time,
            length: 1,
          })
        );
      logger.log("info", `deleted department with id : ${req.params.id}`);
    } catch (err) {
      next(err);
    }
  };
}

export default DepartmentController;
