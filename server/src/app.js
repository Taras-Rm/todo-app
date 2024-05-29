import express from "express";
import errorHandler from "./middlewares/errorHandler.js";
import cors from "cors";
import router from "./routes/index.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", router);

app.use(errorHandler);

export default app;
