import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config({ path: "dist/.env" });

import { Employee } from '../entity/employee.entity';
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { Address } from "../entity/address.entity";

console.log("hello:"+Number(process.env.POSTGRES_PORT));
const dataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: 8765,
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
