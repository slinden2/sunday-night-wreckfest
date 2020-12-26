import { getSheetAndRows, makeBackup } from "../googleSheetsUtils";
import { IStandingRow, toStandingRows } from "./standingsUtils";
import { calendarService, eventService } from "..";
import {
  addRaceToStandings,
  updatePowerLimit,
  addUpdateTime,
} from "./updateStandingsUtils";
import { sleep } from "../../utils/misc";
import config from "../../config";

// Get standings data
const getStandings = async () => {
  const standings = await getSheetAndRows("standings");
  const standingRows = toStandingRows(standings.rows);
  return standingRows;
};

// Update standings if new complete data available in eventDetails
export const updateStandings = async (): Promise<void> => {
  const eventList = await calendarService.getRaceCalendar();
  for (const event of eventList) {
    // If new data available
    if (event.isReady && event.isCompleted && !event.isProcessed) {
      await makeBackup("standings");

      // Get race data
      const raceData = await eventService.getRaceData(event.eventId);
      if (raceData) {
        await addRaceToStandings(event, raceData);

        // if event has a power limit, update rows accordingly
        if (event.hasPowerLimit) {
          const winner = raceData.find((driver) => driver.seasonPoints === 100);

          if (!winner) {
            throw new Error(
              "No driver with 100 season points (winner) found. Can't update power limit."
            );
          }

          await updatePowerLimit(event.seasonId, winner.driverId);
        }

        await calendarService.setIsProcessedTrue(event.eventId);
        await addUpdateTime();

        // let's not bombard the API if there are more than 1 races to update
        await sleep(5000);
      }
    }
  }
};

// Check if there are draws in eventDetails and mark the rows to be
// solved manually
export const checkDraws = async () => {
  const eventList = await calendarService.getRaceCalendar();
  for (const event of eventList) {
    if (
      event.isReady &&
      event.isCompleted &&
      event.isProcessed &&
      !event.drawsChecked
    ) {
      const standings = await getSheetAndRows("standings");
      const seasonToCheck = standings.rows.filter(
        (row) => row.seasonId === event.seasonId
      );
      if (seasonToCheck) {
        const pointArr = seasonToCheck.map((s) => s.points);
        const hasDraws = pointArr.length !== new Set(pointArr).size;
        if (hasDraws) {
          const drawRows: IStandingRow[] = [];
          seasonToCheck.forEach((row) => {
            seasonToCheck.forEach((row2) => {
              if (row.driverId === row2.driverId) {
                return;
              }
              if (row.points === row2.points) {
                if (!drawRows.find((draw) => draw.driverId === row.driverId)) {
                  drawRows.push((row as unknown) as IStandingRow);
                  drawRows.push((row2 as unknown) as IStandingRow);
                }
              }
            });
          });
          const drawPromises: Promise<void>[] = [];
          drawRows.forEach((drawRow) => {
            const rowToUpdate = standings.rows.find((row) => {
              return (
                row.seasonId === drawRow.seasonId &&
                row.driverId === drawRow.driverId
              );
            });
            if (rowToUpdate) {
              rowToUpdate.drawPosition = config.CHECK_DRAW_TEXT;
              drawPromises.push(rowToUpdate.save());
            }
          });
          await Promise.all(drawPromises);
        }
      }
    }
  }
};

export default { getStandings, updateStandings, checkDraws };
