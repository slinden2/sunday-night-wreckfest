import { getSheetAndRows } from "../googleSheetsUtils";
import { toRaceCalendarEvents } from "./calendarUtils";
import { RaceCalendarEvent } from "../../types";

export const getRaceCalendar = async (): Promise<RaceCalendarEvent[]> => {
  const raceCalendar = await getSheetAndRows("raceCalendar");
  const raceCalendarEvents = toRaceCalendarEvents(raceCalendar.rows);
  return raceCalendarEvents;
};

export const setIsProcessedTrue = async (eventId: string) => {
  const raceCalendar = await getSheetAndRows("raceCalendar");
  const processedRow = raceCalendar.rows.find(row => row.eventId === eventId);
  processedRow.isProcessed = "1";
  await processedRow.save();
};

export default {
  getRaceCalendar,
  setIsProcessedTrue,
};
