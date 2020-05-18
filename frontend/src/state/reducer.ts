import { ISeason, IRaceCalendarEvent } from "../types";
import { State } from "./state";
import { calendarToSeasons } from "../utils";

export type Action = {
  type: "SET_CALENDAR";
  payload: ISeason[];
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_CALENDAR":
      return { ...state, calendar: action.payload };
  }
};

export const setCalendar = (calendar: IRaceCalendarEvent[]): Action => {
  const seasons = calendarToSeasons(calendar);

  return {
    type: "SET_CALENDAR",
    payload: seasons,
  };
};
