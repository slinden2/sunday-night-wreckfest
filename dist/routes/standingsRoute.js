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
        const standings = yield services_1.standingsService.getStandings();
        yield redis.setex(req.baseUrl, 600, JSON.stringify(standings));
        res.status(200).json(standings);
    }
    catch (err) {
        next(err);
    }
}));
router.get("/update/:hash", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.hash !== config_1.default.STANDINGS_UPDATE_HASH) {
            throw new Error("Invalid standings update hash");
        }
        yield services_1.standingsService.updateStandings();
        res.status(200).json({
            message: "Standings successfully updated.",
        });
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
//# sourceMappingURL=standingsRoute.js.map