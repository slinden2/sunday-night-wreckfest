import { calendarService, eventService, standingsService } from "..";
import * as gsUtils from "../googleSheetsUtils";
import * as updateStandingsUtils from "./updateStandingsUtils";
import {
  getRaceCalendarReturn,
  getRaceDataReturn,
  toPromise,
} from "../../utils/mockData";
import * as misc from "../../utils/misc";

describe("standingsService", () => {
  describe("updateStandings", () => {
    let getRaceCalendarSpy: jest.SpyInstance;
    let makeBackupSpy: jest.SpyInstance;
    let getRaceDataSpy: jest.SpyInstance;
    let addRaceToStandingsSpy: jest.SpyInstance;
    let updatePowerLimitSpy: jest.SpyInstance;
    let setIsProcessedTrueSpy: jest.SpyInstance;
    let addUpdateTimeSpy: jest.SpyInstance;
    let sleepSpy: jest.SpyInstance;
    beforeEach(() => {
      getRaceCalendarSpy = jest
        .spyOn(calendarService, "getRaceCalendar")
        .mockImplementation(() => toPromise(getRaceCalendarReturn));

      makeBackupSpy = jest.spyOn(gsUtils, "makeBackup").mockImplementation();

      getRaceDataSpy = jest
        .spyOn(eventService, "getRaceData")
        .mockImplementation(() => toPromise(getRaceDataReturn));

      addRaceToStandingsSpy = jest
        .spyOn(updateStandingsUtils, "addRaceToStandings")
        .mockImplementation();

      updatePowerLimitSpy = jest
        .spyOn(updateStandingsUtils, "updatePowerLimit")
        .mockImplementation();

      setIsProcessedTrueSpy = jest
        .spyOn(calendarService, "setIsProcessedTrue")
        .mockImplementation();

      addUpdateTimeSpy = jest
        .spyOn(updateStandingsUtils, "addUpdateTime")
        .mockImplementation();

      sleepSpy = jest.spyOn(misc, "sleep").mockImplementation();
    });

    afterEach(() => {
      getRaceCalendarSpy.mockRestore();
      makeBackupSpy.mockRestore();
      getRaceDataSpy.mockRestore();
      addRaceToStandingsSpy.mockRestore();
      updatePowerLimitSpy.mockRestore();
      setIsProcessedTrueSpy.mockRestore();
      sleepSpy.mockRestore();
    });

    it("should call getRaceCalendar", async () => {
      await standingsService.updateStandings();
      expect(getRaceCalendarSpy).toHaveBeenCalled();
    });
    it("should not call getRaceData for all processed events", async () => {
      await standingsService.updateStandings();
      expect(getRaceDataSpy).not.toHaveBeenCalled();
    });
    it("should run all unprocessed events", async () => {
      const mod = getRaceCalendarReturn;
      getRaceCalendarReturn.forEach(d => (d.isProcessed = false));
      getRaceCalendarReturn[1].hasPowerLimit = false;
      jest
        .spyOn(calendarService, "getRaceCalendar")
        .mockReturnValue(Promise.resolve(mod));
      await standingsService.updateStandings();
      expect(makeBackupSpy).toHaveBeenCalledTimes(2);
      expect(getRaceDataSpy).toHaveBeenCalledTimes(2);
      expect(addRaceToStandingsSpy).toHaveBeenCalledTimes(2);
      expect(updatePowerLimitSpy).toHaveBeenCalledTimes(1);
      expect(setIsProcessedTrueSpy).toHaveBeenCalledTimes(2);
      expect(addUpdateTimeSpy).toHaveBeenCalledTimes(2);
      expect(sleepSpy).toHaveBeenCalledTimes(2);
    });
  });
});
