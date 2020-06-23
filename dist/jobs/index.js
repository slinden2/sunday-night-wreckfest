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
const misc_1 = require("../utils/misc");
const logger_1 = __importDefault(require("../utils/logger"));
const redis = new ioredis_1.default(config_1.default.REDIS_URL);
const updateRaceCache = (calendar) => __awaiter(void 0, void 0, void 0, function* () {
    for (const event of calendar.reverse()) {
        const raceData = yield services_1.eventService.getSingleRace(event.eventId);
        yield redis.setex(`/api/races/${event.eventId}`, 86400, JSON.stringify(raceData));
        yield misc_1.sleep(10000);
        logger_1.default.info(`updateRaceCache - ${event.eventId} done.`);
    }
});
exports.updateCache = () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info("updateCache - Cache update started.");
    const raceCalendar = yield services_1.calendarService.getRaceCalendar();
    yield redis.setex("/api/races", 86400, JSON.stringify(raceCalendar));
    logger_1.default.info("updateCache - raceCalendar done.");
    const standings = yield services_1.standingsService.getStandings();
    yield redis.setex("/api/standings", 86400, JSON.stringify(standings));
    logger_1.default.info("updateCache - standings done.");
    const teams = yield services_1.teamService.getTeams();
    yield redis.setex("/api/teams", 86400, JSON.stringify(teams));
    logger_1.default.info("updateCache - teams done.");
    yield updateRaceCache(raceCalendar);
});
//# sourceMappingURL=index.js.map