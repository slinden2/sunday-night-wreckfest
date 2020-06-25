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

// Get all race data of a single race
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

// Merge race data with meta data from seasons and raceCalendar sheets
// Returns different results based on what data has been entered in the DB.
// For example, season data is optional so if the event we are merging
// does not have a row in seasons sheet, the seasonData is ignored.
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

// Get season data for a specific event
export const getSeasonData = async (
  id: string
): Promise<ISeasonData | undefined> => {
  const seasonRawData = await getSheetAndRows("seasons");
  const seasonDetails = toSeasonDetails(id, seasonRawData.rows);
  return seasonDetails;
};

// Check if there are draws in eventDetails and mark the rows to be
// solved manually
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
            // A row that is in a draw situation will be marked in drawPosition column
            // for manual solving.
            if (rowToUpdate) {
              rowToUpdate.drawPosition = config.CHECK_DRAW_TEXT;
              promises.push(rowToUpdate.save());
            }
          });

          await Promise.all(promises);
        }
      }
    }
  }
};

// Function to get all data for a single race. This is called from
// the /api/races/:id route and also from the cache update script.
export const getSingleRace = async (id: string) => {
  const calendar = await calendarService.getRaceCalendar();
  const calendarEvent = calendar.find(event => event.eventId === id);

  if (!calendarEvent) {
    throw new Error(`No event found with eventId ${id}`);
  }

  const seasonData = await getSeasonData(calendarEvent.seasonId);

  if (calendarEvent.writtenResults) {
    // If written results are present, no stat calculation is needed and therefore
    // the data returned is different.
    return mergeRaceData(calendarEvent, {
      seasonData,
    });
  } else {
    // Returns regular race data with stat tables
    const raceData = await getRaceData(id);
    return mergeRaceData(calendarEvent, {
      seasonData,
      raceData,
    });
  }
};

export default {
  getRaceData,
  mergeRaceData,
  checkDraws,
  getSeasonData,
  getSingleRace,
};
