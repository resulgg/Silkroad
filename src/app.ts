import express from "express";
import routes from "./routes/index";
import helmet from "helmet";
import cors from "cors";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api/v1", routes);

export default app;
