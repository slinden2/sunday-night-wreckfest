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
const jobs_1 = require("../jobs");
const router = express_1.default.Router();
const redis = new ioredis_1.default(config_1.default.REDIS_URL);
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const raceCalendar = yield services_1.calendarService.getRaceCalendar();
        yield redis.setex(req.baseUrl, 600, JSON.stringify(raceCalendar));
        return res.status(200).json(raceCalendar);
    }
    catch (err) {
        return next(err);
    }
}));
router.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const raceData = yield services_1.eventService.getSingleRace(req.params.id);
        res.status(200).json(raceData);
    }
    catch (err) {
        return next(err);
    }
}));
router.get("/update/:hash", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.hash !== config_1.default.STANDINGS_UPDATE_HASH) {
            throw new Error("Invalid standings update hash");
        }
        yield services_1.eventService.checkDraws();
        res.status(200).json({
            message: "eventDetails successfully updated.",
        });
    }
    catch (err) {
        next(err);
    }
}));
router.get("/update-cache/:hash", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.hash !== config_1.default.STANDINGS_UPDATE_HASH) {
            throw new Error("Invalid standings update hash");
        }
        res.status(200).json({
            message: "Cache update started. This will take a while... (15-20min)",
        });
        yield jobs_1.updateCache();
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
//# sourceMappingURL=raceRoute.js.map