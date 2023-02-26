import { jest } from "@jest/globals";
import { prisma } from "../../src/database.js";
import mockCreateUser from "../../src/repositories/usersRepositories.js";
import UsersServices from "../../src/services/userServices.js";
import CpfServices from "../../src/services/cpfServices.js";
import { userCpfValid, usersArray } from "../factories/userFactory.js";
import UsersRepositories from "../../src/repositories/usersRepositories.js";
jest.mock("../../src/repositories/usersRepositories.js");

const userService = new UsersServices();
const userRepository = new UsersRepositories();

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
    console.log(result);
  });
});
