import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Address } from "./address.entity";
import AbstractEntity from "./abstract-entity";

@Entity("employees")
export class Employee extends AbstractEntity{

    @Column()
    name:string;
    
    @Column()
    email:string;

    @Column()
    password:string;

    @OneToOne(()=>Address,(address)=>address.employee,{cascade:true})
    address:Address;
}

