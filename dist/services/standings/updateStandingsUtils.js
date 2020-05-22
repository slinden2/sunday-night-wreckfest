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
const googleSheetsUtils_1 = require("../googleSheetsUtils");
const config_1 = __importDefault(require("../../config"));
exports.updateRow = (driverRow, driver) => {
    driverRow.points = Number(driverRow.points);
    driverRow.points += Number(driver.seasonPoints);
    const previousRaceIds = driverRow.eventIds.split(";");
    if (previousRaceIds.includes(driver.eventId)) {
        throw new Error(`Duplicate eventId: ${driver.eventId}. The race has already been registered.`);
    }
    const newRaceIds = [...previousRaceIds, driver.eventId];
    driverRow.eventIds = newRaceIds.join(";");
    driverRow.racesDriven = newRaceIds.length;
    return driverRow;
};
exports.getDriverRow = (seasonId, driverId, rows) => {
    return rows.find(row => row.driverId === driverId && row.seasonId === seasonId);
};
exports.addRaceToStandings = (event, raceData) => __awaiter(void 0, void 0, void 0, function* () {
    const standings = yield googleSheetsUtils_1.getSheetAndRows("standings");
    const newRows = [];
    const rowsToUpdate = [];
    for (const driver of raceData) {
        const driverRow = exports.getDriverRow(event.seasonId, driver.driverId, standings.rows);
        if (!driverRow) {
            newRows.push({
                seasonId: event.seasonId,
                seasonName: event.seasonName,
                driverId: driver.driverId,
                driverName: driver.driverName,
                points: driver.seasonPoints,
                racesDriven: 1,
                eventIds: driver.eventId,
            });
            continue;
        }
        const updatedDriverRow = exports.updateRow(driverRow, driver);
        rowsToUpdate.push(updatedDriverRow.save({ raw: true }));
    }
    if (config_1.default.ENV !== "test") {
        if (newRows.length) {
            yield standings.sheet.addRows(newRows);
        }
        if (rowsToUpdate.length) {
            yield Promise.all(rowsToUpdate);
        }
    }
});
exports.updatePowerLimit = (seasonId, winnerId) => __awaiter(void 0, void 0, void 0, function* () {
    const standings = yield googleSheetsUtils_1.getSheetAndRows("standings");
    const eventRows = [...standings.rows].filter(row => row.seasonId === seasonId);
    const rowsOrdered = eventRows.sort((a, b) => Number(b.points) - Number(a.points));
    const winnerRow = rowsOrdered.find(row => row.driverId === winnerId);
    winnerRow.powerLimit = "C161";
    rowsOrdered[0].powerLimit = "C155";
    rowsOrdered[1].powerLimit = "C158";
    rowsOrdered[2].powerLimit = "C161";
    rowsOrdered.slice(3).forEach(row => {
        if (row.driverId !== winnerId) {
            row.powerLimit = "";
        }
    });
    const rowsToUpdate = rowsOrdered.map(row => row.save({ raw: true }));
    yield Promise.all(rowsToUpdate);
});
exports.addUpdateTime = () => __awaiter(void 0, void 0, void 0, function* () {
    const standings = yield googleSheetsUtils_1.getSheetAndRows("standings");
    yield standings.sheet.loadCells("M6");
    const cell = standings.sheet.getCellByA1("M6");
    cell.value = new Date().toLocaleString("fi");
    yield standings.sheet.saveUpdatedCells();
});
//# sourceMappingURL=updateStandingsUtils.js.map