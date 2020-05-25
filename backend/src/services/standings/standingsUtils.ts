import {
  parseEventId,
  parseString,
  parsePowerLimit,
  parseEventIds,
  parseDriverId,
  parseNumber,
} from "../helpers";

export interface IStandingRow {
  seasonId: string;
  seasonName: string;
  driverId: string;
  driverName: string;
  racesDriven: number;
  points: number;
  drawPosition?: number;
  powerLimit?: string;
  eventIds: string[];
}

export const toStandingRows = (rawRows: any[]): IStandingRow[] => {
  const cleanRows: IStandingRow[] = [];

  rawRows.forEach(row => {
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
    };
    cleanRows.push(driver);
  });

  return cleanRows;
};
