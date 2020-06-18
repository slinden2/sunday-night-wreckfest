import { getSheetAndRows, makeBackup } from "../googleSheetsUtils";
import { toStandingRows } from "./standingsUtils";
import { calendarService, eventService } from "..";
import {
  addRaceToStandings,
  updatePowerLimit,
  addUpdateTime,
} from "./updateStandingsUtils";
import { sleep } from "../../utils/misc";

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
          const winner = raceData.find(driver => driver.seasonPoints === 100);

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

export default { getStandings, updateStandings };
