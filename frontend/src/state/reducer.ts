import {
  ISeason,
  IRaceCalendarEvent,
  IRaceDetails,
  IStandingRow,
  Team,
} from "../types";
import { State } from "./state";
import { calendarToSeasons } from "../utils";

export type Action =
  | {
      type: "SET_CALENDAR";
      payload: ISeason[];
    }
  | {
      type: "SET_RACES";
      payload: IRaceDetails;
    }
  | {
      type: "SET_STANDINGS";
      payload: IStandingRow[];
    }
  | {
      type: "SET_TEAMS";
      payload: Team[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_CALENDAR":
      return { ...state, calendar: action.payload };
    case "SET_RACES": {
      const raceExists = state.races.find(
        race => race.eventId === action.payload.eventId
      );
      if (raceExists) return state;
      return { ...state, races: [...state.races, action.payload] };
    }
    case "SET_STANDINGS":
      return { ...state, standings: action.payload };
    case "SET_TEAMS":
      return { ...state, teams: action.payload };
    default:
      return state;
  }
};

export const setCalendar = (calendar: IRaceCalendarEvent[]): Action => {
  const seasons = calendarToSeasons(calendar);

  return {
    type: "SET_CALENDAR",
    payload: seasons,
  };
};

export const setRaces = (race: IRaceDetails): Action => {
  return {
    type: "SET_RACES",
    payload: race,
  };
};

export const setStandings = (standings: IStandingRow[]): Action => {
  return {
    type: "SET_STANDINGS",
    payload: standings,
  };
};

export const setTeams = (teams: Team[]): Action => {
  return {
    type: "SET_TEAMS",
    payload: teams,
  };
};
