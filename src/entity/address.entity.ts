import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Employee } from "./employee.entity";
import AbstractEntity from "./abstract-entity";

@Entity()
export class Address extends AbstractEntity{
 
  @Column()
  line1: string;

  @Column()
  line2: string;

  @Column()
  pincode: string;


  @OneToOne(() => Employee, (employee) => employee.address)
  @JoinColumn()
  employee: Employee;
}
