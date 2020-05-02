import { DataIntegrityError } from "../../utils/errors";
import {
  isString,
  isNumber,
  parseString,
  parseEventId,
  parseNumericBoolean,
} from "../helpers";
import { RaceGroup, IDriverSeasonRaceData } from "../../types";

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

export const parseHeatPositions = (positions: Array<any>): Array<number> => {
  positions.forEach(pos => {
    if (!isNumber(pos)) {
      throw new DataIntegrityError("Invalid position: " + pos);
    }
  });

  return positions.map(pos => Number(pos));
};

export const getHeatPositions = (driverData: any): Array<any> => {
  const posArr: Array<any> = [];
  Object.getOwnPropertyNames(driverData).forEach((prop: string) => {
    if (prop.startsWith("pos")) {
      driverData[prop] && posArr.push(driverData[prop]);
    }
  });
  return posArr;
};

export const toIDriverSeasonRaceData = (
  driverData: any
): IDriverSeasonRaceData => {
  return {
    driverId: parseDriverId(driverData.driverId),
    driverName: parseString(driverData.driverName, "driverName"),
    eventId: parseEventId(driverData.eventId, "eventId"),
    isReady: parseNumericBoolean(driverData.isReady, "isReady"),
    isProcessed: parseNumericBoolean(driverData.isProcessed, "isProcessed"),
    qTime: parseLapTime(driverData.qTime),
    group: parseGroup(driverData.group),
    heatPositions: parseHeatPositions(getHeatPositions(driverData)),
  };
};

export const toDriverRaceDetails = (
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
