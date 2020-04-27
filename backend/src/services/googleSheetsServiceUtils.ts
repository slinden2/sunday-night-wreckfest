/* 
Utility functions used by more than one files.
*/

import { DataIntegrityError } from "../utils/errors";

export const isString = (param: any): param is string => {
  return typeof param === "string" || param instanceof String;
};

export const parseEventId = (eventId: string): string => {
  if (!eventId || !isString(eventId) || eventId.length !== 4) {
    throw new DataIntegrityError("Invalid or missing eventId: " + eventId);
  }

  return eventId;
};

export const parseString = (str: any, field: string): string => {
  if (!str || !isString(str)) {
    throw new DataIntegrityError(`Invalid or missing ${field}: ${str}`);
  }

  return str;
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
