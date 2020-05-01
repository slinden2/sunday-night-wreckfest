import {
  isString,
  parseEventId,
  isNumber,
  parseNumericBoolean,
} from "./googleSheetsServiceUtils";
import { DataIntegrityError } from "../utils/errors";

describe("googleSheetsServiceUtils", () => {
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
});
