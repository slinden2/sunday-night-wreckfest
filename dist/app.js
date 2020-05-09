"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
require("source-map-support/register");
const routes_1 = require("./routes/");
const middleware_1 = __importDefault(require("./utils/middleware"));
const config_1 = __importDefault(require("./config"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
app.use(middleware_1.default.requestLogger);
if (config_1.default.ENV === "test" || config_1.default.ENV === "CI") {
    app.get("/ping", (_req, res) => {
        res.send("pong");
    });
}
if (config_1.default.ENV === "production") {
    app.use(express_1.default.static(path_1.default.join(__dirname, "client")));
    app.get("/", (_req, res) => {
        res.sendFile(path_1.default.resolve(__dirname, "client", "index.html"));
    });
}
app.use("/api/races", routes_1.raceRoute);
app.use("/api/standings", routes_1.standingsRoute);
app.use(middleware_1.default.errorHandler);
app.use(middleware_1.default.unknownEndpoint);
exports.default = app;
//# sourceMappingURL=app.js.map