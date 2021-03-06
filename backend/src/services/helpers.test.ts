import {
  isString,
  parseEventId,
  isNumber,
  parseNumericBoolean,
  isDate,
  parseDate,
  parseString,
  parseNumber,
  isNumeric,
  parseDriverId,
  parseGroup,
  parseHeatPositions,
  isLapTime,
  parseLapTime,
  parsePowerLimit,
  parseVideos,
  isVideoService,
  isVideoDataString,
  parseCars,
  parseMods,
} from "./helpers";
import { DataIntegrityError } from "../utils/errors";

describe("helpers", () => {
  describe("isDate", () => {
    it("should be truthy with 2020-01-01", () => {
      expect(isDate("2020-01-01")).toBeTruthy();
    });
    it("should be truthy with 01-01-2020", () => {
      expect(isDate("01-01-2020")).toBeTruthy();
    });
    it("should be falsy with 'testdate'", () => {
      expect(isDate("testdate")).toBeFalsy();
    });
  });
  describe("parseDate", () => {
    it("should be return 2020-01-01 with 1.1.2020", () => {
      expect(parseDate("1.1.2020")).toEqual("2020-01-01");
    });
    it("should be return 2020-01-01 with 01.01.2020", () => {
      expect(parseDate("01.01.2020")).toEqual("2020-01-01");
    });
    it("should throw an error with 01.01.20", () => {
      expect(() => parseDate("01.01.20")).toThrow(DataIntegrityError);
    });
    it("should throw an error with 2020.1.1", () => {
      expect(() => parseDate("2020.1.1")).toThrow(DataIntegrityError);
    });
  });
  describe("parseString", () => {
    const testArr = [
      { type: "boolean", value: true },
      { type: "number", value: 1234 },
      { type: "undefined", value: undefined },
    ];

    testArr.forEach((testCase) => {
      it(`should throw an error with a non string param (${testCase.type})`, () => {
        expect(() => parseString(testCase.value, "test")).toThrow(
          DataIntegrityError
        );
      });
    });

    it("should return a string with a string param", () => {
      expect(parseString("test", "test")).toEqual("test");
    });
  });
  describe("parseNumber", () => {
    const testArr = [
      { type: "boolean", value: true },
      { type: "string", value: "string" },
      { type: "undefined", value: undefined },
    ];

    testArr.forEach((testCase) => {
      it(`should throw an error with a non number param (${testCase.type})`, () => {
        expect(() => parseNumber(testCase.value, "test")).toThrow(
          DataIntegrityError
        );
      });
    });

    it("should return a number with a numeric string", () => {
      expect(parseNumber("123", "test")).toEqual(123);
    });
  });
  describe("isString", () => {
    it("should return true with an empty string", () => {
      expect(isString("")).toBeTruthy();
    });
    it("should return true with a string", () => {
      expect(isString("test string")).toBeTruthy();
    });
    it("should return false with a number", () => {
      expect(isString(1)).toBeFalsy();
    });
    it("should return false with a boolean", () => {
      expect(isString(true)).toBeFalsy();
    });
  });
  describe("parseEventId", () => {
    it("should throw an error with longer than 4 char string", () => {
      expect(() => parseEventId("12345", "eventId")).toThrow(
        DataIntegrityError
      );
    });
    it("should throw an error with shorter than 4 char string", () => {
      expect(() => parseEventId("123", "eventId")).toThrow(DataIntegrityError);
    });
  });
  describe("isNumber", () => {
    it("should be falsy with a string", () => {
      expect(isNumber("x")).toBeFalsy();
    });
    it("should be truthy with a string number", () => {
      expect(isNumber("1")).toBeTruthy();
    });
    it("should be truthy with a number", () => {
      expect(isNumber(1)).toBeTruthy();
    });
  });
  describe("parseNumericBoolean", () => {
    it("should be truthy with 1", () => {
      expect(parseNumericBoolean("1", "test")).toBeTruthy();
    });
    it("should be falsy with 0", () => {
      expect(parseNumericBoolean("0", "test")).toBeFalsy();
    });
    it("should throw an error if the number is not 0 or 1", () => {
      expect(() => parseNumericBoolean("4", "test")).toThrow(
        DataIntegrityError
      );
    });
    it("should throw an error if the number is not 0 or 1", () => {
      expect(() => parseNumericBoolean("-4", "test")).toThrow(
        DataIntegrityError
      );
    });
  });
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
    it("should return 'DRI5555' with 'DRI5555'", () => {
      expect(parseDriverId("DRI5555")).toEqual("DRI5555");
    });
    it("should throw with 'DRI555'", () => {
      expect(() => parseDriverId("DRI555")).toThrow(DataIntegrityError);
    });
    it("should throw with '5555'", () => {
      expect(() => parseDriverId("5555")).toThrow(DataIntegrityError);
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
  describe("parsePowerLimit", () => {
    it("should accept C161", () => {
      expect(parsePowerLimit("C161")).toEqual("C161");
    });
    it("should accept B161", () => {
      expect(parsePowerLimit("B161")).toEqual("B161");
    });
    it("should accept A161", () => {
      expect(parsePowerLimit("A161")).toEqual("A161");
    });
    it("should accept D86", () => {
      expect(parsePowerLimit("D86")).toEqual("D86");
    });
    it("should throw with G161", () => {
      expect(() => parsePowerLimit("G161")).toThrow(DataIntegrityError);
    });
    it("should throw with C1", () => {
      expect(() => parsePowerLimit("C1")).toThrow(DataIntegrityError);
    });
  });
  describe("isVideoService", () => {
    it("should return true with youtube and twitch", () => {
      expect(isVideoService("youtube")).toBeTruthy();
      expect(isVideoService("twitch")).toBeTruthy();
    });
    it("should return false with something other than youtube or twitch", () => {
      expect(isVideoService("vimeo")).toBeFalsy();
    });
  });
  describe("isVideoDataString", () => {
    it("should return true with youtube and twitch", () => {
      expect(isVideoDataString("twitch,a;youtube,123;")).toBeTruthy();
    });
    it("should return false if you miss the last semicolon", () => {
      expect(isVideoDataString("twitch,a;youtube,123")).toBeFalsy();
    });
  });
  describe("parseVideos", () => {
    it("should accept twitch,a;youtube,123; and return an array of VideoTypes", () => {
      expect(parseVideos("twitch,a;youtube,123;")).toEqual([
        { service: "twitch", id: "a" },
        { service: "youtube", id: "123" },
      ]);
    });
    it("should return correct object also with one item", () => {
      expect(parseVideos("twitch,a;")).toEqual([
        { service: "twitch", id: "a" },
      ]);
    });
    it("should throw if you miss the last semicolon", () => {
      expect(() => parseVideos("twitch,a;youtube,123")).toThrowError(
        DataIntegrityError
      );
    });
    it("should throw if id is something else than a number or a letter", () => {
      expect(() => parseVideos("twitch,a;youtube,_")).toThrowError(
        DataIntegrityError
      );
    });
    it("should throw if service is not youtube or twitch", () => {
      expect(() => parseVideos("vimeo,a;youtube,123")).toThrowError(
        DataIntegrityError
      );
    });
  });
  describe("parseCars", () => {
    it("should accept sunrise;raiden;test; input", () => {
      expect(() => parseCars("sunrise;raiden;test;")).not.toThrowError();
    });
    it("should not accept sunrise;raiden;test input", () => {
      expect(() => parseCars("sunrise;raiden;test")).toThrowError();
    });
    it("should not accept sunrise;raiden;test input", () => {
      expect(parseCars("sunrise;raiden;test;")).toEqual([
        "sunrise",
        "raiden",
        "test",
      ]);
    });
  });
  describe("parseMods", () => {
    it("should accept kytkin,123456;lahna,234567; input", () => {
      expect(() => parseMods("kytkin,123456;lahna,234567;")).not.toThrowError();
    });
    it("should not accept kytkin,www.kytkin.com,lahna,www.lahna.com; input", () => {
      expect(() =>
        parseMods("kytkin,www.kytkin.com,lahna,www.lahna.com;")
      ).toThrowError();
    });
    it("should convert kytkin,1232456;lahna,234567; into an array of Mod objects", () => {
      expect(parseMods("kytkin,1232456;lahna,234567;")).toEqual([
        { name: "kytkin", id: 1232456 },
        { name: "lahna", id: 234567 },
      ]);
    });
  });
});
