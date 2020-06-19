"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const logger_1 = __importDefault(require("./logger"));
const config_1 = __importDefault(require("../config"));
const redis = new ioredis_1.default(config_1.default.REDIS_URL);
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
    if (error.message === "Invalid standings update hash") {
        response.status(400).send({ error: error.message });
    }
    next(error);
};
const cache = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (config_1.default.CACHED_ROUTES.includes(request.path)) {
        const data = yield redis.get(request.path);
        if (data !== null) {
            response.status(200).json(JSON.parse(data));
        }
        else {
            next();
        }
    }
    else {
        next();
    }
});
exports.default = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    cache,
};
//# sourceMappingURL=middleware.js.map