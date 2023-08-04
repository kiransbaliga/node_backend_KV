import { DataSource } from "typeorm";
import { Employee } from '../entity/employee.entity';
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { Address } from "../entity/address.entity";

const dataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  entities: ['dist/entity/*.js'],
  database: process.env.POSTGRES_DATABASE,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  logging: true,
  migrations: ['dist/db/migrations/*.js'],
  namingStrategy: new SnakeNamingStrategy(),
  // synchronize: true,
});

export default dataSource;
