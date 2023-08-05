import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne } from "typeorm";
import { Address } from "./address.entity";
import AbstractEntity from "./abstract-entity";
import { Role } from "../utils/role.enum";
import { Department } from "./department.entity";

@Entity("employees")
export class Employee extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: Role.DEVELOPER })
  role: Role;

  @OneToOne(() => Address, (address) => address.employee, { cascade: true })
  address: Address;

  @ManyToOne(() => Department, (department) => department.id)
  @JoinColumn()
  department: number;
}
