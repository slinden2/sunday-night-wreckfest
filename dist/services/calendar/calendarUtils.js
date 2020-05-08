"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
exports.toRaceCalendarEvents = (rawRows) => {
    const cleanRows = [];
    rawRows.forEach((row) => {
        const event = {
            eventId: helpers_1.parseEventId(row.eventId, "eventId"),
            isReady: helpers_1.parseNumericBoolean(row.isReady, "isReady"),
            isCompleted: helpers_1.parseNumericBoolean(row.isCompleted, "isCompleted"),
            isProcessed: helpers_1.parseNumericBoolean(row.isProcessed, "isProcessed"),
            hasPowerLimit: helpers_1.parseNumericBoolean(row.hasPowerLimit, "hasPowerLimit"),
            date: helpers_1.parseDate(row.date),
            trackName: helpers_1.parseString(row.trackName, "trackName"),
            qLaps: helpers_1.parseNumber(row.qLaps, "qLaps"),
            raceLaps: helpers_1.parseNumber(row.raceLaps, "raceLaps"),
        };
        cleanRows.push(event);
    });
    return cleanRows;
};
//# sourceMappingURL=calendarUtils.js.map