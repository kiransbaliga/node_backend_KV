import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Address from "./Address";

@Entity("employees")
export class Employee{

    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    name:string;
    
    @Column()
    email:string;
    
    @CreateDateColumn()
    createdat:Date;
    
    @UpdateDateColumn()
    updatedat:Date;

    @OneToMany(()=>Address,(address)=>address.employee)
    address:Address[]
}

