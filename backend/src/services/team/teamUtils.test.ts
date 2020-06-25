import { toDriver, extractTeamsFromDrivers } from "./teamUtils";
import { rawDriverData, driverData, teamData } from "../../utils/mockData";

describe("teamUtils", () => {
  describe("toDriver", () => {
    it("should parse raw driver data correctly", () => {
      expect(toDriver(rawDriverData as any[])).toEqual(driverData);
    });
  });
  describe("extractTeamsFromDrivers", () => {
    expect(extractTeamsFromDrivers(driverData)).toEqual(teamData);
  });
});
