import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import apiRouter from "./routers/apiRouter";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/api", apiRouter);

export default app;
