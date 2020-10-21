import { GoogleSpreadsheetRow } from "google-spreadsheet";
import { Info } from "../../types";
import { parseInfoId, parseMarkdown } from "../helpers";

// Parse info rows from the sheet
export const toInfo = (rawRows: GoogleSpreadsheetRow[]): Info[] => {
  const cleanRows: Info[] = [];

  rawRows.forEach((row) => {
    const info: Info = {
      id: parseInfoId(row.infoId),
      text: parseMarkdown(row.text, "text"),
    };
    cleanRows.push(info);
  });

  return cleanRows;
};
