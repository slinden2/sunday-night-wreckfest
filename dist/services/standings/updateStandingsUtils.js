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
const misc_1 = require("../../utils/misc");
const config_1 = __importDefault(require("../../config"));
exports.getPointVerifyString = (pos, driver) => {
    return `POS: ${pos} | SP: ${driver.seasonPoints} | G: ${driver.group} | HP: ${misc_1.getSumOfArrayElements(driver.heatPoints)}`;
};
exports.updateRow = (pos, driverRow, driver, hasPowerLimit) => {
    driverRow.points = Number(driverRow.points);
    driverRow.points += Number(driver.seasonPoints);
    if (driver.verifyScore) {
        driverRow.verifyScore = exports.getPointVerifyString(pos, driver);
    }
    else {
        driverRow.verifyScore = "";
    }
    const previousRaceIds = driverRow.eventIds.split(";");
    if (previousRaceIds.includes(driver.eventId)) {
        throw new Error(`Duplicate eventId: ${driver.eventId}. The race has already been registered.`);
    }
    const newRaceIds = [...previousRaceIds, driver.eventId];
    driverRow.eventIds = newRaceIds.join(";");
    driverRow.racesDriven = newRaceIds.length;
    if (hasPowerLimit && driver.seasonPoints === 100) {
        driverRow.powerLimit = "C161";
    }
    else {
        driverRow.powerLimit = "";
    }
    return driverRow;
};
exports.getDriverRow = (seasonId, driverId, rows) => {
    return rows.find(row => row.driverId === driverId && row.seasonId === seasonId);
};
exports.addRaceToStandings = (event, raceData) => __awaiter(void 0, void 0, void 0, function* () {
    const standings = yield googleSheetsUtils_1.getSheetAndRows("standings");
    const newRows = [];
    const rowsToUpdate = [];
    for (const [idx, driver] of raceData.entries()) {
        const pos = idx + 1;
        const driverRow = exports.getDriverRow(event.seasonId, driver.driverId, standings.rows);
        if (!driverRow) {
            newRows.push({
                seasonId: event.seasonId,
                seasonName: event.seasonName,
                driverId: driver.driverId,
                driverName: driver.driverName,
                points: driver.seasonPoints,
                verifyScore: driver.verifyScore
                    ? exports.getPointVerifyString(pos, driver)
                    : "",
                racesDriven: 1,
                eventIds: driver.eventId,
            });
            continue;
        }
        const updatedDriverRow = exports.updateRow(pos, driverRow, driver, event.hasPowerLimit);
        rowsToUpdate.push(updatedDriverRow.save());
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
exports.updatePowerLimit = () => __awaiter(void 0, void 0, void 0, function* () {
    const standings = yield googleSheetsUtils_1.getSheetAndRows("standings");
    const rowsOrdered = [...standings.rows].sort((a, b) => Number(b.points) - Number(a.points));
    rowsOrdered[0].powerLimit = "C155";
    rowsOrdered[1].powerLimit = "C158";
    rowsOrdered[2].powerLimit = "C161";
    const rowsToUpdate = [
        rowsOrdered[0].save(),
        rowsOrdered[1].save(),
        rowsOrdered[2].save(),
    ];
    yield Promise.all(rowsToUpdate);
});
exports.markDuplicates = (data) => {
    for (let i = 0; i < data.length - 1; i++) {
        if (misc_1.getSumOfArrayElements(data[i].heatPoints) ===
            misc_1.getSumOfArrayElements(data[i + 1].heatPoints)) {
            data[i].verifyScore = true;
            data[i + 1].verifyScore = true;
        }
    }
    return data;
};
exports.addUpdateTime = () => __awaiter(void 0, void 0, void 0, function* () {
    const standings = yield googleSheetsUtils_1.getSheetAndRows("standings");
    yield standings.sheet.loadCells("M6");
    const cell = standings.sheet.getCellByA1("M6");
    cell.value = new Date().toLocaleString("fi");
    yield standings.sheet.saveUpdatedCells();
});
//# sourceMappingURL=updateStandingsUtils.js.map