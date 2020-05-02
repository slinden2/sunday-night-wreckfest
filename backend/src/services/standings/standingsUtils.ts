import { parseEventId, parseString } from "../helpers";
import { parseDriverId } from "../event/eventUtils";
import { parseNumber } from "../calendar/calendarUtils";
import { DataIntegrityError } from "../../utils/errors";

export interface IStandingRow {
  seasonId: string;
  driverId: string;
  driverName: string;
  racesDriven: number;
  points: number;
  powerLimit?: string;
  eventIds: string[];
}

export const parsePowerLimit = (text: any): string => {
  if (!text) return "";

  if (!/[DCBA]\d{2,3}/.test(text)) {
    throw new DataIntegrityError("Invalid powerLimit: " + text);
  }

  return text;
};

export const parseEventIds = (eventIdsStr: any): string[] => {
  const eventIds: string[] = eventIdsStr.split(";");

  eventIds.forEach(eventId => {
    parseEventId(eventId, "eventId");
  });

  return eventIds;
};

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
