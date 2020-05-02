import app from "./app";
import http from "http";
import cron from "node-cron";

import config from "./config";
import logger from "./utils/logger";
import { standingsService } from "./services";

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);

  // Check for updates every 15 minutes and update standings
  cron.schedule("*/15 * * * *", async () => {
    await standingsService.updateStandings();
  });
});
