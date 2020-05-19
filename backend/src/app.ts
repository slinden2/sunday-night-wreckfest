import express from "express";
import cors from "cors";
import path from "path";
import "source-map-support/register";

import { raceRoute, standingsRoute } from "./routes/";

import middleware from "./utils/middleware";
import config from "./config";

const app = express();
app.use(express.json());
app.use(cors());
app.use(middleware.requestLogger);

if (config.ENV === "test" || config.ENV === "CI") {
  app.get("/ping", (_req, res) => {
    res.send("pong");
  });
}

app.use("/api/races", raceRoute);
app.use("/api/standings", standingsRoute);

if (config.ENV === "production") {
  app.use(express.static(path.join(__dirname, "client")));
  app.get("*", (_req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "index.html"));
  });
}

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

export default app;
