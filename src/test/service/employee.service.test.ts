import { DataSource } from "typeorm";
import EmployeeRepository from "../../repository/employee.repository";
import EmployeeService from "../../service/employee.service";
import { Employee } from "../../entity/employee.entity";
import { when } from "jest-when";
import HttpException from "../../exception/http.exception";

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

  describe("Test for Get Employeebyid", () => {
    test("test for employee with id 1 | failure case ", async () => {
      const exception = new HttpException(404, `Employee notfound with id:`);
      const mockedFunction = jest.fn();
      when(mockedFunction).calledWith({ id: 1 }).mockResolvedValueOnce(null);
      employeeRepository.findOneBy = mockedFunction;
      expect(async () => {
        await employeeService.getEmployeeById(1);
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
    const emp = await employeeService.getEmployeeById(1);
    expect(emp).toStrictEqual({ id: 123 });
  });
  
// spy is used instead of mocked for the case where we need to know how many time we have called the function that is watched. so we attach a spyOn a func
  describe("get all employee", () => {
    test("should return users successfully", async () => {
      const spy = jest.spyOn(employeeRepository, "find");
      spy.mockResolvedValue([]);
      const users = await employeeRepository.find();
      expect(spy).toBeCalledTimes(1);
      expect(users).toEqual([]);
    });
  });
});
