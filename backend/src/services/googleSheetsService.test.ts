const { GoogleSpreadsheet } = require("google-spreadsheet");
import * as gsService from "./googleSheetsService";
import config from "../config";

jest.mock("google-spreadsheet");

describe("googleSheetsService", () => {
  it("should call GoogleSpreadsheet constructor with GS_ID", async () => {
    await gsService.getDocument();
    expect(GoogleSpreadsheet).toHaveBeenCalledWith(config.GS_ID);
  });
  it("should use useServiceAccountAuth auth method", async () => {
    await gsService.getDocument();
    expect(
      GoogleSpreadsheet.prototype.useServiceAccountAuth
    ).toHaveBeenCalledWith(config.GS_AUTH);
  });
  it("should load document info", async () => {
    await gsService.getDocument();
    expect(GoogleSpreadsheet.prototype.loadInfo).toHaveBeenCalled();
  });
});
