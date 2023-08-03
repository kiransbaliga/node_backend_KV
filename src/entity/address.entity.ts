import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./employee.entity";

@Entity()
export class Address {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  line1: string;

  @Column()
  line2: string;

  @Column()
  pincode: string;

  @ManyToOne(()=>Employee,(employee)=>employee.address)
  employee:Employee;
}
