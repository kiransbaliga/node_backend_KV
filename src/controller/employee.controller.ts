import express, { NextFunction } from "express";
import EmployeeService from "../service/employee.service";
import { plainToInstance } from "class-transformer";
import CreateNewEmployeeDto from "../dto/create-employee.dto";
import { validate } from "class-validator";
import HttpException from "../exception/http.exception";
import ValidationException from "../exception/validation.exception";
import authenticate from "../middleware/authenticate.middleware";
import authorize from "../middleware/authorize.middleware";

class EmployeeController {
  // Create a router to be used as a middleware for handling different methods coming to the url <<url>>/employee
  public router: express.Router;

  // Constuctor to initialise the router || passing in controller -> service -> repository
  constructor(private employeeService: EmployeeService) {
    //define each routrer
    this.router = express.Router();
    this.router.get("/", authenticate, authorize, this.getAllEmployees);
    this.router.get("/:id", authenticate, authorize, this.getEmployeeById);
    this.router.post("/", authenticate, authorize, this.createNewEmployee);
    this.router.put("/:id", authenticate, authorize, this.updateEmployee);
    this.router.delete("/:id", authenticate, authorize, this.deleteEmployee);
    this.router.post("/login", this.loginEmployee);
  }

  // Funtion getAllEmployees takes nothing as argument and returns all employee details along with addresses

  getAllEmployees = async (req: express.Request, res: express.Response) => {
    const employees = await this.employeeService.getAllEmployees();
    res.status(200).send(employees);
  };

  // Function getEmployeeById  takes in id as request parameter ('/employee/:id') and returns the corresponding employee

  getEmployeeById = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const employee = await this.employeeService.getEmployeeById(
        Number(req.params.id)
      );
      res.status(200).send(employee);
    } catch (error) {
      next(error);
    }
  };

  //CreateNewEMployee is a post request with the details of employee and address in the request body. returns the newly created employee object
  createNewEmployee = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      // we are creating a DTO object to and maps request body to the object
      const createNewEmployeeDto = plainToInstance(
        CreateNewEmployeeDto,
        req.body
      );
      // we validate the DTO object and therefore validate the req body by using the validate funtion | returns error if the body is not correct
      const errors = await validate(createNewEmployeeDto);
      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new ValidationException(400, "Validation Errors", errors);
      }
      const savedEmployee = await this.employeeService.createNewEmployee(
        createNewEmployeeDto.name,
        createNewEmployeeDto.email,
        createNewEmployeeDto.password,
        createNewEmployeeDto.address,
        createNewEmployeeDto.role,
        createNewEmployeeDto.department
      );
      res.status(201).send(savedEmployee);
    } catch (error) {
      next(error);
    }
  };
  // the updateEmployee function takes in the request body and updates the employee object with the id passed thorugh reuest params
  updateEmployee = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      // Does the same validation of body as in create
      const createNewEmployeeDto = plainToInstance(
        CreateNewEmployeeDto,
        req.body
      );
      const errors = await validate(createNewEmployeeDto);
      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new ValidationException(400, "Validation Errors", errors);
      }
      const updatedEmployee = await this.employeeService.updateEmployee(
        Number(req.params.id),
        createNewEmployeeDto.name,
        createNewEmployeeDto.email,
        createNewEmployeeDto.password,
        createNewEmployeeDto.role,
        createNewEmployeeDto.address,
        createNewEmployeeDto.department
      );
      res.status(200).send(updatedEmployee);
    } catch (err) {
      next(err);
    }
  };

  // funtion deleteEmployee deletes the employee with id in request params | returns the deleted
  deleteEmployee = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const deletedEmployee = await this.employeeService.deleteEmployee(
        Number(req.params.id)
      );
      res.status(200).send(deletedEmployee);
    } catch (err) {
      next(err);
    }
  };

  loginEmployee = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body;
    try {
      const token = await this.employeeService.loginEmployee(email, password);
      res.status(200).send({ data: { token: token } });
    } catch (err) {
      next(err);
    }
  };
}

export default EmployeeController;
