import express from "express";
import cors from "cors";
import "source-map-support/register";

import { raceRoute } from "./routes/";

import middleware from "./utils/middleware";

const app = express();
app.use(express.json());
app.use(cors());
app.use(middleware.requestLogger);

if (process.env.NODE_ENV === "test") {
  app.get("/ping", (_req, res) => {
    res.send("pong");
  });
}

app.use("/api/races", raceRoute);

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

export default app;
