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
} from "../../utils/mockData";

describe("eventService", () => {
  describe("mergeRaceData", () => {
    it("should return merge data correctly without season data", () => {
      expect(
        eventService.mergeRaceData(getRaceCalendarReturn[0], getRaceDataReturn)
      ).toEqual(mergeRaceDataReturn);
    });
    it("should return merge data correctly with season data", () => {
      expect(
        eventService.mergeRaceData(
          getRaceCalendarReturn[0],
          getRaceDataReturn,
          toSeasonDataReturn
        )
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
            sheet: {},
            rows: [
              { eventId: "0401", driverId: "0001", save: saveSpy },
              { eventId: "0401", driverId: "0002", save: saveSpy },
            ],
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
});
