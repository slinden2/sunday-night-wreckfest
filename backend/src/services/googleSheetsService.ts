const { GoogleSpreadsheet } = require("google-spreadsheet");

import config from "../config";
import {
  toRaceCalendarEvents,
  RaceCalendarEvent,
} from "./getRaceCalendarUtils";

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

export default {
  getRaceCalendar,
};
