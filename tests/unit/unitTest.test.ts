import { jest } from "@jest/globals";
import { prisma } from "../../src/database.js";
import mockCreateUser from "../../src/repositories/usersRepositories.js";
import UsersServices from "../../src/services/userServices.js";
import CpfServices from "../../src/services/cpfServices.js";
import { userCpfValid } from "../factories/userFactory.js";
jest.mock("../../src/repositories/usersRepositories.js");

const userService = new UsersServices();
const cpfService = new CpfServices();

describe("create user", () => {
  beforeEach(async () => {
    await prisma.users.deleteMany();
  });
  it("should create user", async () => {
    await userService.createUser(userCpfValid);
    expect(mockCreateUser).toHaveBeenCalled();
  });
  it("should not create user when cpf is already registered", async () => {
    jest.spyOn(userService, "getUserByCpf").mockImplementation((): any => {
      return userCpfValid;
    });
    const result = userService.createUser(userCpfValid);
    expect(result).rejects.toEqual({
      type: "conflict",
      message: "cpf already registered",
    });
  });
});
describe("get array with all user with pagination", () => {
  beforeEach(async () => {
    await prisma.users.deleteMany();
  });
  it("should return array with first 10 users", async () => {
    const result = await userService.getAllUsers("0");
  });
});
describe("valid cpf", () => {
  it("should valid cpf and return cpf formated", async () => {
    const result = await cpfService.cpfValid("11144477735");
    expect(result).toEqual("111.444.777-35");
  });
  it("should valid cpf with and return it", async () => {
    const result = await cpfService.cpfValid("111.444.777-35");
    expect(result).toEqual("111.444.777-35");
  });
  it("should invalid cpf because first digit is invalid", async () => {
    const result = cpfService.cpfValid("528.173.492-52");
    expect(result).rejects.toEqual({
      type: "unprocessable",
      message: "invalid cpf",
    });
  });
  it("should invalid cpf because second digit is invalid", async () => {
    const result = cpfService.cpfValid("041.848.057-59");
    expect(result).rejects.toEqual({
      type: "unprocessable",
      message: "invalid cpf",
    });
  });
  it("should invalid cpf because format is invalid", async () => {
    const result = cpfService.cpfValid("041.84805759");
    expect(result).rejects.toEqual({
      type: "unprocessable",
      message: "invalid cpf",
    });
  });
});
