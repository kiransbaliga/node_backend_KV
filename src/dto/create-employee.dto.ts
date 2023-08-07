import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested} from "class-validator";
import { Address } from "../entity/address.entity";
import { Type } from "class-transformer";
import { CreateNewAddressDto } from "./create-address.dto";
import { Role } from "../utils/role.enum";

class EmployeeDto{
    
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsString()
    email:string;

    @IsNotEmpty()
    @ValidateNested({each:true})
    @Type(()=>CreateNewAddressDto)
    address:Address;

    @IsNotEmpty()
    @IsString()
    password:string;
    
    @IsNotEmpty()
    @IsEnum(Role)
    role:Role

    @IsNotEmpty()
    @IsNumber()
    department:number

    @IsNotEmpty()
    @IsNumber()
    experience:number

    @IsNotEmpty()
    @IsString()
    joindate:string

    @IsNotEmpty()
    @IsBoolean()
    status:boolean
}   

export default EmployeeDto