import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import exp from "constants";
import { Employee } from "../entity/employee.entity";
import { Type } from "class-transformer";

class CreateNewDepartmentDto {
  @IsNotEmpty()
  @IsString()
  name: string;

}

export default CreateNewDepartmentDto