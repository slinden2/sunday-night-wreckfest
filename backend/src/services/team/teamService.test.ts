import * as gsUtils from "../googleSheetsUtils";
import { GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { toPromise } from "../../utils/mockData";
import teamService from "./teamService";

describe("teamService", () => {
  describe("getTeams", () => {
    beforeEach(() => {
      jest.spyOn(gsUtils, "getSheetAndRows").mockImplementation(() =>
        toPromise({
          sheet: {} as GoogleSpreadsheetWorksheet,
          rows: [
            {
              driverId: "DRI0002",
              driverName: "Test Driver 2",
              team: "Test Team 2",
              teamLogoUrl: "/team-logo-2.png",
            },
            {
              driverId: "DRI0001",
              driverName: "Test Driver 1",
              team: "Test Team 1",
              teamLogoUrl: "/team-logo-1.png",
            },
          ] as any[],
        } as gsUtils.ISheetAndRows)
      );
    });

    it("should return the data in correct format", async () => {
      const teams = await teamService.getTeams();
      expect(teams).toEqual([
        {
          driver1: "Test Driver 1",
          name: "Test Team 1",
          logoUrl: "/team-logo-1.png",
        },
        {
          driver1: "Test Driver 2",
          name: "Test Team 2",
          logoUrl: "/team-logo-2.png",
        },
      ]);
    });
  });
});
