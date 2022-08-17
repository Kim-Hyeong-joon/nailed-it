import express from "express";
import { postDetails, loadDetails } from "../controllers/todoController";

const apiRouter = express.Router();

apiRouter.post("/:id/details", postDetails);
apiRouter.get("/:id/load-details", loadDetails);

export default apiRouter;
