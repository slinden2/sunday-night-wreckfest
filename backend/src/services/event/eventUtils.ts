import {
  parseString,
  parseEventId,
  parseNumericBoolean,
  parseDriverId,
  parseLapTime,
  parseGroup,
  parseHeatPositions,
} from "../helpers";
import { IDriverSeasonRaceData } from "../../types";

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
