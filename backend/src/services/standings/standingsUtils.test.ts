import { toStandingRows } from "./standingsUtils";
import {
  toStandingRowsReturn,
  toStandingRowsInput,
} from "../../utils/mockData";

describe("standingsUtils", () => {
  describe("toStandingRows", () => {
    it("should return an array of objects of correct type", () => {
      toStandingRows(toStandingRowsInput).forEach((row, i) => {
        expect(row).toEqual(expect.objectContaining(toStandingRowsReturn[i]));
      });
    });
  });
});
