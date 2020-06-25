"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const misc_1 = require("../../utils/misc");
const config_1 = __importDefault(require("../../config"));
exports.getHeatPositions = (driverData) => {
    const posArr = [];
    Object.getOwnPropertyNames(driverData).forEach((prop) => {
        if (prop.startsWith("pos")) {
            driverData[prop] && posArr.push(driverData[prop]);
        }
    });
    return posArr;
};
exports.toIDriverSeasonRaceData = (driverData) => {
    const drawPosition = driverData.drawPosition
        ? driverData.drawPosition === config_1.default.CHECK_DRAW_TEXT
            ? undefined
            : helpers_1.parseNumber(driverData.drawPosition, "drawPosition")
        : undefined;
    return {
        driverId: helpers_1.parseDriverId(driverData.driverId),
        driverName: helpers_1.parseString(driverData.driverName, "driverName"),
        eventId: helpers_1.parseEventId(driverData.eventId, "eventId"),
        isReady: helpers_1.parseNumericBoolean(driverData.isReady, "isReady"),
        isProcessed: helpers_1.parseNumericBoolean(driverData.isProcessed, "isProcessed"),
        qTime: helpers_1.parseLapTime(driverData.qTime),
        group: helpers_1.parseGroup(driverData.group),
        heatPositions: helpers_1.parseHeatPositions(exports.getHeatPositions(driverData)),
        drawPosition,
    };
};
exports.toDriverRaceDetails = (eventId, rawRows) => {
    const cleanRows = [];
    rawRows
        .filter(row => row.eventId === eventId)
        .forEach(row => {
        const driverDetail = exports.toIDriverSeasonRaceData(row);
        cleanRows.push(driverDetail);
    });
    return cleanRows;
};
exports.getDraws = (data) => {
    const draws = [];
    for (let i = 0; i < data.length - 1; i++) {
        if (misc_1.getSumOfArrayElements(data[i].heatPoints) ===
            misc_1.getSumOfArrayElements(data[i + 1].heatPoints)) {
            draws.push(data[i + 1]);
            if (!draws.includes(data[i])) {
                draws.push(data[i]);
            }
        }
    }
    return draws;
};
exports.toSeasonDetails = (id, seasonData) => {
    const rawSeason = seasonData.find(season => season.seasonId === id);
    if (!rawSeason) {
        return undefined;
    }
    return Object.assign(Object.assign({ seasonId: helpers_1.parseEventId(rawSeason.seasonId, "seasonId"), seasonName: helpers_1.parseString(rawSeason.seasonName, "seasonName"), description: helpers_1.parseMarkdown(rawSeason.description, "description") }, (rawSeason.cars
        ? {
            cars: helpers_1.parseCars(rawSeason.cars),
        }
        : null)), (rawSeason.mods ? { mods: helpers_1.parseMods(rawSeason.mods) } : null));
};
//# sourceMappingURL=eventUtils.js.map