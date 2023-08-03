import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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

    @OneToOne(()=>Address,(address)=>address.employee,{cascade:true})
    address:Address;
}

