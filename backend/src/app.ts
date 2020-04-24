import express from "express";
import cors from "cors";
import "source-map-support/register";

import { calendarRoute } from "./routes/";

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

app.use("/api/calendar", calendarRoute);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
