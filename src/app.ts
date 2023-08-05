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

const server = express();

server.use(express.json());
server.use(loggerMiddleware);
server.use("/employees", employeeRoute);
server.use("/department", departmentRoute);
server.get("/", (req, res) => {
  console.log(req.url);
  res.status(200).send("Hello World Express");
});

server.use(errorMiddleware);

(async () => {
  await dataSource.initialize();
  server.listen(3001, () => {
    console.log("server up at http://localhost:3001/");
  });
})();
