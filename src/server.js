import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import apiRouter from "./routers/apiRouter";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use(localsMiddleware);
app.use("/static", express.static("assets"));
app.use("/images", express.static("images"));
app.use("/", rootRouter);
app.use("/api", apiRouter);

export default app;
