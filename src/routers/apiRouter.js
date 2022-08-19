import express from "express";
import {
  postDetails,
  loadDetails,
  postTodos,
  loadDetailTitle,
} from "../controllers/todoController";

const apiRouter = express.Router();

apiRouter.post("/todos", postTodos);
apiRouter.post("/:id/details", postDetails);
apiRouter.get("/:id/load-details", loadDetails);
apiRouter.get("/:id/details-title", loadDetailTitle);

export default apiRouter;
