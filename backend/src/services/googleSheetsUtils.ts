export interface RaceCalendarEvent {
  eventId: string;
  isReady: boolean;
  isCompleted: boolean;
  date: string;
  trackName: string;
  qLaps: number;
  raceLaps: number;
}

const isString = (param: any): param is string => {
  return typeof param === "string" || param instanceof String;
};

const parseEventId = (eventId: string): string => {
  if (!eventId || !isString(eventId) || eventId.length !== 4) {
    throw new Error("Invalid or missing eventId: " + eventId);
  }

  return eventId;
};

const isNumber = (param: any): param is number => {
  return !isNaN(Number(param));
};

const parseNumericBoolean = (param: number, field: string): boolean => {
  if (
    !param ||
    !isNumber(param) ||
    (Number(param) !== 0 && Number(param) !== 1)
  ) {
    throw new Error(`Invalid or missing ${field}: ${param}`);
  }

  return Boolean(Number(param));
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: string): string => {
  if (!date || !isString) {
    throw new Error("Date is not a string or it is missing date: " + date);
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

  if (!isDate(newDate)) {
    throw new Error("Incorrect date format. Must be DD-MM-YYY: " + date);
  }

  return newDate;
};

const parseString = (str: string, field: string): string => {
  if (!str || !isString(str)) {
    throw new Error(`Invalid or missing ${field}: ${str}`);
  }

  return str;
};

const parseLaps = (laps: number, field: string): number => {
  if (!laps || !isNumber(laps)) {
    throw new Error(`Invalid or missing ${field}: ${laps}`);
  }

  return laps;
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
