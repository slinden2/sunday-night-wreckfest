import {
  isDate,
  parseDate,
  parseString,
  parseNumber,
  toRaceCalendarEvents,
} from "./calendarUtils";
import { DataIntegrityError } from "../../utils/errors";
import {
  toRaceCalendarEventsInput,
  toRaceCalendarEventsReturn,
} from "../../utils/mockData";

describe("calendarUtils", () => {
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
  describe("parseNumber", () => {
    const testArr = [
      { type: "boolean", value: true },
      { type: "string", value: "string" },
      { type: "undefined", value: undefined },
    ];

    testArr.forEach(testCase => {
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
  describe("toRaceCalendarEvents", () => {
    it("Should convert 'any' type to RaceCalendarEvent[]", () => {
      toRaceCalendarEvents(toRaceCalendarEventsInput).forEach((race, i) => {
        expect(race).toEqual(
          expect.objectContaining(toRaceCalendarEventsReturn[i])
        );
      });
    });
  });
});
