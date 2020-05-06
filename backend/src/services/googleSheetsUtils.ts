const { GoogleSpreadsheet } = require("google-spreadsheet");

import config from "../config";
import { getSimpleTime } from "../utils/misc";

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

export const makeBackup = async (sheetName: string) => {
  const doc = await getDocument();

  // Load sheet to be backed up
  const oldSheet = doc.sheetsById[sheetMap[sheetName]];
  await oldSheet.loadHeaderRow();

  // Add a new sheet
  const newSheet = await doc.addSheet();
  newSheet.updateProperties({
    title: `${sheetName} ${getSimpleTime()}`,
  });

  // Set the header row of the new sheet as in the old sheet
  await newSheet.setHeaderRow(oldSheet.headerValues);

  // Get old rows and add the raw data into the new sheet
  const rows = await oldSheet.getRows();
  const rawRows = rows.map((row: any) => row._rawData);
  await newSheet.addRows(rawRows);
};
