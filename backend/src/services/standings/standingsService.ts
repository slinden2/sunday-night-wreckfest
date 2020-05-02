import { getSheetAndRows } from "../googleSheetsUtils";
import { toStandingRows } from "./standingsUtils";

const getStandings = async (seasonId: string) => {
  const standings = await getSheetAndRows("standings");
  const rawRows = standings.rows.filter(row => row.seasonId === seasonId);
  const standingRows = toStandingRows(rawRows);
  return standingRows;
};

export default { getStandings };
