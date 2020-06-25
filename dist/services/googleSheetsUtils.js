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
const google_spreadsheet_1 = require("google-spreadsheet");
const config_1 = __importDefault(require("../config"));
const misc_1 = require("../utils/misc");
exports.getDocument = () => __awaiter(void 0, void 0, void 0, function* () {
    const doc = new google_spreadsheet_1.GoogleSpreadsheet(config_1.default.GS_ID);
    yield doc.useServiceAccountAuth(config_1.default.GS_CREDENTIALS);
    yield doc.loadInfo();
    return doc;
});
const sheetMap = {
    raceCalendar: 0,
    eventDetails: 1495986400,
    standings: 1733156042,
    seasons: 1876267219,
    drivers: 1062100406,
};
exports.getSheetAndRows = (sheetName) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield exports.getDocument();
    const sheet = doc.sheetsById[sheetMap[sheetName]];
    const rows = yield sheet.getRows();
    return { sheet, rows };
});
exports.makeBackup = (sheetName) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield exports.getDocument();
    const oldSheet = doc.sheetsById[sheetMap[sheetName]];
    yield oldSheet.loadHeaderRow();
    const newSheet = yield doc.addSheet();
    newSheet.updateProperties({
        title: `${sheetName} ${misc_1.getSimpleTime()}`,
    });
    yield misc_1.sleep(2000);
    yield newSheet.setHeaderRow(oldSheet.headerValues);
    const rows = yield oldSheet.getRows();
    const rawRows = rows.map(row => row._rawData);
    yield newSheet.addRows(rawRows);
});
//# sourceMappingURL=googleSheetsUtils.js.map