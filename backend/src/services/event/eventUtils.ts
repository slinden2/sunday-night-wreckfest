import {
  parseString,
  parseEventId,
  parseNumericBoolean,
  parseDriverId,
  parseLapTime,
  parseGroup,
  parseHeatPositions,
  parseNumber,
} from "../helpers";
import { IDriverSeasonRaceData } from "../../types";
import { getSumOfArrayElements } from "../../utils/misc";
import config from "../../config";

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
  const drawPosition = driverData.drawPosition
    ? driverData.drawPosition === config.CHECK_DRAW_TEXT
      ? undefined
      : parseNumber(driverData.drawPosition, "drawPosition")
    : undefined;

  return {
    driverId: parseDriverId(driverData.driverId),
    driverName: parseString(driverData.driverName, "driverName"),
    eventId: parseEventId(driverData.eventId, "eventId"),
    isReady: parseNumericBoolean(driverData.isReady, "isReady"),
    isProcessed: parseNumericBoolean(driverData.isProcessed, "isProcessed"),
    qTime: parseLapTime(driverData.qTime),
    group: parseGroup(driverData.group),
    heatPositions: parseHeatPositions(getHeatPositions(driverData)),
    drawPosition,
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

export const getDraws = (data: IDriverSeasonRaceData[]): typeof data => {
  const draws: typeof data = [];
  for (let i = 0; i < data.length - 1; i++) {
    if (
      getSumOfArrayElements(data[i].heatPoints) ===
      getSumOfArrayElements(data[i + 1].heatPoints)
    ) {
      draws.push(data[i + 1]);
      if (!draws.includes(data[i])) {
        draws.push(data[i]);
      }
    }
  }
  return draws;
};
