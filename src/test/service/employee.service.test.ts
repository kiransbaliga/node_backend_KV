import { Any, DataSource } from "typeorm";
import EmployeeRepository from "../../repository/employee.repository";
import EmployeeService from "../../service/employee.service";
import { Employee } from "../../entity/employee.entity";
import { when } from "jest-when";
import HttpException from "../../exception/http.exception";
import { Role } from "../../utils/role.enum";

import { Address } from "../../entity/address.entity";

describe("Employee Service Tests", () => {
  let employeeService: EmployeeService;
  let employeeRepository: EmployeeRepository;
  beforeAll(() => {
    const dataSource: DataSource = {
      getRepository: jest.fn(),
    } as unknown as DataSource;
    employeeRepository = new EmployeeRepository(
      dataSource.getRepository(Employee)
    );
    employeeService = new EmployeeService(employeeRepository);
  });
  // Get Element by id
  describe("Test for Get Employeebyid", () => {
    test("test for employee with id 1 | failure case ", async () => {
      const exception = new HttpException(404, `Employee notfound with id:`);
      const mockedFunction = jest.fn();
      when(mockedFunction).calledWith({ id: 1 }).mockResolvedValueOnce(null);
      employeeRepository.findOneBy = mockedFunction;
      expect(async () => {
        await employeeService.getEmployeeById({ id: 1 });
      }).rejects.toThrowError();
    });
  });

  test("test for employee with id 1", async () => {
    const exception = new HttpException(404, `Employee notfound with id:`);
    const mockedFunction = jest.fn();
    when(mockedFunction)
      .calledWith({ id: 1 })
      .mockResolvedValueOnce({ id: 123 });
    employeeRepository.findOneBy = mockedFunction;
    const emp = await employeeService.getEmployeeById({ id: 1 });
    expect(emp).toStrictEqual({ id: 123 });
  });

  // Get all employees
  test("test for employee All", async () => {
    const exception = new HttpException(404, `Employees found`);
    const mockedFunction = jest.fn();
    when(mockedFunction).mockResolvedValue({
      id: 20,
      createdat: "2023-08-05T09:54:01.703Z",
      updatedat: "2023-08-05T09:54:01.703Z",
      deletedat: null,
      name: "Kiran",
      email: "kiran@gmail.com",
      password: "$2b$10$Mj0Mj7XCvfLsVjVi4Gn4v.Ase1wndh0Md95WhbSql2bRgO/DbHHD6",
      role: "DEVELOPER",
      address: {
        id: 18,
        createdat: "2023-08-05T09:54:01.703Z",
        updatedat: "2023-08-05T09:54:01.703Z",
        deletedat: null,
        line1: "line1",
        line2: "line2",
        pincode: "123455",
      },
    });
    employeeRepository.find = mockedFunction;
    const emp = await employeeService.getAllEmployees(0, 10);
    expect(emp).toStrictEqual({
      id: 20,
      createdat: "2023-08-05T09:54:01.703Z",
      updatedat: "2023-08-05T09:54:01.703Z",
      deletedat: null,
      name: "Kiran",
      email: "kiran@gmail.com",
      password: "$2b$10$Mj0Mj7XCvfLsVjVi4Gn4v.Ase1wndh0Md95WhbSql2bRgO/DbHHD6",
      role: "DEVELOPER",
      address: {
        id: 18,
        createdat: "2023-08-05T09:54:01.703Z",
        updatedat: "2023-08-05T09:54:01.703Z",
        deletedat: null,
        line1: "line1",
        line2: "line2",
        pincode: "123455",
      },
    });
  });

  test("Create Employee", async () => {
    const address: Address = new Address();
    const employee: Employee = new Employee();
    employee.name = "kiran";
    (employee.id = null),
      (employee.createdat = null),
      (employee.deletedat = null),
      (employee.updatedat = null);
    employee.email = "k@k.com";
    employee.password = "hello@123";
    address.line1 = "1234";
    address.line2 = "4567";
    address.pincode = "8901";
    // address.createdat =null;
    // address.deletedat = null;
    // address.updatedat=null
    employee.address = address;
    employee.department = <any>1;
    employee.role = Role.ADMIN;

    const mockedFunction = jest.fn();
    when(mockedFunction).mockResolvedValue(employee);
    employeeRepository.createNewEmployee = mockedFunction;
    const emp = await employeeService.createNewEmployee(
      "kiran",
      "k@k.com",
      "hello@123",
      address,
      Role.ADMIN,
      1,
      "",
      3,
      true
    );
    expect(emp).toStrictEqual(employee);
  });

  test("Delete employee", async () => {
    const address: Address = new Address();
    const employee: Employee = new Employee();
    employee.name = "kiran";
    (employee.id = null),
      (employee.createdat = null),
      (employee.deletedat = null),
      (employee.updatedat = null);
    employee.email = "k@k.com";
    employee.password = "hello@123";
    address.line1 = "1234";
    address.line2 = "4567";
    address.pincode = "8901";
    // address.createdat =null;
    // address.deletedat = null;
    // address.updatedat=null
    employee.address = address;
    employee.department = <any>1;
    employee.role = Role.ADMIN;
    const mockedFunction = jest.fn();
    when(mockedFunction).calledWith({ id: 1 }).mockResolvedValue(employee);
    employeeRepository.findOneBy = mockedFunction;
    const mock = jest.fn();
    when(mock).calledWith(employee).mockResolvedValueOnce(employee);
    employeeRepository.deleteEmployee = mock;
    const emp = await employeeService.deleteEmployee(1);
    console.log(emp);
    expect(emp).toStrictEqual(employee);
  });

  test("Delete employee| Failure", async () => {
    const address: Address = new Address();
    const employee: Employee = new Employee();
    employee.name = "kiran";
    (employee.id = null),
      (employee.createdat = null),
      (employee.deletedat = null),
      (employee.updatedat = null);
    employee.email = "k@k.com";
    employee.password = "hello@123";
    address.line1 = "1234";
    address.line2 = "4567";
    address.pincode = "8901";
    // address.createdat =null;
    // address.deletedat = null;
    // address.updatedat=null
    employee.address = address;
    employee.department = <any>1;
    employee.role = Role.ADMIN;
    const mockedFunction = jest.fn();
    when(mockedFunction).calledWith({ id: 1 }).mockResolvedValue(null);
    employeeRepository.findOneBy = mockedFunction;
    const mock = jest.fn();
    when(mock).calledWith(employee).mockResolvedValueOnce(employee);
    employeeRepository.deleteEmployee = mock;
    // const emp = await employeeService.deleteEmployee(1);
    // console.log(emp);
    expect(async () => {
      await employeeService.deleteEmployee(1);
    }).rejects.toThrowError();
  });

  test("Update Employee", async () => {
    const address: Address = new Address();
    const employee: Employee = new Employee();
    employee.name = "kiran";
    (employee.id = null),
      (employee.createdat = null),
      (employee.deletedat = null),
      (employee.updatedat = null);
    employee.email = "k@k.com";
    employee.password = "hello@123";
    address.line1 = "1234";
    address.line2 = "4567";
    address.pincode = "8901";
    // address.createdat =null;
    // address.deletedat = null;
    // address.updatedat=null
    employee.address = address;
    employee.department = <any>1;
    employee.role = Role.ADMIN;
    const mockedFun = jest.fn();
    when(mockedFun).calledWith({ id: 1 }).mockResolvedValue(employee);
    employeeRepository.findOneBy = mockedFun;
    const mockedFunction = jest.fn();
    when(mockedFunction).mockResolvedValue(employee);
    employeeRepository.updateEmployee = mockedFunction;
    const emp = await employeeService.updateEmployee(
      1,
      "kiran",
      "k@k.com",
      "hello@123",
      Role.ADMIN,
      address,
      1,
      "",
      3,
      true
    );
    expect(emp).toStrictEqual(employee);
  });

  test("Update Employee | Failure", async () => {
    const address: Address = new Address();
    const employee: Employee = new Employee();
    employee.name = "kiran";
    (employee.id = null),
      (employee.createdat = null),
      (employee.deletedat = null),
      (employee.updatedat = null);
    employee.email = "k@k.com";
    employee.password = "hello@123";
    address.line1 = "1234";
    address.line2 = "4567";
    address.pincode = "8901";
    // address.createdat =null;
    // address.deletedat = null;
    // address.updatedat=null
    employee.address = address;
    employee.department = <any>1;
    employee.role = Role.ADMIN;

    const mockedFun = jest.fn();
    when(mockedFun).calledWith({ id: 1 }).mockResolvedValue(null);
    employeeRepository.findOneBy = mockedFun;
    const mockedFunction = jest.fn();
    when(mockedFunction).mockResolvedValue(employee);
    employeeRepository.updateEmployee = mockedFunction;
    // const emp = await employeeService.updateEmployee(
    //   1,
    //   "kiran",
    //   "k@k.com",
    //   "hello@123",
    //   Role.ADMIN,
    //   address,
    //   1,
    //   "",
    //   3,
    //   true
    // );
    expect(async () => {
      await employeeService.updateEmployee(
        1,
        "kiran",
        "k@k.com",
        "hello@123",
        Role.ADMIN,
        address,
        1,
        "",
        3,
        true
      );
    }).rejects.toThrowError();
  });

  test("Login Employee", async () => {
    const address: Address = new Address();
    const employee: Employee = new Employee();
    employee.name = "kiran";
    (employee.id = null),
      (employee.createdat = null),
      (employee.deletedat = null),
      (employee.updatedat = null);
    employee.email = "k@k.com";
    employee.password =
      "$2b$10$Gze4XgXxcRhqEPqwAMF6xeyPOB4PIe5KFf.VVoRtvb0BLB3w2AVZ.";
    address.line1 = "1234";
    address.line2 = "4567";
    address.pincode = "8901";
    // address.createdat =null;
    // address.deletedat = null;
    // address.updatedat=null
    employee.address = address;
    employee.department = <any>1;
    employee.role = Role.ADMIN;
    const mockedFunction = jest.fn();
    when(mockedFunction)
      .calledWith({ email: employee.email })
      .mockResolvedValue(employee);
    employeeRepository.findOneBy = mockedFunction;
    const token = await employeeService.loginEmployee("k@k.com", "hello@123");
    expect(token);
  });
});
