const { GoogleSpreadsheet } = require("google-spreadsheet");

import config from "../config";
import {
  toRaceCalendarEvents,
  RaceCalendarEvent,
} from "./getRaceCalendarUtils";
import { toDriverRaceDetails } from "./getDriverRaceDetailsUtils";
import { IDriverSeasonRaceData } from "../types";
import { toRaceData } from "./getRaceDataUtils";
import { addRaceToStandings, updatePowerLimit } from "./updateStandingsUtils";
import { sleep } from "../utils/misc";
import { calendarService } from ".";

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

export const setIsProcessedTrue = async (eventId: string) => {
  const rows: any[] = await getSheetRows(0);
  const processedRow = rows.find(row => row.eventId === eventId);
  processedRow.isProcessed = "1";
  await processedRow.save();
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

export const getRaceData = async (
  id: string
): Promise<IDriverSeasonRaceData[]> => {
  const driverRaceDetails = await getDriverRaceDetails(id);
  const raceData = toRaceData(driverRaceDetails);
  return raceData;
};

export const updateStandings = async (): Promise<void> => {
  const eventList = await calendarService.getRaceCalendar();
  for (const event of eventList) {
    if (event.isReady && event.isCompleted && !event.isProcessed) {
      const raceData = await getRaceData(event.eventId);
      await addRaceToStandings(raceData, {
        hasPowerLimit: event.hasPowerLimit,
      });
      if (event.hasPowerLimit) {
        await updatePowerLimit();
      }
      await setIsProcessedTrue(event.eventId);
      // let's not bombard the API if there are more than 1 races to update
      await sleep(5000);
    }
  }
};

export default {
  getRaceCalendar,
  getRaceData,
  updateStandings,
};
