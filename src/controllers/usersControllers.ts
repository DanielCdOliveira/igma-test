import { Request, Response } from "express";
import { CreateUserData } from "../interfaces/prismaInterfaces.js";
import CpfServices from "../services/cpfServices.js";
import UsersServices from "../services/userServices.js";

interface Query {
  cpf: string;
}

class UsersController {
  constructor(
    private usersService = new UsersServices(),
    private cpfService = new CpfServices()
  ) {}

  public async signup(req: Request, res: Response) {
    const { body } = req;
    await this.usersService.createUser(body);
    res.sendStatus(201);
  }

  public async getUser(req: Request, res: Response) {
    const { cpf } = req.query as unknown as Query;
    if (!cpf) {
      throw {
        type: "unprocessable",
        message: "empty cpf query",
      };
    }
    const user = await this.usersService.getUserByCpf(cpf);
    if (!user) {
      throw {
        type: "not_found",
        message: "cpf not registered",
      };
    }
    res.status(200).send(user);
  }

  getAllUsers(req: Request, res: Response) {
    res.send("Hello World!");
  }
}

export default UsersController;
