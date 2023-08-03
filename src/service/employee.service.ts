import { Employee } from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";

class EmployeeService {
  
  constructor(private employeeRepository: EmployeeRepository) {}

  getAllEmployees(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  getEmployeeById(id: number): Promise<Employee | null> {
    return this.employeeRepository.findOneBy(id);
  }

  createNewEmployee(name:string,email:string):Promise<Employee>{
    return this.employeeRepository.createNewEmployee(name,email);
  }

  updateEmployee(id:number,name:string,email:string):Promise<Employee>{
    return this.employeeRepository.updateEmployee(id,name,email);
  }

  deleteEmployee(id:number):Promise<Employee>{
    console.log(id)
    return this.employeeRepository.deleteEmployee(id);
  }
}

export default EmployeeService
