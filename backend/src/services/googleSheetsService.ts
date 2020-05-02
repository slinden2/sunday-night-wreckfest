const { GoogleSpreadsheet } = require("google-spreadsheet");

import config from "../config";
import { addRaceToStandings, updatePowerLimit } from "./updateStandingsUtils";
import { sleep } from "../utils/misc";
import { calendarService } from ".";
import eventService from "./event/eventService";

export const getDocument = async () => {
  const doc = new GoogleSpreadsheet(config.GS_ID);
  await doc.useServiceAccountAuth(config.GS_AUTH);
  await doc.loadInfo();
  return doc;
};

export const getSheetRows = async (id: number) => {
  const doc = await getDocument();
  const sheet = doc.sheetsById[id];
  const rows = await sheet.getRows();
  return rows;
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

export default {
  updateStandings,
};
