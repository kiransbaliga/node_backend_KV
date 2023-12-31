import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

console.log(process.env.POSTGRES_PORT);

import express, { NextFunction, Request, Response } from "express";
import dataSource from "./db/postgres.db";
import loggerMiddleware from "./middleware/logger.middleware";
import "reflect-metadata";
import employeeRoute from "./routes/employee.route";
import HttpException from "./exception/http.exception";
import errorMiddleware from "./middleware/error.middleware";
import departmentRoute from "./routes/department.route";
import logger from "./middleware/winston.middleware";
import roleRoute from "./routes/role.route";
import cors from "cors";

const server = express();

server.use(express.json());
server.use(loggerMiddleware);
server.use(cors());
server.use("/employees", employeeRoute);
server.use("/department", departmentRoute);
server.use("/roles", roleRoute);
server.get("/", (req, res) => {
  console.log(req.url);
  res.status(200).send("Hello World Express");
  logger.log("Info", "server is up");
});

server.use(errorMiddleware);

(async () => {
  await dataSource.initialize();
  server.listen(3001, () => {
    console.log("server up at http://localhost:3001/");
  });
})();
