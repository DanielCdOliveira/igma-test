import { prisma } from "../database.js";
import { CreateUserData } from "../interfaces/prismaInterfaces.js";

class UsersRepositories {
  public async createUser(newUser: CreateUserData) {
    await prisma.users.create({ data: newUser });
  }

  public async getUserByCpf(cpf: string) {
    return await prisma.users.findFirst({ where: { cpf: cpf } });
  }

  public async getAllUsers(page: number) {
    return prisma.users.findMany({
      skip: page * 10,
      take: 10,
    });
  }
}
export default UsersRepositories;
