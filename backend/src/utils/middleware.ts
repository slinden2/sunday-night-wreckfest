import express from "express";

import logger from "./logger";

// A simple middleware to print out http requests.
const requestLogger = (
  request: express.Request,
  _response: express.Response,
  next: Function
) => {
  logger.info(`${request.method} ${request.path}`);
  next();
};

// Handles unknown endpoints in development and tests.
// In production unknown endpoint is not possible, because
// 404 is handled in frontend.
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
  if (error.message === "Invalid standings update hash") {
    response.status(400).send({ error: error.message });
  }
  next(error);
};

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
