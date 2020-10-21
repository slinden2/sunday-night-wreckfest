import { getSheetAndRows } from "../googleSheetsUtils";
import { Info } from "../../types";
import { toInfo } from "./infoUtils";

// Gets info rows from the info sheet
export const getInfo = async (): Promise<Info[]> => {
  const infoRows = await getSheetAndRows("info");
  const info = toInfo(infoRows.rows).reverse();
  return info;
};

export default {
  getInfo,
};
