import express from "express";
import employeeRouter from "./employee_router";
import loggerMiddleware from "./loggerMiddleware";
import "reflect-metadata";
import { DataSource } from "typeorm";
import AppDataSource from "./data-source";

const server = express();

server.use(express.json());
server.use(loggerMiddleware);
server.use("/employees", employeeRouter);

server.get("/", (req, res) => {
  console.log(req.url);
  res.status(200).send("Hello World Express");
});

(async () => {
  await AppDataSource.initialize();
  server.listen(3001, () => {
    console.log("server up at http://localhost:3000/");
  });
})();


