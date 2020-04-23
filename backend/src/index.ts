import express from "express";
import cors from "cors";
import "source-map-support/register";

import config from "./config";
import logger from "./utils/logger";

import { calendarRoute } from "./routes/";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/calendar", calendarRoute);

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
