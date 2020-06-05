import {
  parseString,
  parseEventId,
  parseNumericBoolean,
  parseDriverId,
  parseLapTime,
  parseGroup,
  parseHeatPositions,
  parseNumber,
  parseMods,
  parseCars,
  parseMarkdown,
} from "../helpers";
import { IDriverSeasonRaceData, ISeasonData } from "../../types";
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

export const toSeasonDetails = (
  id: string,
  seasonData: any
): ISeasonData | undefined => {
  const rawSeason = seasonData.find((season: any) => season.seasonId === id);
  if (!rawSeason) {
    return undefined;
  }

  return {
    seasonId: parseEventId(rawSeason.seasonId, "seasonId"),
    seasonName: parseString(rawSeason.seasonName, "seasonName"),
    description: parseMarkdown(rawSeason.description, "description"),
    ...(rawSeason.cars
      ? {
          cars: parseCars(rawSeason.cars),
        }
      : null),
    ...(rawSeason.mods ? { mods: parseMods(rawSeason.mods) } : null),
  };
};
