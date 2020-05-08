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
const eventUtils_1 = require("./eventUtils");
const googleSheetsUtils_1 = require("../googleSheetsUtils");
const race_1 = __importDefault(require("../race"));
exports.getRaceData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const eventDetails = yield googleSheetsUtils_1.getSheetAndRows("eventDetails");
    const driverRaceDetails = eventUtils_1.toDriverRaceDetails(id, eventDetails.rows);
    const raceData = new race_1.default(driverRaceDetails);
    return raceData.getRaceData;
});
exports.default = {
    getRaceData: exports.getRaceData,
};
//# sourceMappingURL=eventService.js.map