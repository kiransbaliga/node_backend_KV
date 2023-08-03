import { DataSource, Repository } from "typeorm";
import { Employee } from "../entity/employee.entity";
import dataSource from "../db/postgres.db";
import { Address } from "../entity/address.entity";

class EmployeeRepository {
  constructor(private employeeRepository: Repository<Employee>) {}

  find(): Promise<Employee[]> {
    return this.employeeRepository.find({
      relations:{
        address:true,
      }
    });
  }

  findOneBy(id: number): Promise<Employee> {
    return this.employeeRepository.findOne({
      where: {id:id},
      relations:{
        address:true,
      }
    });
  }

  createNewEmployee(newEmployee: Employee): Promise<Employee> {
    return this.employeeRepository.save(newEmployee);
  }

  async updateEmployee(
  employee:Employee
  ): Promise<Employee> {
    
    return this.employeeRepository.save(employee);
  }

  async deleteEmployee(id: number): Promise<Employee> {
    const employee = await this.findOneBy(id);
    console.log(employee);
    return this.employeeRepository.softRemove(employee);
  }
}

export default EmployeeRepository;
