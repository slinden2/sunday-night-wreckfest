import { IDriverSeasonRaceData } from "../types";
import Race from "./race";

export const toRaceData = (driverData: IDriverSeasonRaceData[]) => {
  const raceData = new Race(driverData);
  return raceData.getRaceData;
};
