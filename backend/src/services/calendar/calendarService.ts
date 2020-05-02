import { getSheetAndRows } from "../googleSheetsUtils";
import { toRaceCalendarEvents } from "./calendarUtils";
import { RaceCalendarEvent } from "../../types";

export const getRaceCalendar = async (): Promise<RaceCalendarEvent[]> => {
  const raceCalendar = await getSheetAndRows("raceCalendar");
  const raceCalendarEvents = toRaceCalendarEvents(raceCalendar.rows);
  return raceCalendarEvents;
};

export default {
  getRaceCalendar,
};
