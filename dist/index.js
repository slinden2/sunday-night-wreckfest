"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const http_1 = __importDefault(require("http"));
const node_cron_1 = __importDefault(require("node-cron"));
const config_1 = __importDefault(require("./config"));
const logger_1 = __importDefault(require("./utils/logger"));
const jobs_1 = require("./jobs");
const server = http_1.default.createServer(app_1.default);
server.listen(config_1.default.PORT, () => {
    logger_1.default.info(`Server running on port ${config_1.default.PORT}`);
    node_cron_1.default.schedule("5 * * * *", () => {
        jobs_1.updateCache().catch(err => logger_1.default.error(err));
    });
});
//# sourceMappingURL=index.js.map