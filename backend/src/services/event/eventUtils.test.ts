import { toDriverRaceDetails, toSeasonDetails, getDraws } from "./eventUtils";
import {
  getRaceDataInput,
  toDriverRaceDetailsReturn,
  toSeasonDataInput,
  toSeasonDataReturn,
  getDrawsInput,
  getDrawsReturn2,
} from "../../utils/mockData";

describe("eventUtils", () => {
  describe("toDriverRaceDetails", () => {
    it("should return an object of correct type", () => {
      toDriverRaceDetails("0401", getRaceDataInput as any[]).forEach(
        (details, i) => {
          expect(details).toEqual(
            expect.objectContaining(toDriverRaceDetailsReturn[i])
          );
        }
      );
    });
  });
  describe("toSeasonDetails", () => {
    it("should parse raw season data into ISeasonData", () => {
      expect(toSeasonDetails("0400", [toSeasonDataInput as any])).toEqual(
        toSeasonDataReturn
      );
    });
  });
  describe("getDraws", () => {
    it("should return draws", () => {
      expect(getDraws(getDrawsInput)).toEqual(getDrawsReturn2);
    });
  });
});
