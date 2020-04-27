import { DataIntegrityError } from "../utils/errors";
import {
  isString,
  isNumber,
  parseString,
  parseEventId,
  parseNumericBoolean,
} from "./googleSheetsServiceUtils";

export enum RaceGroup {
  A = "A",
  B = "B",
  C = "C",
}

export enum EventType {
  Season = "Season",
}

export interface IHeatPositions {
  heat1: number;
  heat2: number;
  heat3: number;
  heat4: number;
  heat5: number;
  heat6?: number;
}

export interface IBaseDriverRaceData {
  driverId: string;
  driverName: string;
  eventId: string;
  isReady: boolean;
  isProcessed: boolean;
}

export interface IDriverSeasonRaceData extends IBaseDriverRaceData {
  qTime: string;
  group: RaceGroup;
  racePositions: IHeatPositions;
}

export const isNumeric = (str: string): boolean => {
  return /^\d+$/.test(str);
};

export const parseDriverId = (driverId: any): string => {
  if (
    !driverId ||
    !isString(driverId) ||
    !isNumeric(driverId) ||
    !(driverId.length === 4)
  ) {
    throw new DataIntegrityError("Invalid or missing driverId: " + driverId);
  }

  return driverId;
};

export const isLapTime = (time: any): boolean => {
  return /^\d{2}:\d{2},\d{3}$/.test(time);
};

export const parseLapTime = (time: any): string => {
  if (!time || !isString(time) || !isLapTime(time)) {
    throw new DataIntegrityError("Invalid or missing qTime: " + time);
  }

  return time;
};

const isRaceGroup = (group: any): group is RaceGroup => {
  return Object.values(<any>RaceGroup).includes(group);
};

export const parseGroup = (group: any): RaceGroup => {
  if (!group || !isRaceGroup(group)) {
    throw new DataIntegrityError("Invalid or missing group: " + group);
  }

  return group;
};

export const parseRacePosition = (position: any): number => {
  if (!position || !isNumber(position)) {
    throw new DataIntegrityError("Invalid or missing position: " + position);
  }

  return Number(position);
};

export const toIDriverSeasonRaceData = (
  driverData: any
): IDriverSeasonRaceData => {
  const hasHeat6 = driverData.posHeat6 ? true : false;

  return {
    driverId: parseDriverId(driverData.driverId),
    driverName: parseString(driverData.driverName, "driverName"),
    eventId: parseEventId(driverData.eventId),
    isReady: parseNumericBoolean(driverData.isReady, "isReady"),
    isProcessed: parseNumericBoolean(driverData.isProcessed, "isProcessed"),
    qTime: parseLapTime(driverData.qTime),
    group: parseGroup(driverData.group),
    racePositions: {
      heat1: parseRacePosition(driverData.posHeat1),
      heat2: parseRacePosition(driverData.posHeat2),
      heat3: parseRacePosition(driverData.posHeat3),
      heat4: parseRacePosition(driverData.posHeat4),
      heat5: parseRacePosition(driverData.posHeat5),
      heat6: hasHeat6 ? parseRacePosition(driverData.posHeat6) : undefined,
    },
  };
};

export const toRaceDetails = (
  eventId: string,
  rawRows: any
): IDriverSeasonRaceData[] => {
  const cleanRows: IDriverSeasonRaceData[] = [];
  typeof cleanRows;

  rawRows
    .filter((row: any) => row.eventId === eventId)
    .forEach((row: any) => {
      const driverDetail = toIDriverSeasonRaceData(row);
      cleanRows.push(driverDetail);
    });

  return cleanRows;
};
