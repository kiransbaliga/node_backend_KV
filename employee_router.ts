import express from "express";
import Employee from "./Employees";

const employeeRouter = express.Router();

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

employeeRouter.get("/", (req, res) => {
  console.log(req.url);
  res.status(200).send(employees);
});

employeeRouter.get("/:id", (req, res) => {
  console.log(req.url);
  res
    .status(200)
    .send(employees.find((x) => x.id.toString() === req.params.id));
});

employeeRouter.post("/", (req, res) => {
  console.log(req.url);
  const newEmployee = new Employee();
  newEmployee.id = ++count;
  newEmployee.email = req.body.email;
  newEmployee.name = req.body.name;
  newEmployee.updatedat = new Date();
  newEmployee.createdat = new Date();
  employees.push(newEmployee);
  res.status(201).send(newEmployee);
});

employeeRouter.put("/:id", (req, res) => {
  const k: Employee = employees.find((x) => x.id.toString() === req.params.id);
  k.name = req.body.name;
  k.email = req.body.email;
  k.updatedat = new Date();
  console.log("Updated");
  res.status(200).send(k);
});

employeeRouter.delete("/:id", (req, res) => {
  const k = employees.findIndex((x) => x.id.toString() === req.params.id);
  console.log(k);
  if (k == -1) {
    res.status(404).send("no such employee");
  } else {
    employees.splice(k, 1);
    console.log("deleted");
    res.status(200).send("Deleted");
  }
});

export default employeeRouter;
