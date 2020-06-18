import { getSheetAndRows } from "../googleSheetsUtils";
import { toRaceCalendarEvents } from "./calendarUtils";
import { IRaceCalendarEvent } from "../../types";

// Gets calendar sheet and parses the rows
export const getRaceCalendar = async (): Promise<IRaceCalendarEvent[]> => {
  const raceCalendar = await getSheetAndRows("raceCalendar");
  const raceCalendarEvents = toRaceCalendarEvents(raceCalendar.rows);
  return raceCalendarEvents;
};

// Sets event to isProcessed 1 after standings calculation
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
