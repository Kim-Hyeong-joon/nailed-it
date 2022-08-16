import express from "express";
import { home } from "../controllers/todoController";
import { login } from "../controllers/userController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/login", login);

export default rootRouter;
