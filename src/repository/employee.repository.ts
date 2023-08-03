import { DataSource, Repository } from "typeorm";
import { Employee } from "../entity/employee.entity";
import dataSource from "../db/postgres.db";

class EmployeeRepository {
  constructor(private employeeRepository: Repository<Employee>) {}

  find(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  findOneBy(id: number): Promise<Employee> {
    return this.employeeRepository.findOneBy({
      id: id,
    });
  }

  createNewEmployee(name: string, email: string): Promise<Employee> {
    const newEmployee = new Employee();
    newEmployee.email = email;
    newEmployee.name = name;
    return this.employeeRepository.save(newEmployee);
  }

  async updateEmployee(
    id: number,
    name: string,
    email: string
  ): Promise<Employee> {
    const employee = await this.findOneBy(id);
    employee.email = email;
    employee.name = name;
    return this.employeeRepository.save(employee);
  }

  async deleteEmployee(id: number): Promise<Employee> {
    const employee = await this.findOneBy(id);
    console.log(employee);
    return this.employeeRepository.softRemove(employee);
  }

}

export default EmployeeRepository;
