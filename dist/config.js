"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ENV = process.env.NODE_ENV;
const PORT = Number(process.env.PORT);
const GS_ID = process.env.GS_ID;
const GS_SERVICE_ACCOUNT_EMAIL = process.env.GS_SERVICE_ACCOUNT_EMAIL;
const GS_PRIVATE_KEY = (_a = process.env.GS_PRIVATE_KEY) === null || _a === void 0 ? void 0 : _a.split("\\n").join("\n");
exports.default = {
    ENV,
    PORT,
    GS_ID,
    GS_SERVICE_ACCOUNT_EMAIL,
    GS_PRIVATE_KEY,
};
//# sourceMappingURL=config.js.map