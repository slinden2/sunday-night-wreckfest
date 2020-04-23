const { GoogleSpreadsheet } = require("google-spreadsheet");

import config from "../config";
import { toRaceCalendarEvents, RaceCalendarEvent } from "./googleSheetsUtils";

const getDocument = async () => {
  const doc = new GoogleSpreadsheet(config.GS_ID);
  await doc.useServiceAccountAuth(config.GS_AUTH);
  await doc.loadInfo();
  return doc;
};

const getRaceCalendar = async (): Promise<RaceCalendarEvent[]> => {
  const doc = await getDocument();
  const sheet = doc.sheetsById[0];
  const rawRows = await sheet.getRows();
  const raceCalendarEvents = toRaceCalendarEvents(rawRows);
  return raceCalendarEvents;
};

export default {
  getRaceCalendar,
};
