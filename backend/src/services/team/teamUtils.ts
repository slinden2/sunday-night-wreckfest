import { Driver, Team } from "../../types";
import { parseDriverId, parseString } from "../helpers";
import { GoogleSpreadsheetRow } from "google-spreadsheet";

// Parse drivers from drivers sheet
export const toDriver = (rawRows: GoogleSpreadsheetRow[]): Driver[] => {
  const cleanRows: Driver[] = [];

  rawRows.forEach(row => {
    const driver: Driver = {
      id: parseDriverId(row.driverId),
      name: parseString(row.driverName, "driverName"),
      ...(row.team ? { team: parseString(row.team, "team") } : null),
      ...(row.teamLogoUrl
        ? { teamLogoUrl: parseString(row.teamLogoUrl, "teamLogoUrl") }
        : null),
    };
    cleanRows.push(driver);
  });

  return cleanRows;
};

// Get team data from driver rows
export const extractTeamsFromDrivers = (drivers: Driver[]): Team[] => {
  const driversPerTeam = drivers.reduce<Team[]>((acc, cur) => {
    if (!cur.team) return acc;

    const existingTeam = acc.find(team => team.name === cur.team);
    if (existingTeam) {
      existingTeam.driver2 = cur.name;
    } else {
      acc.push({
        name: cur.team,
        driver1: cur.name,
        ...(cur.teamLogoUrl ? { logoUrl: cur.teamLogoUrl } : null),
      });
    }

    return acc;
  }, []);

  return driversPerTeam;
};
