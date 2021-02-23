import {
  toPromise,
  getDriverRowInput,
  updateRowDriverRow,
  updateRowDriverRowErr,
  updateRowDriver,
  updateRowReturn,
  addRaceToStandingsRaceData,
  toRaceCalendarEventsReturn,
} from "../../utils/mockData";
import {
  getDriverRow,
  updateRow,
  addRaceToStandings,
} from "./updateStandingsUtils";

describe("updateStandingsUtils", () => {
  describe("getDriverRow", () => {
    it("should return driver by seasonId and driverId", () => {
      expect(
        getDriverRow("0400", "DRI0001", getDriverRowInput as any[])
      ).toEqual(getDriverRowInput[0]);
      expect(
        getDriverRow("0500", "DRI0001", getDriverRowInput as any[])
      ).toEqual(getDriverRowInput[2]);
    });
  });
  describe("updateRow", () => {
    it("should update the row correctly", () => {
      expect(updateRow(updateRowDriverRow as any, updateRowDriver)).toEqual(
        updateRowReturn
      );
    });
    it("should throw on duplicate eventId", () => {
      expect(() =>
        updateRow(updateRowDriverRowErr as any, updateRowDriver)
      ).toThrow(/Duplicate eventId/);
    });
  });

  describe("addRaceToStandings", () => {
    let getSheetAndRowsSpy: jest.SpyInstance;
    let getDriverRowSpy: jest.SpyInstance;
    let updateRowSpy: jest.SpyInstance;
    beforeEach(() => {
      getSheetAndRowsSpy = jest
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        .spyOn(require("../googleSheetsUtils"), "getSheetAndRows")
        .mockImplementation(() =>
          toPromise({
            sheet: "mock",
            rows: "mock",
          })
        );
      getDriverRowSpy = jest
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        .spyOn(require("./updateStandingsUtils"), "getDriverRow")
        .mockImplementation();
      updateRowSpy = jest
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        .spyOn(require("./updateStandingsUtils"), "updateRow")
        .mockImplementation(() => ({
          save: jest.fn(),
        }));
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should call functions correctly with new driver rows", async () => {
      await addRaceToStandings(
        toRaceCalendarEventsReturn[0],
        addRaceToStandingsRaceData
      );
      expect(getSheetAndRowsSpy).toHaveBeenCalledTimes(2);
      expect(getDriverRowSpy).toHaveBeenCalledTimes(2);
      expect(updateRowSpy).not.toHaveBeenCalled();
    });
    it("should call functions correctly with one existing and one new driver row", async () => {
      getDriverRowSpy = jest
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        .spyOn(require("./updateStandingsUtils"), "getDriverRow")
        .mockImplementation(() => "mock");
      await addRaceToStandings(
        toRaceCalendarEventsReturn[0],
        addRaceToStandingsRaceData
      );
      expect(getSheetAndRowsSpy).toHaveBeenCalledTimes(2);
      expect(getDriverRowSpy).toHaveBeenCalledTimes(2);
      expect(updateRowSpy).toHaveBeenCalledTimes(2);
    });
  });
});
