import Race from ".";
import raceTestUtils from "./raceTestUtils";
import { DataIntegrityError } from "../../utils/errors";

describe("Race Class", () => {
  let raceData: Race;
  beforeEach(() => {
    raceData = new Race(raceTestUtils.driverData);
  });

  it("should contain the driver data array", () => {
    expect(raceData.rawData.length).toEqual(22);
  });
  it("should contain sorted driver data with points", () => {
    expect(raceData.getRaceData).toEqual(raceTestUtils.orderedDriverData);
  });
  describe("_sortByPoints", () => {
    it("should return ", () => {
      expect(
        raceData["_sortByPoints"](
          raceTestUtils.sortByPointsData[0],
          raceTestUtils.sortByPointsData[1]
        )
      ).toEqual(-20);
    });
    it("should throw an error with no heatPoints", () => {
      const b = raceTestUtils.sortByPointsData[1];
      b.heatPoints = [0];
      expect(() =>
        raceData["_sortByPoints"](
          raceTestUtils.sortByPointsData[0],
          raceTestUtils.sortByPointsData[1]
        )
      ).toThrow(DataIntegrityError);
    });
  });
});
