import express, { NextFunction } from "express";
import EmployeeService from "../service/employee.service";
import { plainToInstance } from "class-transformer";
import EmployeeDto from "../dto/create-employee.dto";
import { validate } from "class-validator";
import HttpException from "../exception/http.exception";
import ValidationException from "../exception/validation.exception";
import authenticate from "../middleware/authenticate.middleware";
import authorize from "../middleware/authorize.middleware";
import logger from "../middleware/winston.middleware";
import ApiResponse from "../utils/response";
import { Role } from "../utils/role.enum";
import DepartmentService from "../service/department.service";
class EmployeeController {
  // Create a router to be used as a middleware for handling different methods coming to the url <<url>>/employee
  public router: express.Router;

  // Constuctor to initialise the router || passing in controller -> service -> repository
  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService
  ) {
    //define each routrer
    this.router = express.Router();
    this.router.get("/", authenticate, this.getAllEmployees);
    this.router.get("/:id", authenticate, this.getEmployeeById);
    this.router.post(
      "/",
      authenticate,
      authorize([Role.ADMIN, Role.HR]),
      this.createNewEmployee
    );
    this.router.put(
      "/:id",
      authenticate,
      authorize([Role.ADMIN, Role.HR]),
      this.updateEmployee
    );
    this.router.delete(
      "/:id",
      authenticate,
      authorize([Role.ADMIN, Role.HR]),
      this.deleteEmployee
    );
    this.router.post("/login", this.loginEmployee);
  }

  /**
  Funtion getAllEmployees takes nothing as argument and returns all employee details along with addresses
 * 
 * @param req 
 * @param res 
 */
  getAllEmployees = async (req: express.Request, res: express.Response) => {
    const skip = Number(req.query.skip) || 0;
    const take = Number(req.query.take) || 10;
    const employees = await this.employeeService.getAllEmployees(skip, take);
    res.status(200).send(
      new ApiResponse(employees[0], "ok", null, {
        total: employees[1],
        took: new Date().getTime() - req.body.time,
        length: employees[0].length,
      })
    );
    logger.log("info", "Got all employees");
  };

  /**
 Function getEmployeeById  takes in id as request parameter ('/employee/:id') and returns the corresponding employee
 * 
 * @param req 
 * @param res 
 * @param next 
 */
  getEmployeeById = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const employee = await this.employeeService.getEmployeeById({
        id: Number(req.params.id),
      });
      res.status(200).send(
        new ApiResponse(employee, "ok", null, {
          total: 1,
          took: new Date().getTime() - req.body.time,
          length: 1,
        })
      );
      logger.log("info", `Got the employees by id: ${req.params.id}`);
    } catch (error) {
      next(error);
    }
  };

  /**
   * CreateNewEMployee is a post request with the details of employee and address in the request body. returns the newly created employee object
   * @param req -
   * @param res
   * @param next
   */
  createNewEmployee = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      // we are creating a DTO object to and maps request body to the object
      const createNewEmployeeDto = plainToInstance(EmployeeDto, req.body);
      // we validate the DTO object and therefore validate the req body by using the validate funtion | returns error if the body is not correct
      const errors = await validate(createNewEmployeeDto);
      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new ValidationException(400, "Validation Errors", errors);
      }

      const dept = await this.departmentService.getDepartmentById(
        createNewEmployeeDto.department
      );

      const savedEmployee = await this.employeeService.createNewEmployee(
        createNewEmployeeDto.name,
        createNewEmployeeDto.email,
        createNewEmployeeDto.password,
        createNewEmployeeDto.address,
        createNewEmployeeDto.role,
        createNewEmployeeDto.department,
        createNewEmployeeDto.joindate,
        createNewEmployeeDto.experience,
        createNewEmployeeDto.status
      );
      res.status(201).send(
        new ApiResponse(savedEmployee, "ok", null, {
          total: 1,
          took: new Date().getTime() - req.body.time,
          length: 1,
        })
      );
      logger.log("info", `Successfullt created new employee`);
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
      const createNewEmployeeDto = plainToInstance(EmployeeDto, req.body);
      const errors = await validate(createNewEmployeeDto);
      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new ValidationException(400, "Validation Errors", errors);
      }
      const dept = await this.departmentService.getDepartmentById(
        createNewEmployeeDto.department
      );

      const updatedEmployee = await this.employeeService.updateEmployee(
        Number(req.params.id),
        createNewEmployeeDto.name,
        createNewEmployeeDto.email,
        createNewEmployeeDto.password,
        createNewEmployeeDto.role,
        createNewEmployeeDto.address,
        createNewEmployeeDto.department,
        createNewEmployeeDto.joindate,
        createNewEmployeeDto.experience,
        createNewEmployeeDto.status
      );
      res.status(200).send(
        new ApiResponse(updatedEmployee, "ok", null, {
          total: 1,
          took: new Date().getTime() - req.body.time,
          length: 1,
        })
      );
      logger.log("info", `Updated the employees by id: ${req.params.id}`);
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
      res.status(200).send(
        new ApiResponse(deletedEmployee, "ok", null, {
          total: 1,
          took: new Date().getTime() - req.body.time,
          length: 1,
        })
      );
      logger.log("info", `Deleted the employees by id: ${req.params.id}`);
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
      const emp = await this.employeeService.getEmployeeById({ email: email });
      res.status(200).send(
        new ApiResponse({ token: token, employee: emp }, "ok", null, {
          total: 1,
          took: new Date().getTime() - req.body.time,
          length: 1,
        })
      );
      logger.log("info", `Employee Logged in with email: ${email}`);
    } catch (err) {
      next(err);
    }
  };
}

export default EmployeeController;
