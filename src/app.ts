import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import ErrorHandler from "./middlewares/errorHandler.js";

import usersRoutes from "./routers/usersRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", usersRoutes);
app.use((error: any, req: Request, res: Response, next: NextFunction) =>
  new ErrorHandler(req, res, next).returnError(error)
);

export default app;
