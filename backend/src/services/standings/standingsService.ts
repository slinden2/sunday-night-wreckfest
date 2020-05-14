import { getSheetAndRows, makeBackup } from "../googleSheetsUtils";
import { toStandingRows } from "./standingsUtils";
import { calendarService, eventService } from "..";
import {
  addRaceToStandings,
  updatePowerLimit,
  markDuplicates,
} from "./updateStandingsUtils";
import { sleep } from "../../utils/misc";

const getStandings = async () => {
  const standings = await getSheetAndRows("standings");
  const standingRows = toStandingRows(standings.rows);
  return standingRows;
};

export const updateStandings = async (): Promise<void> => {
  const eventList = await calendarService.getRaceCalendar();
  for (const event of eventList) {
    if (event.isReady && event.isCompleted && !event.isProcessed) {
      await makeBackup("standings");

      const raceData = await eventService.getRaceData(event.eventId);

      // Check for duplicate seasonPoints (draws) and mark them
      const raceDataWithDups = await markDuplicates(raceData);

      await addRaceToStandings(raceDataWithDups, {
        hasPowerLimit: event.hasPowerLimit,
      });
      if (event.hasPowerLimit) {
        await updatePowerLimit();
      }
      await calendarService.setIsProcessedTrue(event.eventId);
      // let's not bombard the API if there are more than 1 races to update
      await sleep(5000);
    }
  }
};

export default { getStandings, updateStandings };
