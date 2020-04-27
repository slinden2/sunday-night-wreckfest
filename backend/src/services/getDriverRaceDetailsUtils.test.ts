import {
  isNumeric,
  parseDriverId,
  parseRacePosition,
  parseGroup,
  isLapTime,
  parseLapTime,
  toDriverRaceDetails,
} from "./getDriverRaceDetailsUtils";
import { DataIntegrityError } from "../utils/errors";

describe("getDriverRaceDetailsUtils", () => {
  describe("isNumeric", () => {
    it("should return true with 4", () => {
      expect(isNumeric("4")).toBeTruthy();
    });
    it("should return true with 0004", () => {
      expect(isNumeric("4")).toBeTruthy();
    });
    it("should return true with 0", () => {
      expect(isNumeric("0")).toBeTruthy();
    });
    it("should return false with ''", () => {
      expect(isNumeric("")).toBeFalsy();
    });
    it("should return false with 'g'", () => {
      expect(isNumeric("g")).toBeFalsy();
    });
  });
  describe("parseDriverId", () => {
    it("should return '5555' with '5555'", () => {
      expect(parseDriverId("5555")).toEqual("5555");
    });
    it("should throw with '555'", () => {
      expect(() => parseDriverId("555")).toThrow(DataIntegrityError);
    });
    it("should throw with '55555'", () => {
      expect(() => parseDriverId("55555")).toThrow(DataIntegrityError);
    });
    it("should throw with '555h'", () => {
      expect(() => parseDriverId("555h")).toThrow(DataIntegrityError);
    });
  });
  describe("parseGroup", () => {
    it("should return 'A' with 'A'", () => {
      expect(parseGroup("A")).toEqual("A");
    });
    it("should throw with 'G'", () => {
      expect(() => parseGroup(5)).toThrow(DataIntegrityError);
    });
    it("should throw with 5", () => {
      expect(() => parseGroup(5)).toThrow(DataIntegrityError);
    });
  });
  describe("parseRacePosition", () => {
    it("should return 5 with '5'", () => {
      expect(parseRacePosition("5")).toEqual(5);
    });
    it("should throw with 'lol'", () => {
      expect(() => parseRacePosition("lol")).toThrow(DataIntegrityError);
    });
  });
  describe("isLapTime", () => {
    it("should be truthy with 01:01,500", () => {
      expect(isLapTime("01:01,500")).toBeTruthy();
    });
    it("should be truthy with 1:01,500", () => {
      expect(isLapTime("1:01,500")).toBeFalsy();
    });
    it("should be falsy with 01:1,500", () => {
      expect(isLapTime("01:1,500")).toBeFalsy();
    });
    it("should be falsy with 01:01,50", () => {
      expect(isLapTime("01:01,50")).toBeFalsy();
    });
  });
  describe("parseLapTime", () => {
    it("should return 01:01,500 with 01:01,500", () => {
      expect(parseLapTime("01:01,500")).toEqual("01:01,500");
    });
    it("should throw with 1:01,500", () => {
      expect(() => parseLapTime("1:01,500")).toThrow(DataIntegrityError);
    });
  });
  describe("toDriverRaceDetails", () => {
    const testArr = [
      {
        driverId: "0001",
        driverName: "Test Driver",
        eventId: "0401",
        isReady: "1",
        isProcessed: "1",
        qTime: "01:01,500",
        group: "A",
        posHeat1: "1",
        posHeat2: "2",
        posHeat3: "3",
        posHeat4: "4",
        posHeat5: "5",
      },
      {
        driverId: "0002",
        driverName: "Test Driver2",
        eventId: "0401",
        isReady: "1",
        isProcessed: "1",
        qTime: "01:00,500",
        group: "A",
        posHeat1: "2",
        posHeat2: "3",
        posHeat3: "4",
        posHeat4: "5",
        posHeat5: "6",
      },
    ];
    const resArr = [
      {
        driverId: "0001",
        driverName: "Test Driver",
        eventId: "0401",
        isReady: true,
        isProcessed: true,
        qTime: "01:01,500",
        group: "A",
        racePositions: {
          heat1: 1,
          heat2: 2,
          heat3: 3,
          heat4: 4,
          heat5: 5,
          heat6: undefined,
        },
      },
      {
        driverId: "0002",
        driverName: "Test Driver2",
        eventId: "0401",
        isReady: true,
        isProcessed: true,
        qTime: "01:00,500",
        group: "A",
        racePositions: {
          heat1: 2,
          heat2: 3,
          heat3: 4,
          heat4: 5,
          heat5: 6,
          heat6: undefined,
        },
      },
    ];

    toDriverRaceDetails("0401", testArr).forEach((details, i) => {
      expect(details).toEqual(expect.objectContaining(resArr[i]));
    });
  });
});
