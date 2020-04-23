import express from "express";

import logger from "./logger";

const requestLogger = (
  request: express.Request,
  _response: express.Response,
  next: Function
) => {
  logger.info(`${request.method} ${request.path}`);
  next();
};

export default {
  requestLogger,
};
