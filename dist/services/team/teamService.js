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
const teamUtils_1 = require("./teamUtils");
exports.getTeams = () => __awaiter(void 0, void 0, void 0, function* () {
    const driverSheet = yield googleSheetsUtils_1.getSheetAndRows("drivers");
    const drivers = teamUtils_1.toDriver(driverSheet.rows);
    const teams = teamUtils_1.extractTeamsFromDrivers(drivers).sort((a, b) => a.name > b.name ? 1 : -1);
    return teams;
});
exports.default = {
    getTeams: exports.getTeams,
};
//# sourceMappingURL=teamService.js.map