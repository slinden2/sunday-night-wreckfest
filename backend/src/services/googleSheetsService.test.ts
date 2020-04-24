const { GoogleSpreadsheet } = require("google-spreadsheet");
import * as gsService from "./googleSheetsService";
import config from "../config";

jest.mock("google-spreadsheet");

describe("googleSheetsService", () => {
  it("should call GoogleSpreadsheet constructor with GS_ID", () => {
    gsService.getDocument();
    expect(GoogleSpreadsheet).toHaveBeenCalledWith(config.GS_ID);
  });
  it("should use useServiceAccountAuth auth method", () => {
    gsService.getDocument();
    expect(
      GoogleSpreadsheet.prototype.useServiceAccountAuth
    ).toHaveBeenCalledWith(config.GS_AUTH);
  });
  it("should load document info", () => {
    gsService.getDocument();
    expect(GoogleSpreadsheet.prototype.loadInfo).toHaveBeenCalled();
  });
});
