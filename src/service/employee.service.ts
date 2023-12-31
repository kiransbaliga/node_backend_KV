import e from "express";
import { Address } from "../entity/address.entity";
import { Employee } from "../entity/employee.entity";
import HttpException from "../exception/http.exception";
import EmployeeRepository from "../repository/employee.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Role } from "../utils/role.enum";

class EmployeeService {
  constructor(private employeeRepository: EmployeeRepository) {}

  getAllEmployees(
    skip: number = 0,
    take: number = 10
  ): Promise<[Employee[], number]> {
    return this.employeeRepository.find(skip, take);
  }

  async getEmployeeById(filter: Partial<Employee>): Promise<Employee | null> {
    const employee = await this.employeeRepository.findOneBy(filter);
    if (!employee) {
      throw new HttpException(
        404,
        `Employee notfound with id/email : ${filter.id || filter.email}`
      );
    }
    return employee;
  }

  async createNewEmployee(
    name: string,
    email: string,
    password: string,
    address: any,
    role: Role,
    department: number,
    joindate: string,
    experience: number,
    status: boolean
  ): Promise<Employee> {
    const newAddress = new Address();
    newAddress.line1 = address.line1;
    newAddress.line2 = address.line2;
    newAddress.pincode = address.pincode;

    const newEmployee = new Employee();
    newEmployee.name = name;
    newEmployee.email = email;
    newEmployee.department = department;
    newEmployee.password = await bcrypt.hash(password, 10);
    newEmployee.role = role;
    newEmployee.address = newAddress;
    newEmployee.joindate = joindate;
    newEmployee.exprience = experience;
    newEmployee.status = status;

    return this.employeeRepository.createNewEmployee(newEmployee);
  }

  async updateEmployee(
    id: number,
    name: string,
    email: string,
    password: string,
    role: Role,
    address: any,
    department: number,
    joindate: string,
    experience: number,
    status: boolean
  ): Promise<Employee> {
    const employee = await this.employeeRepository.findOneBy({ id: id });

    if (!employee) {
      throw new HttpException(404, `Employee not found with id : ${id}`);
    }

    employee.name = name;
    employee.email = email;
    employee.role = role;
    employee.departmentId = department;
    employee.address.line1 = address.line1;
    employee.address.line2 = address.line2;
    employee.password = await bcrypt.hash(password, 10);
    employee.address.pincode = address.pincode;
    employee.joindate = joindate;
    employee.status = status;
    employee.exprience = experience;
    return this.employeeRepository.updateEmployee(employee);
  }

  async deleteEmployee(id: number): Promise<Employee> {
    const femployee = await this.employeeRepository.findOneBy({ id: id });

    if (!femployee) {
      throw new HttpException(404, `Employee not found with id : ${id}`);
    }

    const employee = await this.employeeRepository.deleteEmployee(femployee);

    return employee;
  }

  async loginEmployee(email: string, password: string) {
    const employee = await this.employeeRepository.findOneBy({ email: email });
    if (!employee) {
      throw new HttpException(404, "Incorrect Credentials");
    }
    const result = await bcrypt.compare(password, employee.password);
    if (!result) {
      throw new HttpException(401, "Incorrect Credentials");
    }

    const payload = {
      name: employee.name,
      id: employee.id,
      email: employee.email,
      role: employee.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    return token;
  }
}

export default EmployeeService;
