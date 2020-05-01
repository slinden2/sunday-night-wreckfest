const { GoogleSpreadsheet } = require("google-spreadsheet");
import * as gsService from "./googleSheetsService";
import config from "../config";
import {
  getRaceCalendarReturn,
  // getRaceDataReturn,
  toPromise,
  getRaceDataReturn,
} from "../utils/mockData";
import * as updateStandingsUtils from "./updateStandingsUtils";
import * as misc from "../utils/misc";

jest.mock("google-spreadsheet");

describe("googleSheetsService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getDocument", () => {
    it("should call GoogleSpreadsheet constructor with GS_ID", async () => {
      await gsService.getDocument();
      expect(GoogleSpreadsheet).toHaveBeenCalledWith(config.GS_ID);
    });
    it("should use useServiceAccountAuth auth method", async () => {
      await gsService.getDocument();
      expect(
        GoogleSpreadsheet.prototype.useServiceAccountAuth
      ).toHaveBeenCalledWith(config.GS_AUTH);
    });
    it("should load document info", async () => {
      await gsService.getDocument();
      expect(GoogleSpreadsheet.prototype.loadInfo).toHaveBeenCalled();
    });
  });
  describe("updateStandings", () => {
    let getRaceCalendarSpy: any;
    let getRaceDataSpy: any;
    let addRaceToStandingsSpy: any;
    let updatePowerLimitSpy: any;
    let setIsProcessedTrueSpy: any;
    let sleepSpy: any;
    beforeEach(() => {
      getRaceCalendarSpy = jest
        .spyOn(gsService, "getRaceCalendar")
        .mockImplementation(() => toPromise(getRaceCalendarReturn));

      getRaceDataSpy = jest
        .spyOn(gsService, "getRaceData")
        .mockImplementation(() => toPromise(getRaceDataReturn));

      addRaceToStandingsSpy = jest
        .spyOn(updateStandingsUtils, "addRaceToStandings")
        .mockImplementation();

      updatePowerLimitSpy = jest
        .spyOn(updateStandingsUtils, "updatePowerLimit")
        .mockImplementation();

      setIsProcessedTrueSpy = jest
        .spyOn(gsService, "setIsProcessedTrue")
        .mockImplementation();

      sleepSpy = jest.spyOn(misc, "sleep").mockImplementation();
    });

    afterEach(() => {
      getRaceCalendarSpy.mockRestore();
      getRaceDataSpy.mockRestore();
      addRaceToStandingsSpy.mockRestore();
      updatePowerLimitSpy.mockRestore();
      setIsProcessedTrueSpy.mockRestore();
      sleepSpy.mockRestore();
    });

    it("should call getRaceCalendar", async () => {
      await gsService.updateStandings();
      expect(getRaceCalendarSpy).toHaveBeenCalled();
    });
    it("should not call getRaceData for all processed events", async () => {
      await gsService.updateStandings();
      expect(getRaceDataSpy).not.toHaveBeenCalled();
    });
    it("should run all unprocessed events", async () => {
      const mod = getRaceCalendarReturn;
      getRaceCalendarReturn.forEach(d => (d.isProcessed = false));
      getRaceCalendarReturn[1].hasPowerLimit = false;
      jest
        .spyOn(gsService, "getRaceCalendar")
        .mockReturnValue(Promise.resolve(mod));
      await gsService.updateStandings();
      expect(getRaceDataSpy).toHaveBeenCalledTimes(2);
      expect(addRaceToStandingsSpy).toHaveBeenCalledTimes(2);
      expect(updatePowerLimitSpy).toHaveBeenCalledTimes(1);
      expect(setIsProcessedTrueSpy).toHaveBeenCalledTimes(2);
      expect(sleepSpy).toHaveBeenCalledTimes(2);
    });
  });
});
