import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
    
}

