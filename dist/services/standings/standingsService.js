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
const standingsUtils_1 = require("./standingsUtils");
const __1 = require("..");
const updateStandingsUtils_1 = require("./updateStandingsUtils");
const misc_1 = require("../../utils/misc");
const getStandings = () => __awaiter(void 0, void 0, void 0, function* () {
    const standings = yield googleSheetsUtils_1.getSheetAndRows("standings");
    const standingRows = standingsUtils_1.toStandingRows(standings.rows);
    return standingRows;
});
exports.updateStandings = () => __awaiter(void 0, void 0, void 0, function* () {
    const eventList = yield __1.calendarService.getRaceCalendar();
    for (const event of eventList) {
        if (event.isReady && event.isCompleted && !event.isProcessed) {
            yield googleSheetsUtils_1.makeBackup("standings");
            const raceData = yield __1.eventService.getRaceData(event.eventId);
            const raceDataWithDups = updateStandingsUtils_1.markDuplicates(raceData);
            yield updateStandingsUtils_1.addRaceToStandings(event, raceDataWithDups);
            if (event.hasPowerLimit) {
                yield updateStandingsUtils_1.updatePowerLimit();
            }
            yield __1.calendarService.setIsProcessedTrue(event.eventId);
            yield updateStandingsUtils_1.addUpdateTime();
            yield misc_1.sleep(5000);
        }
    }
});
exports.default = { getStandings, updateStandings: exports.updateStandings };
//# sourceMappingURL=standingsService.js.map