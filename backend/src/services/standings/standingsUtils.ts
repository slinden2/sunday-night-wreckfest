import {
  parseEventId,
  parseString,
  parsePowerLimit,
  parseEventIds,
  parseDriverId,
  parseNumber,
} from "../helpers";
import { GoogleSpreadsheetRow } from "google-spreadsheet";

export interface IStandingRow {
  seasonId: string;
  seasonName: string;
  driverId: string;
  driverName: string;
  teamName?: string;
  racesDriven: number;
  points: number;
  drawPosition?: number;
  powerLimit?: string;
  eventIds: string[];
}

// Convert standings raw data to IStandingRow type
export const toStandingRows = (
  rawRows: GoogleSpreadsheetRow[]
): IStandingRow[] => {
  const cleanRows: IStandingRow[] = [];

  rawRows.forEach((row) => {
    const drawPosition = row.drawPosition
      ? parseNumber(row.drawPosition, "drawPosition")
      : undefined;

    const driver: IStandingRow = {
      seasonId: parseEventId(row.seasonId, "seasonId"),
      seasonName: parseString(row.seasonName, "seasonName"),
      driverId: parseDriverId(row.driverId),
      driverName: parseString(row.driverName, "driverName"),
      racesDriven: parseNumber(row.racesDriven, "racesDriven"),
      points: parseNumber(row.points, "points"),
      drawPosition,
      powerLimit: parsePowerLimit(row.powerLimit),
      eventIds: parseEventIds(row.eventIds),
      ...(row.teamName && { teamName: parseString(row.teamName, "teamName") }),
    };
    cleanRows.push(driver);
  });

  return cleanRows;
};
