import { calendarService } from "..";
import * as eventService from "./eventService";
import * as eventUtils from "./eventUtils";
import * as gsUtils from "../googleSheetsUtils";
import {
  getRaceCalendarReturn,
  getRaceDataReturn,
  mergeRaceDataReturn,
  toPromise,
  getDrawsReturn,
  getDrawsRaceCal,
  mergeRaceDataReturn2,
  toSeasonDataReturn,
  toRaceCalendarEventsReturn,
  getSeasonDataReturn,
  getSingleRaceReturn,
} from "../../utils/mockData";
import { GoogleSpreadsheetWorksheet } from "google-spreadsheet";

describe("eventService", () => {
  describe("mergeRaceData", () => {
    it("should return merge data correctly without season data", () => {
      expect(
        eventService.mergeRaceData(getRaceCalendarReturn[0], {
          raceData: getRaceDataReturn,
        })
      ).toEqual(mergeRaceDataReturn);
    });
    it("should return merge data correctly with season data", () => {
      expect(
        eventService.mergeRaceData(getRaceCalendarReturn[0], {
          raceData: getRaceDataReturn,
          seasonData: toSeasonDataReturn,
        })
      ).toEqual(mergeRaceDataReturn2);
    });
  });
  describe("checkDraws", () => {
    let getRaceCalendarSpy: jest.SpyInstance;
    let getRaceDataSpy: jest.SpyInstance;
    let getDrawsSpy: jest.SpyInstance;
    let getSheetAndRowsSpy: jest.SpyInstance;
    const saveSpy = jest.fn();

    beforeEach(() => {
      getRaceCalendarSpy = jest
        .spyOn(calendarService, "getRaceCalendar")
        .mockImplementation(() => toPromise(getDrawsRaceCal));

      getRaceDataSpy = jest
        .spyOn(eventService, "getRaceData")
        .mockImplementation(() => toPromise(getRaceDataReturn));

      getDrawsSpy = jest
        .spyOn(eventUtils, "getDraws")
        .mockImplementation(() => getDrawsReturn);

      getSheetAndRowsSpy = jest
        .spyOn(gsUtils, "getSheetAndRows")
        .mockImplementation(() =>
          toPromise({
            sheet: {} as GoogleSpreadsheetWorksheet,
            rows: [
              { eventId: "0401", driverId: "0001", save: saveSpy },
              { eventId: "0401", driverId: "0002", save: saveSpy },
            ] as any[],
          } as gsUtils.ISheetAndRows)
        );
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should call all functions", async () => {
      await eventService.checkDraws();
      expect(getRaceCalendarSpy).toBeCalledTimes(1);
      expect(getRaceDataSpy).toBeCalledTimes(2);
      expect(getDrawsSpy).toBeCalledTimes(2);
      expect(getSheetAndRowsSpy).toBeCalledTimes(2);
    });
  });
  describe("getSingleRace", () => {
    beforeEach(() => {
      jest
        .spyOn(calendarService, "getRaceCalendar")
        .mockImplementation(() => toPromise(toRaceCalendarEventsReturn));

      jest
        .spyOn(eventService, "getSeasonData")
        .mockImplementation(() => toPromise(getSeasonDataReturn));

      jest
        .spyOn(eventService, "getRaceData")
        .mockImplementation(() => toPromise(getRaceDataReturn));
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return correct mockData", async () => {
      const raceData = await eventService.getSingleRace("0401");
      expect(raceData).toEqual(getSingleRaceReturn);
    });
  });
});
