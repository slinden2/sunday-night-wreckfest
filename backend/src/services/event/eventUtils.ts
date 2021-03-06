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
import { GoogleSpreadsheetRow } from "google-spreadsheet";

// Gets heat positions from a stat row (cols prefixed with pos) and
// converts them into an array
export const getHeatPositions = (
  driverData: GoogleSpreadsheetRow
): Array<number> => {
  const posArr: Array<number> = [];
  Object.getOwnPropertyNames(driverData).forEach((prop: string) => {
    if (prop.startsWith("pos")) {
      driverData[prop] && posArr.push(driverData[prop]);
    }
  });
  return posArr;
};

// Parses eventDetails rows
export const toIDriverSeasonRaceData = (
  driverData: GoogleSpreadsheetRow
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

// Parses eventDetails of a speficic event
export const toDriverRaceDetails = (
  eventId: string,
  rawRows: GoogleSpreadsheetRow[]
): IDriverSeasonRaceData[] => {
  const cleanRows: IDriverSeasonRaceData[] = [];

  rawRows
    .filter(row => row.eventId === eventId)
    .forEach(row => {
      const driverDetail = toIDriverSeasonRaceData(row);
      cleanRows.push(driverDetail);
    });

  return cleanRows;
};

// Get draw situtations within an event
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

// Parses seasons rows
export const toSeasonDetails = (
  id: string,
  seasonData: GoogleSpreadsheetRow[]
): ISeasonData | undefined => {
  const rawSeason = seasonData.find(season => season.seasonId === id);
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
