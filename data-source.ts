import { DataSource } from "typeorm";
import { Employee } from "./Employees";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

const AppDataSource = new DataSource({
    type:"postgres",
    host: "localhost",
    port: 8765,
    entities:[Employee],
    database: "training",
    username: "postgres",
    password: "postgres",
    logging:true,
    namingStrategy:new SnakeNamingStrategy()
  });
  
export default AppDataSource;