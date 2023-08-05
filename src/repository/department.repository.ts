import { Repository } from "typeorm";
import { Department } from "../entity/department.entity";

class DepartmentRepository {
  constructor(private departmentRepository: Repository<Department>) {}

  find(): Promise<Department[]> {
    return this.departmentRepository.find({});
  }

  findOneBy(filter: Partial<Department>): Promise<Department | null> {
    return this.departmentRepository.findOne({
      where: filter,
    });
  }

  createNewDepartment(newDepartment: Department): Promise<Department> {
    return this.departmentRepository.save(newDepartment);
  }

  updateDepartment(department: Department): Promise<Department> {
    return this.departmentRepository.save(department);
  }

  deleteDepartment(department: Department): Promise<Department> {
    return this.departmentRepository.softRemove(department);
  }
}

export default DepartmentRepository;
