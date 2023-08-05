import { Department } from "../entity/department.entity";
import HttpException from "../exception/http.exception";
import DepartmentRepository from "../repository/department.repository";

class DepartmentService {
  constructor(private departmentRepository: DepartmentRepository) {}

  getAllDepartments(): Promise<Department[]> {
    return this.departmentRepository.find();
  }

  async getDepartmentById(id: number): Promise<Department | null> {
    const department = await this.departmentRepository.findOneBy({ id: id });
    if (!department) {
      throw new HttpException(404, `Department Not found with id: ${id}`);
    }
    return department;
  }

  createDepartment(name: string): Promise<Department> {
    const newDepartment = new Department();
    newDepartment.name = name;
    newDepartment.employees = [];
    return this.departmentRepository.createNewDepartment(newDepartment);
  }

  async updateDepartment(id: number, name: string): Promise<Department> {
    const department = await this.departmentRepository.findOneBy({ id:id });
    department.name = name;
    return this.departmentRepository.updateDepartment(department);
  }

  async deleteDepartment(id:number):Promise<Department>{
    const department = await this.departmentRepository.findOneBy({id:id})
    if (!department){
        throw new HttpException(404,`Department not found with id: ${id}`);
    }
    return this.departmentRepository.deleteDepartment(department);
  }

}

export default DepartmentService;