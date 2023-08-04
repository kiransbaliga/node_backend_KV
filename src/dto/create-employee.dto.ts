import { IsNotEmpty, IsString, ValidateNested, isNotEmpty } from "class-validator";
import { Address } from "../entity/address.entity";
import { Type } from "class-transformer";
import { CreateNewAddressDto } from "./create-address.dto";

class CreateNewEmployeeDto{
    
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
}

export default CreateNewEmployeeDto