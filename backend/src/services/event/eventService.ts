import { toDriverRaceDetails } from "./eventUtils";
import { getSheetAndRows } from "../googleSheetsUtils";
import {
  IDriverSeasonRaceData,
  RaceCalendarEvent,
  IRaceDetails,
} from "../../types";
import Race from "../race";

export const getRaceData = async (
  id: string
): Promise<IDriverSeasonRaceData[]> => {
  const eventDetails = await getSheetAndRows("eventDetails");
  const driverRaceDetails = toDriverRaceDetails(id, eventDetails.rows);
  const raceData = new Race(driverRaceDetails);
  return raceData.getRaceData;
};

export const mergeRaceData = (
  id: string,
  calendar: RaceCalendarEvent[],
  raceData: IDriverSeasonRaceData[]
): IRaceDetails => {
  const race = calendar.find(event => event.eventId === id);

  if (!race) {
    throw new Error("No races found with given id");
  }

  return { ...race, details: raceData };
};

export default {
  getRaceData,
  mergeRaceData,
};
