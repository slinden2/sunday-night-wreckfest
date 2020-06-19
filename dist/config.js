"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ENV = process.env.NODE_ENV;
const PORT = Number(process.env.PORT) || 3001;
const GS_ID = process.env.GS_ID;
const GS_SERVICE_ACCOUNT_EMAIL = process.env.GS_SERVICE_ACCOUNT_EMAIL;
const GS_PRIVATE_KEY = (_a = process.env.GS_PRIVATE_KEY) === null || _a === void 0 ? void 0 : _a.split("\\n").join("\n");
const STANDINGS_UPDATE_HASH = process.env.STANDINGS_UPDATE_HASH;
const CHECK_DRAW_TEXT = "X";
const STEAM_API_KEY = process.env.STEAM_API_KEY;
const STEAM_ID = Number(process.env.STEAM_ID);
const LABBE_DOMAIN = process.env.LABBE_DOMAIN;
const WF_SERVER_PORT_ARRAY = [33544, 33541, 33542, 33543];
const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";
const CACHED_ROUTES = ["/api/races", "/api/standings", "/api/teams"];
exports.default = {
    ENV,
    PORT,
    GS_ID,
    GS_SERVICE_ACCOUNT_EMAIL,
    GS_PRIVATE_KEY,
    STANDINGS_UPDATE_HASH,
    CHECK_DRAW_TEXT,
    STEAM_API_KEY,
    STEAM_ID,
    LABBE_DOMAIN,
    WF_SERVER_PORT_ARRAY,
    REDIS_URL,
    CACHED_ROUTES,
};
//# sourceMappingURL=config.js.map