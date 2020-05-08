"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
exports.toStandingRows = (rawRows) => {
    const cleanRows = [];
    rawRows.forEach(row => {
        const driver = {
            seasonId: helpers_1.parseEventId(row.seasonId, "seasonId"),
            driverId: helpers_1.parseDriverId(row.driverId),
            driverName: helpers_1.parseString(row.driverName, "driverName"),
            racesDriven: helpers_1.parseNumber(row.racesDriven, "racesDriven"),
            points: helpers_1.parseNumber(row.points, "points"),
            powerLimit: helpers_1.parsePowerLimit(row.powerLimit),
            eventIds: helpers_1.parseEventIds(row.eventIds),
        };
        cleanRows.push(driver);
    });
    return cleanRows;
};
//# sourceMappingURL=standingsUtils.js.map