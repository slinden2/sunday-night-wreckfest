import app from "./app";
import http from "http";
import cron from "node-cron";

import config from "./config";
import logger from "./utils/logger";
import { updateCache } from "./jobs";

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);

  cron.schedule("* 3 * * *", () => {
    updateCache().catch(err => logger.error(err));
  });
});
