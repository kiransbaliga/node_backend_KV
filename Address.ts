import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Employee } from "./Employees";

@Entity()
class Address{

    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    emp_id:number;
    @Column()
    line1:string;
    @Column()
    line2:string;
    @Column()
    pincode:string;
    @ManyToOne(()=>Employee,(emp)=>emp.address)
    employee:Employee
}

export default Address;