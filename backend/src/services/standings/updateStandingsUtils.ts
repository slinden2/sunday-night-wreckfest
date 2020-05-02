/* 
Updating functionality for standings sheet of the snw-db.

This is a Typescript file, but the language is not used
in the best possible way as the google-spreadsheet has no types.
*/

import { IDriverSeasonRaceData } from "../../types";
import { parseEventId } from "../helpers";
import { getSheetAndRows } from "../googleSheetsUtils";

export const updateRow = (
  driverRow: any,
  driver: IDriverSeasonRaceData,
  hasPowerLimit: boolean
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

  // Race winner automatically gets a power penalty
  if (hasPowerLimit && driver.seasonPoints === 100) {
    driverRow.powerLimit = "C161";
  } else {
    driverRow.powerLimit = "";
  }

  return driverRow;
};

export const getSeasonId = (eventId: string) => {
  const parsedEventId = parseEventId(eventId, "eventId");
  return parsedEventId.substr(0, 2) + "00";
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
  raceData: IDriverSeasonRaceData[],
  options: {
    hasPowerLimit: boolean;
  }
): Promise<void> => {
  const standings = await getSheetAndRows("standings");

  const newRows: any[] = [];
  const rowsToUpdate: any[] = [];

  for (const driver of raceData) {
    const seasonId = getSeasonId(driver.eventId);
    const driverRow = getDriverRow(seasonId, driver.driverId, standings.rows);

    if (!driverRow) {
      newRows.push({
        seasonId,
        driverId: driver.driverId,
        driverName: driver.driverName,
        points: driver.seasonPoints,
        racesDriven: 1,
        eventIds: driver.eventId,
      });
      continue;
    }

    const updatedDriverRow = updateRow(
      driverRow,
      driver,
      options.hasPowerLimit
    );

    rowsToUpdate.push(updatedDriverRow.save());
  }

  if (process.env.NODE_ENV !== "test") {
    if (newRows.length) {
      await standings.sheet.addRows(newRows);
    }

    if (rowsToUpdate.length) {
      await Promise.all(rowsToUpdate);
    }
  }
};

export const updatePowerLimit = async () => {
  const standings = await getSheetAndRows("standings");
  const rowsOrdered = [...standings.rows].sort(
    (a, b) => Number(b.points) - Number(a.points)
  );

  rowsOrdered[0].powerLimit = "C155";
  rowsOrdered[1].powerLimit = "C158";
  rowsOrdered[2].powerLimit = "C161";

  const rowsToUpdate = [
    rowsOrdered[0].save(),
    rowsOrdered[1].save(),
    rowsOrdered[2].save(),
  ];

  await Promise.all(rowsToUpdate);
};
