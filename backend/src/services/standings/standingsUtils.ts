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
  driverId: string;
  driverName: string;
  racesDriven: number;
  points: number;
  powerLimit?: string;
  eventIds: string[];
}

export const toStandingRows = (rawRows: any[]): IStandingRow[] => {
  const cleanRows: IStandingRow[] = [];

  rawRows.forEach(row => {
    const driver: IStandingRow = {
      seasonId: parseEventId(row.seasonId, "seasonId"),
      driverId: parseDriverId(row.driverId),
      driverName: parseString(row.driverName, "driverName"),
      racesDriven: parseNumber(row.racesDriven, "racesDriven"),
      points: parseNumber(row.points, "points"),
      powerLimit: parsePowerLimit(row.powerLimit),
      eventIds: parseEventIds(row.eventIds),
    };
    cleanRows.push(driver);
  });

  return cleanRows;
};
