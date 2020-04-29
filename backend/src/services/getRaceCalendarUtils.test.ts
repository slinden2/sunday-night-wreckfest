import {
  isDate,
  parseDate,
  parseString,
  parseLaps,
  toRaceCalendarEvents,
} from "./getRaceCalendarUtils";
import { DataIntegrityError } from "../utils/errors";

describe("getRaceCalendarUtils", () => {
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

    testArr.forEach(testCase => {
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
  describe("parseLaps", () => {
    const testArr = [
      { type: "boolean", value: true },
      { type: "string", value: "string" },
      { type: "undefined", value: undefined },
    ];

    testArr.forEach(testCase => {
      it(`should throw an error with a non number param (${testCase.type})`, () => {
        expect(() => parseLaps(testCase.value, "test")).toThrow(
          DataIntegrityError
        );
      });
    });

    it("should return a number with a numeric string", () => {
      expect(parseLaps("123", "test")).toEqual(123);
    });
  });
  describe("toRaceCalendarEvents", () => {
    it("Should convert 'any' type to RaceCalendarEvent[]", () => {
      const testArr = [
        {
          eventId: "0401",
          isReady: "1",
          isCompleted: "1",
          isProcessed: "1",
          date: "12.1.2020",
          trackName: "Boulder Bank Full Circuit 2 No X",
          qLaps: "6",
          raceLaps: "4",
        },
        {
          eventId: "0402",
          isReady: "0",
          isCompleted: "0",
          isProcessed: "0",
          date: "19.1.2020",
          trackName: "Fire Rock Raceway Main Circuit Reverse",
          qLaps: "9",
          raceLaps: "6",
        },
      ];

      const resArray = [
        {
          eventId: "0401",
          isReady: true,
          isCompleted: true,
          isProcessed: true,
          date: "2020-01-12",
          trackName: "Boulder Bank Full Circuit 2 No X",
          qLaps: 6,
          raceLaps: 4,
        },
        {
          eventId: "0402",
          isReady: false,
          isCompleted: false,
          isProcessed: false,
          date: "2020-01-19",
          trackName: "Fire Rock Raceway Main Circuit Reverse",
          qLaps: 9,
          raceLaps: 6,
        },
      ];

      toRaceCalendarEvents(testArr).forEach((race, i) => {
        expect(race).toEqual(expect.objectContaining(resArray[i]));
      });
    });
  });
});
