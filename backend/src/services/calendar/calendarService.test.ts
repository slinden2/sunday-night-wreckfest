import * as gsUtils from "../googleSheetsUtils";
import * as calendarUtils from "./calendarUtils";
import { toPromise } from "../../utils/mockData";
import { RaceCalendarEvent } from "../../types";
import { calendarService } from "..";

describe("calendarService", () => {
  let getSheetAndRowsSpy: jest.SpyInstance;
  let toRaceCalendarEventsSpy: jest.SpyInstance;
  const saveSpy = jest.fn();

  beforeEach(() => {
    getSheetAndRowsSpy = jest
      .spyOn(gsUtils, "getSheetAndRows")
      .mockImplementation(() =>
        toPromise({
          sheet: {},
          rows: [{ eventId: "0401", save: saveSpy }],
        } as gsUtils.ISheetAndRows)
      );

    toRaceCalendarEventsSpy = jest
      .spyOn(calendarUtils, "toRaceCalendarEvents")
      .mockImplementation(() => {
        return [] as RaceCalendarEvent[];
      });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getRaceCalendar", () => {
    it("should call getSheetAndRows and toRaceCalendarEvents", async () => {
      await calendarService.getRaceCalendar();
      expect(getSheetAndRowsSpy).toHaveBeenCalled();
      expect(toRaceCalendarEventsSpy).toHaveBeenCalled();
    });
  });

  describe("setIsProcessedTue", () => {
    it("should call getSheetAndRows and save row", async () => {
      await calendarService.setIsProcessedTrue("0401");
      expect(getSheetAndRowsSpy).toHaveBeenCalled();
      expect(saveSpy).toHaveBeenCalled();
    });
  });
});
