import express, { NextFunction } from "express";
import EmployeeService from "../service/employee.service";

class EmployeeController {
  public router: express.Router;

  constructor(private employeeService: EmployeeService) {
    this.router = express.Router();
    this.router.get("/", this.getAllEmployees);
    this.router.get("/:id", this.getEmployeeById);
    this.router.post("/", this.createNewEmployee);
    this.router.put("/:id", this.updateEmployee);
    this.router.delete("/:id", this.deleteEmployee);
  }

  getAllEmployees = async (req: express.Request, res: express.Response) => {
    const employees = await this.employeeService.getAllEmployees();
    res.status(200).send(employees);
  };

  getEmployeeById = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const employees = await this.employeeService.getEmployeeById(
        Number(req.params.id)
      );
      res.status(200).send(employees);
    } catch (error) {
      next(error);
    }
  };

  createNewEmployee = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const savedEmployee = await this.employeeService.createNewEmployee(
        req.body.name,
        req.body.email,
        req.body.address
      );
      res.status(201).send(savedEmployee);
    } catch (error) {
      next(error);
    }
  };

  updateEmployee = async (req: express.Request, res: express.Response) => {
    const updatedEmployee = await this.employeeService.updateEmployee(
      Number(req.params.id),
      req.body.name,
      req.body.email,
      req.body.address
    );
    res.status(200).send(updatedEmployee);
  };

  deleteEmployee = async (req: express.Request, res: express.Response) => {
    const deletedEmployee = await this.employeeService.deleteEmployee(
      Number(req.params.id)
    );
    res.status(200).send(deletedEmployee);
  };
}

export default EmployeeController;
