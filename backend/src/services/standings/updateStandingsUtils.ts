/* 
Updating functionality for standings sheet of the snw-db.

This is a Typescript file, but the language is not used
in the best possible way as the google-spreadsheet has no types.
*/

import { IDriverSeasonRaceData, IRaceCalendarEvent } from "../../types";
import { getSheetAndRows } from "../googleSheetsUtils";
import config from "../../config";

export const updateRow = (driverRow: any, driver: IDriverSeasonRaceData) => {
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

export const getDriverRow = (
  seasonId: string,
  driverId: string,
  rows: any[]
) => {
  return rows.find(
    row => row.driverId === driverId && row.seasonId === seasonId
  );
};

export const addRaceToStandings = async (
  event: IRaceCalendarEvent,
  raceData: IDriverSeasonRaceData[]
): Promise<void> => {
  const standings = await getSheetAndRows("standings");

  const newRows: any[] = [];
  const rowsToUpdate: any[] = [];

  for (const driver of raceData) {
    const driverRow = getDriverRow(
      event.seasonId,
      driver.driverId,
      standings.rows
    );

    if (!driverRow) {
      newRows.push({
        seasonId: `'${event.seasonId}`,
        seasonName: event.seasonName,
        driverId: `'${driver.driverId}`,
        driverName: driver.driverName,
        points: driver.seasonPoints,
        racesDriven: 1,
        eventIds: `'${driver.eventId}`,
      });
      continue;
    }

    const updatedDriverRow = updateRow(driverRow, driver);

    rowsToUpdate.push(updatedDriverRow.save({ raw: true }));
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

export const updatePowerLimit = async (seasonId: string, winnerId: string) => {
  const standings = await getSheetAndRows("standings");
  const eventRows = [...standings.rows].filter(
    row => row.seasonId === seasonId
  );
  const rowsOrdered = eventRows.sort(
    (a, b) => Number(b.points) - Number(a.points)
  );

  const winnerRow = rowsOrdered.find(row => row.driverId === winnerId);
  winnerRow.powerLimit = "C161";

  rowsOrdered[0].powerLimit = "C155";
  rowsOrdered[1].powerLimit = "C158";
  rowsOrdered[2].powerLimit = "C161";

  rowsOrdered.slice(3).forEach(row => {
    if (row.driverId !== winnerId) {
      row.powerLimit = "";
    }
  });

  const rowsToUpdate = rowsOrdered.map(row => row.save({ raw: true }));

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
