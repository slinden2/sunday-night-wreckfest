import { getSheetAndRows } from "../googleSheetsUtils";
import { toStandingRows } from "./standingsUtils";
import { calendarService, eventService } from "..";
import { addRaceToStandings, updatePowerLimit } from "./updateStandingsUtils";
import { sleep } from "../../utils/misc";

const getStandings = async (seasonId: string) => {
  const standings = await getSheetAndRows("standings");
  const rawRows = standings.rows.filter(row => row.seasonId === seasonId);
  const standingRows = toStandingRows(rawRows);
  return standingRows;
};

export const updateStandings = async (): Promise<void> => {
  const eventList = await calendarService.getRaceCalendar();
  for (const event of eventList) {
    if (event.isReady && event.isCompleted && !event.isProcessed) {
      const raceData = await eventService.getRaceData(event.eventId);
      await addRaceToStandings(raceData, {
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
