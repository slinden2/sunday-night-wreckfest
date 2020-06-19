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
const express_1 = __importDefault(require("express"));
const ioredis_1 = __importDefault(require("ioredis"));
const services_1 = require("../services");
const config_1 = __importDefault(require("../config"));
const router = express_1.default.Router();
const redis = new ioredis_1.default(config_1.default.REDIS_URL);
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teams = yield services_1.teamService.getTeams();
        yield redis.setex(req.baseUrl, 600, JSON.stringify(teams));
        res.status(200).json(teams);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
//# sourceMappingURL=teamRoute.js.map