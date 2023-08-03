import { DataSource } from "typeorm";
import { Employee } from '../entity/employee.entity';
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { Address } from "../entity/address.entity";

const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 8765,
  entities: ['dist/entity/*.js'],
  database: "training",
  username: "postgres",
  password: "postgres",
  logging: true,
  migrations: ['dist/db/migrations/*.js'],
  namingStrategy: new SnakeNamingStrategy(),
  // synchronize: true,
});

export default dataSource;
