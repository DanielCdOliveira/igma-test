import { Prisma } from "@prisma/client";
import { prisma } from "../database.js";
import { CreateUserData } from "../interfaces/prismaInterfaces.js";

class UsersRepositories {
  public async createUser(newUser: CreateUserData) {
    await prisma.users.create({ data: newUser });
  }

  public async getUserByCpf(cpf: string) {
    return await prisma.users.findFirst({ where: { cpf: cpf } });
  }
}
export default UsersRepositories;
