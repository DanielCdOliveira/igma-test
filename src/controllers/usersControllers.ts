import { Request, Response } from "express";
import { CreateUserData } from "../interfaces/prismaInterfaces.js";
import CpfServices from "../services/cpfServices.js";
import UsersServices from "../services/userServices.js";

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

  getUser(req: Request, res: Response) {
    res.send("Hello World!");
  }

  getAllUsers(req: Request, res: Response) {
    res.send("Hello World!");
  }
}

export default UsersController;
