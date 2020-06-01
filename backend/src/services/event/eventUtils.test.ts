import { toDriverRaceDetails, toSeasonDetails } from "./eventUtils";
import {
  getRaceDataInput,
  toDriverRaceDetailsReturn,
  toSeasonDataInput,
  toSeasonDataReturn,
} from "../../utils/mockData";

describe("eventUtils", () => {
  describe("toDriverRaceDetails", () => {
    it("should return an object of correct type", () => {
      toDriverRaceDetails("0401", getRaceDataInput).forEach((details, i) => {
        expect(details).toEqual(
          expect.objectContaining(toDriverRaceDetailsReturn[i])
        );
      });
    });
  });
  describe("toSeasonDetails", () => {
    it("should parse raw season data into ISeasoNData", () => {
      expect(toSeasonDetails("0400", [toSeasonDataInput])).toEqual(
        toSeasonDataReturn
      );
    });
  });
});
