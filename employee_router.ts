import express from "express";
import { Employee } from "./Employees";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import AppDataSource from "./data-source";

const employeeRouter = express.Router();
const employeeRepository = AppDataSource.getRepository(Employee);

let count: number = 2;
const employees: Employee[] = [
  {
    id: 1,
    name: "Kiran",
    email: "ksbaliga@gmail.com",
    createdat: new Date(),
    updatedat: new Date(),
  },
  {
    id: 2,
    name: "Sruthy",
    email: "sml@gmail.com",
    createdat: new Date(),
    updatedat: new Date(),
  },
];

employeeRouter.get("/", async (req, res) => {
  const allemployees = await employeeRepository.find();
  console.log(req.url);
  res.status(200).send(allemployees);
});

employeeRouter.get("/:id", async (req, res) => {
  const employee = await employeeRepository.findOneBy({
    id: Number(req.params.id),
  });
  console.log(req.url);
  res.status(200).send(employee);
});

employeeRouter.post("/", async (req, res) => {
  console.log(req.url);
  const newEmployee = new Employee();
  newEmployee.id = ++count;
  newEmployee.email = req.body.email;
  newEmployee.name = req.body.name;
  newEmployee.updatedat = new Date();
  newEmployee.createdat = new Date();
  const savedEmployee = await employeeRepository.save(newEmployee);
  res.status(201).send(savedEmployee);
});

employeeRouter.put("/:id", async (req, res) => {
  const employee = await employeeRepository.findOneBy({
    id: Number(req.params.id),
  });
  employee.name = req.body.name;
  employee.email = req.body.email;
 
  const updatedEmployee = await employeeRepository.save(employee);
  console.log("Updated");
  res.status(200).send(updatedEmployee);
});

employeeRouter.delete("/:id", async (req, res) => {
  const employee = await employeeRepository.findOneBy({
    id: Number(req.params.id),
  });
  console.log(employee);
  if (!employee) {
    res.status(404).send("no such employee");
  } else {
    const deletedEmployee = await employeeRepository.remove(employee);
    console.log("deleted");
    res.status(200).send(deletedEmployee);
  }
});

export default employeeRouter;
