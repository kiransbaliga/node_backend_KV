import { IsNotEmpty, IsString, isNotEmpty, isString } from "class-validator";


export class CreateNewAddressDto{
    
    
    @IsNotEmpty()
    @IsString()
    line1:string;

    @IsNotEmpty()
    @IsString()
    line2:string;

    @IsNotEmpty()
    @IsString()
    pincode:string;

}