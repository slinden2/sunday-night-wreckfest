"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const requestLogger = (request, _response, next) => {
    logger_1.default.info(`${request.method} ${request.path}`);
    next();
};
const unknownEndpoint = (_request, response) => {
    response.status(404).send({ error: "Unknown endpoint" });
};
const errorHandler = (error, _request, response, next) => {
    if (error.name === "DataIntegrityError") {
        response.status(500).send({ error: error.message });
    }
    next(error);
};
exports.default = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
};
//# sourceMappingURL=middleware.js.map