import express from "express";
import routes from "./routes/index";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "morgan";

const app = express();

app.use(cors());
app.use(helmet());
app.use(logger("dev"));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1", routes);

export default app;
