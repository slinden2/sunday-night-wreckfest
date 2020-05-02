import {
  parseEventId,
  parseNumericBoolean,
  parseDate,
  parseString,
  parseNumber,
} from "../helpers";
import { RaceCalendarEvent } from "../../types";

export const toRaceCalendarEvents = (
  rawRows: any
): Array<RaceCalendarEvent> => {
  const cleanRows: Array<RaceCalendarEvent> = [];

  rawRows.forEach((row: any) => {
    const event: RaceCalendarEvent = {
      eventId: parseEventId(row.eventId, "eventId"),
      isReady: parseNumericBoolean(row.isReady, "isReady"),
      isCompleted: parseNumericBoolean(row.isCompleted, "isCompleted"),
      isProcessed: parseNumericBoolean(row.isProcessed, "isProcessed"),
      hasPowerLimit: parseNumericBoolean(row.hasPowerLimit, "hasPowerLimit"),
      date: parseDate(row.date),
      trackName: parseString(row.trackName, "trackName"),
      qLaps: parseNumber(row.qLaps, "qLaps"),
      raceLaps: parseNumber(row.raceLaps, "raceLaps"),
    };

    cleanRows.push(event);
  });

  return cleanRows;
};
