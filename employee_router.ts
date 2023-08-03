import express from "express";
import { Employee } from "./Employees";
import { DataSource, FindOptionsWhere, Like } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import AppDataSource from "./data-source";

const employeeRouter = express.Router();
const employeeRepository = AppDataSource.getRepository(Employee);

/* ======================================================================= */
// employeeRouter.get("/", async (req, res) => {
//   const nameFilter = req.query.name;
//   if (nameFilter != undefined) {
//     const allemployees = await employeeRepository.find({
//       where: {
//         name: Like(nameFilter as string + "%"),
//       },
//     });
//     console.log(req.url);
//     res.status(200).send(allemployees);
//   } else {
//     const allemployees = await employeeRepository.find();
//     console.log(req.url);
//     res.status(200).send(allemployees);
//   }
// });
/* ======================================================================= */

employeeRouter.get("/", async (req, res) => {
  const nameFilter = req.query.name as string;
  const emailFilter  = req.query.email as string;
  
  const filters: FindOptionsWhere<Employee> = {};
  const qb  = employeeRepository.createQueryBuilder();
  if (nameFilter){
    qb.andWhere("name like :name",{name:`${nameFilter}%`});
  }
  if (emailFilter){
    qb.andWhere("email like :email",{email:`${emailFilter}%`});
  }
  const allemployees = await qb.getMany();
  
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
/* ======================================================================= */
// we dont want to remove fully for recovery reasons
// employeeRouter.delete("/:id", async (req, res) => {
//   const employee = await employeeRepository.findOneBy({
//     id: Number(req.params.id),
//   });
//   console.log(employee);
//   if (!employee) {
//     res.status(404).send("no such employee");
//   } else {
//     const deletedEmployee = await employeeRepository.remove(employee);
//     console.log("deleted");
//     res.status(200).send(deletedEmployee);
//   }
// });
/* ======================================================================= */

employeeRouter.delete("/:id", async (req, res) => {
  const employee = await employeeRepository.findOneBy({
    id: Number(req.params.id),
  });
  console.log(employee);
  if (!employee) {
    res.status(404).send("no such employee");
  } else {
    const deletedEmployee = await employeeRepository.softRemove(employee);
    console.log("deleted");
    res.status(204).send(deletedEmployee);
  }
});

export default employeeRouter;
