import { Driver, Team } from "../../types";
import { parseDriverId, parseString } from "../helpers";

export const toDriver = (rawRows: any[]): Driver[] => {
  const cleanRows: Driver[] = [];

  rawRows.forEach(row => {
    const driver: Driver = {
      id: parseDriverId(row.driverId),
      name: parseString(row.driverName, "driverName"),
      ...(row.team ? { team: parseString(row.team, "team") } : null),
    };
    cleanRows.push(driver);
  });

  return cleanRows;
};

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
      });
    }

    return acc;
  }, []);

  return driversPerTeam;
};
