import { DataSource } from "typeorm";
import { Employee } from '../entity/employee.entity';
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { Address } from "../entity/address.entity";

const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 8765,
  entities: [Employee],
  database: "training",
  username: "postgres",
  password: "postgres",
  logging: true,
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: true,
});

export default dataSource;
