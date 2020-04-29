import { IDriverSeasonRaceData } from "../types";
import Race from "./race";

export const toRaceData = (driverData: IDriverSeasonRaceData[]) => {
  console.log(driverData);
  const raceData = new Race(driverData);
  return raceData.getRaceData;
};
