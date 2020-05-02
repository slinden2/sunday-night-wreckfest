import {
  isNumeric,
  parseDriverId,
  parseHeatPositions,
  parseGroup,
  isLapTime,
  parseLapTime,
  toDriverRaceDetails,
} from "./eventUtils";
import { DataIntegrityError } from "../../utils/errors";
import { getRaceDataInput, getRaceDataReturn } from "../../utils/mockData";

describe("eventUtils", () => {
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
  describe("parseHeatPositions", () => {
    it("should return 5 with '5'", () => {
      expect(parseHeatPositions(["5", "5"])).toEqual([5, 5]);
    });
    it("should throw with 'lol'", () => {
      expect(() => parseHeatPositions(["lol", "5"])).toThrow(
        DataIntegrityError
      );
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
    toDriverRaceDetails("0401", getRaceDataInput).forEach((details, i) => {
      expect(details).toEqual(expect.objectContaining(getRaceDataReturn[i]));
    });
  });
});
