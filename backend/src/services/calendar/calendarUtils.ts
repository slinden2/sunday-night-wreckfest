import {
  parseEventId,
  parseNumericBoolean,
  parseDate,
  parseString,
  parseNumber,
  parseVideos,
  parseMarkdown,
} from "../helpers";
import { IRaceCalendarEvent } from "../../types";

export const toRaceCalendarEvents = (
  rawRows: any
): Array<IRaceCalendarEvent> => {
  const cleanRows: Array<IRaceCalendarEvent> = [];

  rawRows.forEach((row: any) => {
    const event: IRaceCalendarEvent = {
      seasonId: parseEventId(row.seasonId, "seasonId"),
      seasonName: parseString(row.seasonName, "seasonName"),
      eventId: parseEventId(row.eventId, "eventId"),
      isReady: parseNumericBoolean(row.isReady, "isReady"),
      isCompleted: parseNumericBoolean(row.isCompleted, "isCompleted"),
      isProcessed: parseNumericBoolean(row.isProcessed, "isProcessed"),
      hasPowerLimit: parseNumericBoolean(row.hasPowerLimit, "hasPowerLimit"),
      date: parseDate(row.date),
      trackName: parseString(row.trackName, "trackName"),
      qLaps: parseNumber(row.qLaps, "qLaps"),
      raceLaps: parseNumber(row.raceLaps, "raceLaps"),
      ...(row.videos ? { videos: parseVideos(row.videos) } : null),
      ...(row.writtenResults
        ? {
            writtenResults: parseMarkdown(row.writtenResults, "writtenResults"),
          }
        : null),
    };

    cleanRows.push(event);
  });

  return cleanRows;
};
