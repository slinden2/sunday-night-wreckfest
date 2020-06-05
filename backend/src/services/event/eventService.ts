import { toDriverRaceDetails, getDraws, toSeasonDetails } from "./eventUtils";
import { getSheetAndRows } from "../googleSheetsUtils";
import {
  IDriverSeasonRaceData,
  IRaceCalendarEvent,
  IRaceDetails,
  ISeasonData,
} from "../../types";
import Race from "../race";
import { calendarService } from "..";
import config from "../../config";

export const getRaceData = async (
  id: string
): Promise<IDriverSeasonRaceData[] | undefined> => {
  const eventDetails = await getSheetAndRows("eventDetails");
  const driverRaceDetails = toDriverRaceDetails(id, eventDetails.rows);

  if (!driverRaceDetails.length) {
    return undefined;
  }

  const raceData = new Race(driverRaceDetails);
  return raceData.getRaceData;
};

export const mergeRaceData = (
  calendar: IRaceCalendarEvent,
  optionalData: {
    seasonData?: ISeasonData;
    raceData?: IDriverSeasonRaceData[];
  }
): IRaceDetails => {
  const { seasonData, raceData } = optionalData;

  const hasWrittenResultsWithSeasonData = Boolean(!raceData && seasonData);
  const hasWrittenResultsWithNoSeasonData = !raceData && !seasonData;
  const hasRaceDataWithNoSeasonData = Boolean(raceData && !seasonData);

  if (hasWrittenResultsWithSeasonData) {
    return {
      ...calendar,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      description: seasonData!.description,
      cars: seasonData?.cars,
      mods: seasonData?.mods,
    };
  } else if (hasWrittenResultsWithNoSeasonData) {
    return calendar;
  } else if (hasRaceDataWithNoSeasonData) {
    return {
      ...calendar,
      details: raceData,
    };
  } else {
    return {
      ...calendar,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      description: seasonData!.description,
      cars: seasonData?.cars,
      mods: seasonData?.mods,
      details: raceData,
    };
  }
};

export const getSeasonData = async (
  id: string
): Promise<ISeasonData | undefined> => {
  const seasonRawData = await getSheetAndRows("seasons");
  const seasonDetails = toSeasonDetails(id, seasonRawData.rows);
  return seasonDetails;
};

export const checkDraws = async () => {
  const eventList = await calendarService.getRaceCalendar();
  for (const event of eventList) {
    if (event.isReady && event.isCompleted && !event.isProcessed) {
      const raceData = await getRaceData(event.eventId);
      if (raceData) {
        const rowsToVerify = getDraws(raceData);
        if (rowsToVerify.length) {
          const eventDetails = await getSheetAndRows("eventDetails");
          const promises: Promise<any>[] = [];
          rowsToVerify.forEach(driver => {
            const rowToUpdate = eventDetails.rows.find(
              row =>
                row.eventId === driver.eventId &&
                row.driverId === driver.driverId
            );
            rowToUpdate.drawPosition = config.CHECK_DRAW_TEXT;
            promises.push(rowToUpdate.save({ raw: true }));
          });

          await Promise.all(promises);
        }
      }
    }
  }
};

export default {
  getRaceData,
  mergeRaceData,
  checkDraws,
  getSeasonData,
};
