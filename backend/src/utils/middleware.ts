import express from "express";
import Redis from "ioredis";

import logger from "./logger";
import config from "../config";

const redis = new Redis(config.REDIS_PORT, config.REDIS_HOST);

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

const cache = async (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  if (config.CACHED_ROUTES.includes(request.path)) {
    const data = await redis.get(request.path);
    if (data !== null) {
      response.status(200).json(JSON.parse(data));
    } else {
      next();
    }
  } else {
    next();
  }
};

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  cache,
};
