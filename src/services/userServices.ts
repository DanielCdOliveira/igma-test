import { Users } from "@prisma/client";
import { CreateUserData } from "../interfaces/prismaInterfaces.js";
import UsersRepositories from "../repositories/usersRepositories.js";

class UsersServices {
  constructor(private userRepository = new UsersRepositories()) {}

  public async createUser(newUser: CreateUserData) {
    const user = await this.getUserByCpf(newUser.cpf);
    if (user) {
      throw {
        type: "conflict",
        message: "cpf already registered",
      };
    }
    this.userRepository.createUser(newUser);
  }

  public async getUserByCpf(cpf: string): Promise<Users> {
    return await this.userRepository.getUserByCpf(cpf);
  }
  public async getAllUsers(page: string): Promise<Users[]> {
    const pageInt = parseInt(page);
    if (Number.isNaN(pageInt)) {
      throw {
        type: "unprocessable",
        message: "query parameter page is invalid",
      };
    }

    return await this.userRepository.getAllUsers(pageInt);
  }
}
export default UsersServices;
