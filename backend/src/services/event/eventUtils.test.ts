import { toDriverRaceDetails } from "./eventUtils";
import {
  getRaceDataInput,
  toDriverRaceDetailsReturn,
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
});
