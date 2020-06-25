/* 
Util functions for interacting with the Google Sheets DB
*/

import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
  GoogleSpreadsheetRow,
} from "google-spreadsheet";
import config from "../config";
import { getSimpleTime, sleep } from "../utils/misc";

// Get the document containing the SNW DB.
export const getDocument = async () => {
  const doc = new GoogleSpreadsheet(config.GS_ID);
  await doc.useServiceAccountAuth(config.GS_CREDENTIALS);
  await doc.loadInfo();
  return doc;
};

interface ISheetMap {
  [field: string]: number;
}

export interface ISheetAndRows {
  sheet: GoogleSpreadsheetWorksheet;
  rows: GoogleSpreadsheetRow[];
}

const sheetMap: ISheetMap = {
  raceCalendar: 0,
  eventDetails: 1495986400,
  standings: 1733156042,
  seasons: 1876267219,
  drivers: 1062100406,
};

// Get a specific sheet meta data and its rows in an object.
export const getSheetAndRows = async (
  sheetName: string
): Promise<ISheetAndRows> => {
  const doc = await getDocument();
  const sheet = doc.sheetsById[sheetMap[sheetName]];
  const rows = await sheet.getRows();

  return { sheet, rows };
};

// Makes a bakcup of a certain sheet.
// Used for example to backing up standings sheet  before updating them.
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

  await sleep(2000);

  // Set the header row of the new sheet as in the old sheet
  await newSheet.setHeaderRow(oldSheet.headerValues);

  // Get old rows and add the raw data into the new sheet
  const rows = await oldSheet.getRows();
  const rawRows = rows.map(row => row._rawData);
  await newSheet.addRows(rawRows);
};
