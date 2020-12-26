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
import { GoogleSpreadsheetRow } from "google-spreadsheet";

// Parses a calendar row and converts it to the correct type
export const toRaceCalendarEvents = (
  rawRows: GoogleSpreadsheetRow[]
): Array<IRaceCalendarEvent> => {
  const cleanRows: Array<IRaceCalendarEvent> = [];

  rawRows.forEach((row) => {
    const event: IRaceCalendarEvent = {
      seasonId: parseEventId(row.seasonId, "seasonId"),
      seasonName: parseString(row.seasonName, "seasonName"),
      eventId: parseEventId(row.eventId, "eventId"),
      isReady: parseNumericBoolean(row.isReady, "isReady"),
      isCompleted: parseNumericBoolean(row.isCompleted, "isCompleted"),
      isProcessed: parseNumericBoolean(row.isProcessed, "isProcessed"),
      drawsChecked: parseNumericBoolean(row.drawsChecked, "drawsChecked"),
      hasPowerLimit: parseNumericBoolean(row.hasPowerLimit, "hasPowerLimit"),
      date: parseDate(row.date),
      trackName: parseString(row.trackName, "trackName"),
      ...(row.trackName2
        ? { trackName2: parseString(row.trackName2, "trackName2") }
        : null),
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
