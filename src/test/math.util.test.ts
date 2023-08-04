import { when } from "jest-when";
import MathUtil from "../utils/math.util";

describe("Test average function 1", () => {
  test("Test Average", () => {
    MathUtil.sum = jest.fn().mockReturnValue(8);
    expect(MathUtil.average(4, 4)).toBe(4);
    // expect(MathUtil.average(1, 1)).toBe(1);
    // expect(MathUtil.average(7, 11)).toBe(9);
  });
});

describe("Test average function 2", () => {
  test("Test Average", () => {
    const mockedFunction= jest.fn()
    MathUtil.sum= mockedFunction;
    when(mockedFunction).calledWith(4,4).mockReturnValueOnce(8)
    expect(MathUtil.average(4, 4)).toBe(4);
  });
});


// jest-when can be used to modify the mmock function to only mimick the value when the called value is specified with 'when' 
