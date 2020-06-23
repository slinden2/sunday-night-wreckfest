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
const redis = new ioredis_1.default(config_1.default.REDIS_URL);
const updateRaceCache = (calendar) => __awaiter(void 0, void 0, void 0, function* () {
    for (const event of calendar) {
        console.log(event.eventId);
        const raceData = yield services_1.eventService.getSingleRace(event.eventId);
        yield redis.setex(`/api/races/${event.eventId}`, 86400, JSON.stringify(raceData));
        yield misc_1.sleep(10000);
    }
});
exports.updateCache = () => __awaiter(void 0, void 0, void 0, function* () {
    const raceCalendar = yield services_1.calendarService.getRaceCalendar();
    yield redis.setex("/api/races", 86400, JSON.stringify(raceCalendar));
    const standings = yield services_1.standingsService.getStandings();
    yield redis.setex("/api/standings", 86400, JSON.stringify(standings));
    const teams = yield services_1.teamService.getTeams();
    yield redis.setex("/api/teams", 86400, JSON.stringify(teams));
    yield updateRaceCache(raceCalendar);
});
//# sourceMappingURL=index.js.map