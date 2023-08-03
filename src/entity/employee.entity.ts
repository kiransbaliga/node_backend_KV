import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Address } from "./address.entity";

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
    
    @DeleteDateColumn()
    deletedat:Date;

    @OneToMany(()=>Address,(address)=>address.employee)
    address:Address
}

