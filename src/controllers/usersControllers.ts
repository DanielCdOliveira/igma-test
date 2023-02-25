import { Request, Response } from "express";
import CpfServices from "../services/cpfServices.js";
import UsersServices from "../services/userServices.js";

interface Query {
  cpf: string;
  page: string;
}

class UsersController {
  constructor(
    private usersService = new UsersServices(),
    private cpfService = new CpfServices()
  ) {}

  public async signup(req: Request, res: Response) {
    const { body } = req;
    const newCpf = await this.cpfService.cpfValidInsertDb(body.cpf);
    body.cpf = newCpf;
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
    const newCpf = await this.cpfService.cpfValidInsertDb(cpf);
    const user = await this.usersService.getUserByCpf(newCpf);
    if (!user) {
      throw {
        type: "not_found",
        message: "cpf not registered",
      };
    }
    res.status(200).send(user);
  }

  public async getAllUsers(req: Request, res: Response) {
    const { page } = req.query as unknown as Query;
    const users = await this.usersService.getAllUsers(page);
    res.status(200).send(users);
  }
}

export default UsersController;
