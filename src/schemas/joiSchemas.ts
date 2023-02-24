import joi from "joi";

import { CreateUserData } from "../interfaces/prismaInterfaces";

export const signupSchema = joi.object<CreateUserData>({
  name: joi.string().required(),
  cpf: joi.string().min(11).max(14).required(),
  birthDate: joi.date().required(),
});
