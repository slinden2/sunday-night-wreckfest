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
const services_1 = require("../services");
const eventService_1 = require("../services/event/eventService");
const config_1 = __importDefault(require("../config"));
const router = express_1.default.Router();
router.get("/", (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const raceCalendar = yield services_1.calendarService.getRaceCalendar();
        return res.status(200).json(raceCalendar);
    }
    catch (err) {
        return next(err);
    }
}));
router.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const calendar = yield services_1.calendarService.getRaceCalendar();
        const calendarEvent = calendar.find(event => event.eventId === req.params.id);
        if (!calendarEvent) {
            throw new Error(`No event found with eventId ${req.params.id}`);
        }
        const raceData = yield services_1.eventService.getRaceData(req.params.id);
        const seasonData = yield eventService_1.getSeasonData(calendarEvent.seasonId);
        const mergedData = eventService_1.mergeRaceData(calendarEvent, raceData, seasonData);
        return res.status(200).json(mergedData);
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
exports.default = router;
//# sourceMappingURL=raceRoute.js.map