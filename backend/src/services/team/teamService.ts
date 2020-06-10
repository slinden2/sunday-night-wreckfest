import { getSheetAndRows } from "../googleSheetsUtils";
import { toDriver, extractTeamsFromDrivers } from "./teamUtils";
import { Team } from "../../types";

export const getTeams = async (): Promise<Team[]> => {
  const driverSheet = await getSheetAndRows("drivers");
  const drivers = toDriver(driverSheet.rows);
  const teams = extractTeamsFromDrivers(drivers).sort((a, b) =>
    a.name > b.name ? 1 : -1
  );
  return teams;
};

export default {
  getTeams,
};
