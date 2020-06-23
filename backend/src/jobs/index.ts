import Redis from "ioredis";
import {
  calendarService,
  standingsService,
  teamService,
  eventService,
} from "../services";
import config from "../config";
import { IRaceCalendarEvent } from "../types";
import { sleep } from "../utils/misc";

const redis = new Redis(config.REDIS_URL);

const updateRaceCache = async (calendar: IRaceCalendarEvent[]) => {
  for (const event of calendar) {
    console.log(event.eventId);
    const raceData = await eventService.getSingleRace(event.eventId);
    await redis.setex(
      `/api/races/${event.eventId}`,
      86400,
      JSON.stringify(raceData)
    );
    await sleep(10000);
  }
};

export const updateCache = async () => {
  const raceCalendar = await calendarService.getRaceCalendar();
  await redis.setex("/api/races", 86400, JSON.stringify(raceCalendar));

  const standings = await standingsService.getStandings();
  await redis.setex("/api/standings", 86400, JSON.stringify(standings));

  const teams = await teamService.getTeams();
  await redis.setex("/api/teams", 86400, JSON.stringify(teams));

  await updateRaceCache(raceCalendar);
};
