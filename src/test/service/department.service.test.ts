import { Any, DataSource } from "typeorm";
import EmployeeRepository from "../../repository/employee.repository";
import EmployeeService from "../../service/employee.service";
import { Employee } from "../../entity/employee.entity";
import { when } from "jest-when";
import HttpException from "../../exception/http.exception";
import { Role } from "../../utils/role.enum";

import { Address } from "../../entity/address.entity";
import DepartmentService from "../../service/department.service";
import DepartmentRepository from "../../repository/department.repository";
import { Department } from "../../entity/department.entity";
import exp from "constants";

describe("Department Service Tests", () => {
  let departmentService: DepartmentService;
  let departmentRepository: DepartmentRepository;
  beforeAll(() => {
    const dataSource: DataSource = {
      getRepository: jest.fn(),
    } as unknown as DataSource;
    departmentRepository = new DepartmentRepository(
      dataSource.getRepository(Department)
    );
    departmentService = new DepartmentService(departmentRepository);
  });

  test("Get All Departments", async () => {
    const mockedFunction = jest.fn();
    when(mockedFunction).mockResolvedValue({ id: 1, name: "HR" });
    departmentRepository.find = mockedFunction;
    const dep = await departmentService.getAllDepartments();
    expect(dep).toStrictEqual({ id: 1, name: "HR" });
  });

  test("Get Department By id", async () => {
    const mockedFunction = jest.fn();
    when(mockedFunction)
      .calledWith({ id: 1 })
      .mockResolvedValue({ id: 1, name: "HR" });
    departmentRepository.findOneBy = mockedFunction;
    const dep = await departmentService.getDepartmentById(1);
    expect(dep).toStrictEqual({ id: 1, name: "HR" });
  });

  test("Get Department By id | Failure", async () => {
    const mockedFunction = jest.fn();
    when(mockedFunction).calledWith({ id: 1 }).mockResolvedValue(null);
    departmentRepository.findOneBy = mockedFunction;
    expect(async () => {
      await departmentService.getDepartmentById(1);
    }).rejects.toThrowError();
  });

  test("Create new Department", async () => {
    const mockedFunction = jest.fn();
    when(mockedFunction).mockResolvedValue({ id: 1, name: "HR" });
    departmentRepository.createNewDepartment = mockedFunction;
    const dep = await departmentService.createDepartment("HR");
    expect(dep).toStrictEqual({ id: 1, name: "HR" });
  });

  test("Update department", async () => {
    const mockedFun = jest.fn();
    const dept = new Department();
    dept.id = 1;
    dept.name = "HR";
    when(mockedFun).mockResolvedValue(dept);
    departmentRepository.updateDepartment = mockedFun;
    const mockedFunction = jest.fn();
    when(mockedFunction).calledWith({ id: 1 }).mockResolvedValue(dept);
    departmentRepository.findOneBy = mockedFunction;
    const dep = await departmentService.updateDepartment(1, "HR");
    expect(dep).toStrictEqual(dept);
  });

  test("Update department|Failure", async () => {
    const mockedFun = jest.fn();
    const dept = new Department();
    dept.id = 1;
    dept.name = "HR";
    when(mockedFun).mockResolvedValue(dept);
    departmentRepository.updateDepartment = mockedFun;
    const mockedFunction = jest.fn();
    when(mockedFunction).calledWith({ id: 1 }).mockResolvedValue(null);
    departmentRepository.findOneBy = mockedFunction;
    expect(async () => {
      await departmentService.updateDepartment(1, "HR");
    }).rejects.toThrowError;
  });

  test("delete department", async () => {
    const mockedFun = jest.fn();
    when(mockedFun)
      .calledWith({ id: 1 })
      .mockResolvedValue({ id: 1, name: "HR" });
    departmentRepository.findOneBy = mockedFun;
    const dep = await departmentService.deleteDepartment(1);
    expect(dep).toStrictEqual({ id: 1, name: "HR" });
  });

  test("delete department | Failure Case", async () => {
    const mockedFun = jest.fn();
    when(mockedFun).calledWith({ id: 1 }).mockResolvedValue(null);
    departmentRepository.findOneBy = mockedFun;
    expect(async () => {
      await departmentService.deleteDepartment(1);
    }).rejects.toThrowError();
  });
});
