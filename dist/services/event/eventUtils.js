"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
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
    return {
        driverId: helpers_1.parseDriverId(driverData.driverId),
        driverName: helpers_1.parseString(driverData.driverName, "driverName"),
        eventId: helpers_1.parseEventId(driverData.eventId, "eventId"),
        isReady: helpers_1.parseNumericBoolean(driverData.isReady, "isReady"),
        isProcessed: helpers_1.parseNumericBoolean(driverData.isProcessed, "isProcessed"),
        qTime: helpers_1.parseLapTime(driverData.qTime),
        group: helpers_1.parseGroup(driverData.group),
        heatPositions: helpers_1.parseHeatPositions(exports.getHeatPositions(driverData)),
    };
};
exports.toDriverRaceDetails = (eventId, rawRows) => {
    const cleanRows = [];
    typeof cleanRows;
    rawRows
        .filter((row) => row.eventId === eventId)
        .forEach((row) => {
        const driverDetail = exports.toIDriverSeasonRaceData(row);
        cleanRows.push(driverDetail);
    });
    return cleanRows;
};
//# sourceMappingURL=eventUtils.js.map