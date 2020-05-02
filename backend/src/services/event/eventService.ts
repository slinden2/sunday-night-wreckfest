import { toDriverRaceDetails } from "./eventUtils";
import { getSheetAndRows } from "../googleSheetsUtils";
import { IDriverSeasonRaceData } from "../../types";
import Race from "../race";

export const getRaceData = async (
  id: string
): Promise<IDriverSeasonRaceData[]> => {
  const eventDetails = await getSheetAndRows("eventDetails");
  const driverRaceDetails = toDriverRaceDetails(id, eventDetails.rows);
  const raceData = new Race(driverRaceDetails);
  return raceData.getRaceData;
};

export default {
  getRaceData,
};
