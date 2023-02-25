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

  public async getUserByCpf(cpf: string) {
    return await this.userRepository.getUserByCpf(cpf);
  }
  public async getAllUsers(page: string) {
    const pageInt = parseInt(page);
    return this.userRepository.getAllUsers(pageInt);
  }
}
export default UsersServices;
