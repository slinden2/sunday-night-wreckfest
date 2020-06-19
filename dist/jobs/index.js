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
const services_1 = require("../services");
const config_1 = __importDefault(require("../config"));
const logger_1 = __importDefault(require("../utils/logger"));
const redis = new ioredis_1.default(config_1.default.REDIS_URL);
exports.updateCache = () => __awaiter(void 0, void 0, void 0, function* () {
    const raceCalendar = yield services_1.calendarService.getRaceCalendar();
    yield redis.setex("/api/races", 320, JSON.stringify(raceCalendar));
    logger_1.default.info("Calendar updated");
    const standings = yield services_1.standingsService.getStandings();
    yield redis.setex("/api/standings", 320, JSON.stringify(standings));
    logger_1.default.info("Standings updated");
    const teams = yield services_1.teamService.getTeams();
    yield redis.setex("/api/teams", 320, JSON.stringify(teams));
    logger_1.default.info("Teams updated");
});
//# sourceMappingURL=index.js.map