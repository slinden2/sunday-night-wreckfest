const { GoogleSpreadsheet } = require("google-spreadsheet");
import * as gsUtils from "./googleSheetsUtils";
import config from "../config";

jest.mock("google-spreadsheet");

describe("googleSheetsUtils", () => {
  describe("getDocument", () => {
    it("should call GoogleSpreadsheet constructor with GS_ID", async () => {
      await gsUtils.getDocument();
      expect(GoogleSpreadsheet).toHaveBeenCalledWith(config.GS_ID);
    });
    it("should use useServiceAccountAuth auth method", async () => {
      await gsUtils.getDocument();
      expect(
        GoogleSpreadsheet.prototype.useServiceAccountAuth
      ).toHaveBeenCalledWith(config.GS_AUTH);
    });
    it("should load document info", async () => {
      await gsUtils.getDocument();
      expect(GoogleSpreadsheet.prototype.loadInfo).toHaveBeenCalled();
    });
  });
});
