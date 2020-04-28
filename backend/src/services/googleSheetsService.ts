const { GoogleSpreadsheet } = require("google-spreadsheet");

import config from "../config";
import {
  toRaceCalendarEvents,
  RaceCalendarEvent,
} from "./getRaceCalendarUtils";
import { toDriverRaceDetails } from "./getDriverRaceDetailsUtils";
import { IDriverSeasonRaceData } from "../types";

export const getDocument = async () => {
  const doc = new GoogleSpreadsheet(config.GS_ID);
  await doc.useServiceAccountAuth(config.GS_AUTH);
  await doc.loadInfo();
  return doc;
};

export const getSheetRows = async (id: number) => {
  const doc = await getDocument();
  const sheet = doc.sheetsById[id];
  const rows = await sheet.getRows();
  return rows;
};

export const getRaceCalendar = async (): Promise<RaceCalendarEvent[]> => {
  const rawRows = await getSheetRows(0);
  const raceCalendarEvents = toRaceCalendarEvents(rawRows);
  return raceCalendarEvents;
};

export const getDriverRaceDetails = async (
  id: string
): Promise<IDriverSeasonRaceData[]> => {
  const rawRows = await getSheetRows(1495986400);
  const raceDetails = toDriverRaceDetails(id, rawRows);
  return raceDetails;
};

export default {
  getRaceCalendar,
};
