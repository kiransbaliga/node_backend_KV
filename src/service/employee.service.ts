import e from "express";
import { Address } from "../entity/address.entity";
import { Employee } from "../entity/employee.entity";
import HttpException from "../exception/http.exception";
import EmployeeRepository from "../repository/employee.repository";
import bcrypt from "bcrypt";

class EmployeeService {
  constructor(private employeeRepository: EmployeeRepository) {}

  getAllEmployees(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  async getEmployeeById(id: number): Promise<Employee | null> {
    const employee = await this.employeeRepository.findOneBy(id);
    if (!employee) {
      throw new HttpException(404, `Employee notfound with id : ${id}`);
    }
    return employee;
  }

  async createNewEmployee(
    name: string,
    email: string,
    password: string,
    address: any
  ): Promise<Employee> {
    const newAddress = new Address();
    newAddress.line1 = address.line1;
    newAddress.line2 = address.line2;
    newAddress.pincode = address.pincode;

    const newEmployee = new Employee();
    newEmployee.name = name;
    newEmployee.email = email;
    newEmployee.password = await bcrypt.hash(password, 10);
    newEmployee.address = newAddress;

    return this.employeeRepository.createNewEmployee(newEmployee);
  }

  async updateEmployee(
    id: number,
    name: string,
    email: string,
    password: string,
    address: any
  ): Promise<Employee> {
    const employee = await this.employeeRepository.findOneBy(id);

    if (!employee) {
      throw new HttpException(404, `Employee not found with id : ${id}`);
    }

    employee.name = name;
    employee.email = email;
    employee.address.line1 = address.line1;
    employee.address.line2 = address.line2;
    employee.password =  await bcrypt.hash(password, 10);
    employee.address.pincode = address.pincode;

    return this.employeeRepository.updateEmployee(employee);
  }

  async deleteEmployee(id: number): Promise<Employee> {
    const femployee = await this.employeeRepository.findOneBy(id);

    if (!femployee) {
      throw new HttpException(404, `Employee not found with id : ${id}`);
    }

    const employee = await this.employeeRepository.deleteEmployee(femployee);

    return employee;
  }
}

export default EmployeeService;
