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
Object.defineProperty(exports, "__esModule", { value: true });
const googleSheetsUtils_1 = require("../googleSheetsUtils");
const calendarUtils_1 = require("./calendarUtils");
exports.getRaceCalendar = () => __awaiter(void 0, void 0, void 0, function* () {
    const raceCalendar = yield googleSheetsUtils_1.getSheetAndRows("raceCalendar");
    const raceCalendarEvents = calendarUtils_1.toRaceCalendarEvents(raceCalendar.rows);
    return raceCalendarEvents;
});
exports.setIsProcessedTrue = (eventId) => __awaiter(void 0, void 0, void 0, function* () {
    const raceCalendar = yield googleSheetsUtils_1.getSheetAndRows("raceCalendar");
    const processedRow = raceCalendar.rows.find(row => row.eventId === eventId);
    if (processedRow) {
        processedRow.isProcessed = "1";
        yield processedRow.save();
    }
});
exports.default = {
    getRaceCalendar: exports.getRaceCalendar,
    setIsProcessedTrue: exports.setIsProcessedTrue,
};
//# sourceMappingURL=calendarService.js.map