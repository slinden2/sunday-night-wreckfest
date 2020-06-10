import { toDriver, extractTeamsFromDrivers } from "./teamUtils";
import { rawDriverData, driverData, teamData } from "../../utils/mockData";

describe("teamUtils", () => {
  describe("toDriver", () => {
    it("should parse raw driver data correctly", () => {
      expect(toDriver(rawDriverData)).toEqual(driverData);
    });
  });
  describe("extractTeamsFromDrivers", () => {
    expect(extractTeamsFromDrivers(driverData)).toEqual(teamData);
  });
});
