// eslint-disable-next-line @typescript-eslint/no-var-requires
const { GoogleSpreadsheet } = require("google-spreadsheet");
import * as gsUtils from "./googleSheetsUtils";
import config from "../config";
import { toPromise } from "../utils/mockData";

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
      ).toHaveBeenCalled();
    });
    it("should load document info", async () => {
      await gsUtils.getDocument();
      expect(GoogleSpreadsheet.prototype.loadInfo).toHaveBeenCalled();
    });
  });
  describe("Funcs using getDocument", () => {
    let getDocumentSpy: jest.SpyInstance;
    const sheetGetRowsSpy = jest.fn(() => []);

    beforeEach(() => {
      getDocumentSpy = jest
        .spyOn(gsUtils, "getDocument")
        .mockImplementation(() =>
          toPromise({
            sheetsById: {
              0: { getRows: sheetGetRowsSpy },
            },
          } as any)
        );
    });

    afterEach(() => {
      getDocumentSpy.mockRestore();
    });

    describe("getSheetAndRows", () => {
      it("should call getSheetAndRows and getRows", async () => {
        await gsUtils.getSheetAndRows("raceCalendar");
        expect(getDocumentSpy).toHaveBeenCalled();
        expect(sheetGetRowsSpy).toHaveBeenCalled();
      });
      it("should return an object with sheet and rows props", async () => {
        const res = await gsUtils.getSheetAndRows("raceCalendar");
        expect(res).toHaveProperty("sheet");
        expect(res).toHaveProperty("rows");
      });
    });
  });
});
