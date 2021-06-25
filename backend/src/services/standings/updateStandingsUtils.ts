/* 
Updating functionality for standings sheet of the snw-db.

This is a Typescript file, but the language is not used
in the best possible way as the google-spreadsheet has no types.
*/

import {
  IDriverSeasonRaceData,
  IRaceCalendarEvent,
  DriverAndTeam,
} from "../../types";
import { getSheetAndRows } from "../googleSheetsUtils";
import config from "../../config";
import { GoogleSpreadsheetRow } from "google-spreadsheet";

// Updates the points of an existing standings row and adds the
// corrisponding event to the event string
export const updateRow = (
  driverRow: GoogleSpreadsheetRow,
  driver: IDriverSeasonRaceData
) => {
  driverRow.points = Number(driverRow.points);
  driverRow.points += Number(driver.seasonPoints);

  const previousRaceIds = driverRow.eventIds.split(";");

  if (previousRaceIds.includes(driver.eventId)) {
    throw new Error(
      `Duplicate eventId: ${driver.eventId}. The race has already been registered.`
    );
  }

  const newRaceIds = [...previousRaceIds, driver.eventId];
  driverRow.eventIds = newRaceIds.join(";");

  driverRow.racesDriven = newRaceIds.length;

  return driverRow;
};

// Get row by season and driver ids
export const getDriverRow = (
  seasonId: string,
  driverId: string,
  rows: GoogleSpreadsheetRow[]
) => {
  return rows.find(
    (row) => row.driverId === driverId && row.seasonId === seasonId
  );
};

// Handles the insertion of a new race into the standings sheet
// either by creating a new row or updating an existing one.
export const addRaceToStandings = async (
  event: IRaceCalendarEvent,
  raceData: IDriverSeasonRaceData[]
): Promise<void> => {
  const standings = await getSheetAndRows("standings");
  const drivers = await getSheetAndRows("drivers");

  const driversAndTeams: DriverAndTeam[] = Array.from(drivers.rows).map(
    (r) => ({
      id: r.driverId,
      name: r.driverName,
      teamName: event.hasTeams ? r.team : undefined,
    })
  );

  const newRows: any[] = [];
  const rowsToUpdate: any[] = [];

  for (const driver of raceData) {
    const driverRow = getDriverRow(
      event.seasonId,
      driver.driverId,
      standings.rows
    );

    const driverTeamData = driversAndTeams.find(
      (driverTeam) => driverTeam.id === driver.driverId
    );
    const teamName = driverTeamData?.teamName;

    if (!driverRow) {
      newRows.push({
        seasonId: `'${event.seasonId}`,
        seasonName: event.seasonName,
        driverId: `'${driver.driverId}`,
        driverName: driver.driverName,
        ...(teamName && { teamName }),
        points: driver.seasonPoints,
        racesDriven: 1,
        eventIds: `'${driver.eventId}`,
      });
      continue;
    }

    const updatedDriverRow = updateRow(driverRow, driver);

    rowsToUpdate.push(updatedDriverRow.save());
  }

  if (config.ENV !== "test") {
    if (newRows.length) {
      await standings.sheet.addRows(newRows);
    }

    if (rowsToUpdate.length) {
      await Promise.all(rowsToUpdate);
    }
  }
};

// Updates the power limit after updating the standings for a specific event.
// First three drivers of the standings get power limitations.
// Also if the winner of the previous event is not in top-3, he also
// gets limited power like the third driver of the stadings.
export const updatePowerLimit = async (seasonId: string, winnerId: string) => {
  const standings = await getSheetAndRows("standings");
  const eventRows = [...standings.rows].filter(
    (row) => row.seasonId === seasonId
  );
  const rowsOrdered = eventRows.sort(
    (a, b) => Number(b.points) - Number(a.points)
  );

  const winnerRow = rowsOrdered.find((row) => row.driverId === winnerId);
  if (!winnerRow) {
    throw new Error("updatePowerLimit - No winner found");
  }

  winnerRow.powerLimit = "C161";

  rowsOrdered[0].powerLimit = "C155";
  rowsOrdered[1].powerLimit = "C158";
  rowsOrdered[2].powerLimit = "C161";

  rowsOrdered.slice(3).forEach((row) => {
    if (row.driverId !== winnerId) {
      row.powerLimit = "";
    }
  });

  const rowsToUpdate = rowsOrdered.map((row) => row.save());

  await Promise.all(rowsToUpdate);
};

// Adds update completion time to the standings sheet
export const addUpdateTime = async () => {
  const standings = await getSheetAndRows("standings");
  await standings.sheet.loadCells("M6");
  const cell = standings.sheet.getCellByA1("M6");
  cell.value = new Date().toLocaleString("fi");
  await standings.sheet.saveUpdatedCells();
};
