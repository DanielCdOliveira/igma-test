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
}
export default UsersServices;
