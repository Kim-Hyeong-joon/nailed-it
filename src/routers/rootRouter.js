import express from "express";
import { home, postTodos, postDetails } from "../controllers/todoController";
import { login } from "../controllers/userController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.post("/todos", postTodos);
rootRouter.get("/login", login);

export default rootRouter;
