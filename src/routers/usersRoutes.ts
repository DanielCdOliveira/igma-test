import { Router } from "express";
const usersRoutes = Router();
import UsersController from "../controllers/usersControllers.js";
import SchemaVerifier from "../middlewares/schemaVerifier.js";
import { signupSchema } from "../schemas/joiSchemas.js";

usersRoutes.post(
  "/signup",
  (req, res, next) => new SchemaVerifier(req, res, next).verify(signupSchema),
  (req, res) => new UsersController().signup(req, res)
);
usersRoutes.get("/", (req, res) => new UsersController().getUser(req, res));
usersRoutes.get("/all", (req, res) =>
  new UsersController().getAllUsers(req, res)
);
export default usersRoutes;
