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

const unknownEndpoint = (
  _request: express.Request,
  response: express.Response
) => {
  response.status(404).send({ error: "Unknown endpoint" });
};

const errorHandler = (
  error: Error,
  _request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  if (error.name === "DataIntegrityError") {
    response.status(500).send({ error: error.message });
  }
  next(error);
};

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
