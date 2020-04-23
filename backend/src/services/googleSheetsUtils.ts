import { DataIntegrityError } from "../utils/errors";

export interface RaceCalendarEvent {
  eventId: string;
  isReady: boolean;
  isCompleted: boolean;
  date: string;
  trackName: string;
  qLaps: number;
  raceLaps: number;
}

export const isString = (param: any): param is string => {
  return typeof param === "string" || param instanceof String;
};

export const parseEventId = (eventId: string): string => {
  if (!eventId || !isString(eventId) || eventId.length !== 4) {
    throw new DataIntegrityError("Invalid or missing eventId: " + eventId);
  }

  return eventId;
};

export const isNumber = (param: any): param is number => {
  return !isNaN(Number(param)) && typeof param !== "boolean";
};

export const parseNumericBoolean = (param: string, field: string): boolean => {
  if (
    !param ||
    !isNumber(param) ||
    (Number(param) !== 0 && Number(param) !== 1)
  ) {
    throw new DataIntegrityError(`Invalid or missing ${field}: ${param}`);
  }

  return Boolean(Number(param));
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const parseDate = (date: string): string => {
  if (!date || !isString) {
    throw new DataIntegrityError(
      "Date is not a string or it is missing date: " + date
    );
  }

  const newDate = date
    .split(".")
    .map(item => {
      if (item.length < 2) {
        return item.padStart(2, "0");
      } else {
        return item;
      }
    })
    .reverse()
    .join("-");

  const [year, month, days] = newDate.split("-");

  if (
    !isDate(newDate) ||
    year.length !== 4 ||
    month.length !== 2 ||
    days.length !== 2
  ) {
    throw new DataIntegrityError(
      "Incorrect date format. Must be DD-MM-YYY: " + date
    );
  }

  return newDate;
};

export const parseString = (str: any, field: string): string => {
  if (!str || !isString(str)) {
    throw new DataIntegrityError(`Invalid or missing ${field}: ${str}`);
  }

  return str;
};

export const parseLaps = (laps: any, field: string): number => {
  if (!laps || !isNumber(laps)) {
    throw new DataIntegrityError(`Invalid or missing ${field}: ${laps}`);
  }

  return Number(laps);
};

export const toRaceCalendarEvents = (
  rawRows: any
): Array<RaceCalendarEvent> => {
  const cleanRows: Array<RaceCalendarEvent> = [];

  rawRows.forEach((row: any) => {
    const event: RaceCalendarEvent = {
      eventId: parseEventId(row.eventId),
      isReady: parseNumericBoolean(row.isReady, "isReady"),
      isCompleted: parseNumericBoolean(row.isCompleted, "isCompleted"),
      date: parseDate(row.date),
      trackName: parseString(row.trackName, "trackName"),
      qLaps: parseLaps(row.qLaps, "qLaps"),
      raceLaps: parseLaps(row.raceLaps, "raceLaps"),
    };

    cleanRows.push(event);
  });

  return cleanRows;
};
