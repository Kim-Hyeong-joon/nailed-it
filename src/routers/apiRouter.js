import express from "express";
import { postDetails } from "../controllers/todoController";

const apiRouter = express.Router();

apiRouter.post("/:id/details", postDetails);

export default apiRouter;
