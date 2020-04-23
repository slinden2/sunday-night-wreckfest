import express from "express";
import "source-map-support/register";

import config from "./config";

import { calendarRoute } from "./routes/";

const app = express();
app.use(express.json());

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/calendar", calendarRoute);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
