const { GoogleSpreadsheet } = require("google-spreadsheet");

import config from "../config";

export const getDocument = async () => {
  const doc = new GoogleSpreadsheet(config.GS_ID);
  await doc.useServiceAccountAuth(config.GS_AUTH);
  await doc.loadInfo();
  return doc;
};

interface ISheetMap {
  [field: string]: number;
}

interface ISheetAndRows {
  sheet: any;
  rows: any[];
}

const sheetMap: ISheetMap = {
  raceCalendar: 0,
  eventDetails: 1495986400,
  standings: 1733156042,
};

export const getSheetAndRows = async (
  sheetName: string
): Promise<ISheetAndRows> => {
  const doc = await getDocument();
  const sheet = doc.sheetsById[sheetMap[sheetName]];
  const rows = await sheet.getRows();

  return { sheet, rows };
};
