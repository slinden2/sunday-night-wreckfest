import {
  toPromise,
  getDriverRowInput,
  updateRowDriverRow,
  updateRowDriverRowErr,
  updateRowDriver,
  updateRowReturn,
  addRaceToStandingsRaceData,
} from "../../utils/mockData";
import {
  getSeasonId,
  getDriverRow,
  updateRow,
  addRaceToStandings,
} from "./updateStandingsUtils";
import { DataIntegrityError } from "../../utils/errors";

describe("updateStandingsUtils", () => {
  describe("getSeasonId", () => {
    it("should return first two nums of eventId with 00 suffix", () => {
      expect(getSeasonId("0401")).toEqual("0400");
    });
    it("should throw with incorrect eventId", () => {
      expect(() => getSeasonId("04011")).toThrow(DataIntegrityError);
    });
  });
  describe("getDriverRow", () => {
    it("should return driver by seasonId and driverId", () => {
      expect(getDriverRow("0400", "0001", getDriverRowInput)).toEqual(
        getDriverRowInput[0]
      );
      expect(getDriverRow("0500", "0001", getDriverRowInput)).toEqual(
        getDriverRowInput[2]
      );
    });
  });
  describe("updateRow", () => {
    it("should update the row correctly", () => {
      expect(updateRow(updateRowDriverRow, updateRowDriver, true)).toEqual(
        updateRowReturn
      );
    });
    it("should throw on duplicate eventId", () => {
      expect(() =>
        updateRow(updateRowDriverRowErr, updateRowDriver, true)
      ).toThrow(/Duplicate eventId/);
    });
  });

  describe("addRaceToStandings", () => {
    let getSheetAndRowsSpy: any;
    let getSeasonIdSpy: any;
    let getDriverRowSpy: any;
    let updateRowSpy: any;
    beforeEach(() => {
      getSheetAndRowsSpy = jest
        .spyOn(require("../googleSheetsUtils"), "getSheetAndRows")
        .mockImplementation(() =>
          toPromise({
            sheet: "mock",
            rows: "mock",
          })
        );
      getSeasonIdSpy = jest
        .spyOn(require("./updateStandingsUtils"), "getSeasonId")
        .mockImplementation();
      getDriverRowSpy = jest
        .spyOn(require("./updateStandingsUtils"), "getDriverRow")
        .mockImplementation();
      updateRowSpy = jest
        .spyOn(require("./updateStandingsUtils"), "updateRow")
        .mockImplementation(() => ({
          save: jest.fn(),
        }));
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should call functions correctly with new driver rows", async () => {
      await addRaceToStandings(addRaceToStandingsRaceData, {
        hasPowerLimit: true,
      });
      expect(getSheetAndRowsSpy).toHaveBeenCalledTimes(1);
      expect(getSeasonIdSpy).toHaveBeenCalledTimes(2);
      expect(getDriverRowSpy).toHaveBeenCalledTimes(2);
      expect(updateRowSpy).not.toHaveBeenCalled();
    });
    it("should call functions correctly with one existing and one new driver row", async () => {
      getDriverRowSpy = jest
        .spyOn(require("./updateStandingsUtils"), "getDriverRow")
        .mockImplementation(() => "mock");
      await addRaceToStandings(addRaceToStandingsRaceData, {
        hasPowerLimit: true,
      });
      expect(getSheetAndRowsSpy).toHaveBeenCalledTimes(1);
      expect(getSeasonIdSpy).toHaveBeenCalledTimes(2);
      expect(getDriverRowSpy).toHaveBeenCalledTimes(2);
      expect(updateRowSpy).toHaveBeenCalledTimes(2);
    });
  });
});
