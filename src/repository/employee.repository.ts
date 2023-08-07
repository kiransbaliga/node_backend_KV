import { DataSource, Repository } from "typeorm";
import { Employee } from "../entity/employee.entity";
import dataSource from "../db/postgres.db";
import { Address } from "../entity/address.entity";

class EmployeeRepository {
  constructor(private employeeRepository: Repository<Employee>) {}

  find(): Promise<Employee[]> {
    return this.employeeRepository.find({
      
      relations: {
        address: true,
       
      },
    });
  }

  findOneBy(filter:Partial<Employee>): Promise<Employee| null> {
    return this.employeeRepository.findOne({
      where: filter,
      relations: {
        address: true,
      },
    });
  }

  createNewEmployee(newEmployee: Employee): Promise<Employee> {
    return this.employeeRepository.save(newEmployee);
  }

  updateEmployee(employee: Employee): Promise<Employee> {
    return this.employeeRepository.save(employee);
  }

  deleteEmployee(employee: Employee): Promise<Employee> {
    console.log(employee);
    return this.employeeRepository.softRemove(employee);
  }
}

export default EmployeeRepository;
