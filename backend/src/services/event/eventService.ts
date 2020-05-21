import { toDriverRaceDetails, getDraws } from "./eventUtils";
import { getSheetAndRows } from "../googleSheetsUtils";
import {
  IDriverSeasonRaceData,
  RaceCalendarEvent,
  IRaceDetails,
} from "../../types";
import Race from "../race";
import { calendarService } from "..";
import config from "../../config";

export const getRaceData = async (
  id: string
): Promise<IDriverSeasonRaceData[]> => {
  const eventDetails = await getSheetAndRows("eventDetails");
  const driverRaceDetails = toDriverRaceDetails(id, eventDetails.rows);
  const raceData = new Race(driverRaceDetails);
  return raceData.getRaceData;
};

export const mergeRaceData = (
  id: string,
  calendar: RaceCalendarEvent[],
  raceData: IDriverSeasonRaceData[]
): IRaceDetails => {
  const race = calendar.find(event => event.eventId === id);

  if (!race) {
    throw new Error("No races found with given id");
  }

  return { ...race, details: raceData };
};

export const checkDraws = async () => {
  const eventList = await calendarService.getRaceCalendar();
  for (const event of eventList) {
    if (event.isReady && event.isCompleted && !event.isProcessed) {
      const raceData = await getRaceData(event.eventId);
      const rowsToVerify = getDraws(raceData);
      if (rowsToVerify.length) {
        const eventDetails = await getSheetAndRows("eventDetails");
        const promises: Promise<any>[] = [];
        rowsToVerify.forEach(driver => {
          const rowToUpdate = eventDetails.rows.find(
            row =>
              row.eventId === driver.eventId && row.driverId === driver.driverId
          );
          rowToUpdate.drawPosition = config.CHECK_DRAW_TEXT;
          promises.push(rowToUpdate.save({ raw: true }));
        });

        await Promise.all(promises);
      }
    }
  }
};

export default {
  getRaceData,
  mergeRaceData,
  checkDraws,
};
