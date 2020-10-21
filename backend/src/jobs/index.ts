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
import logger from "../utils/logger";
import infoService from "../services/info/infoService";

const redis = new Redis(config.REDIS_URL);

const updateRaceCache = async (calendar: IRaceCalendarEvent[]) => {
  for (const event of calendar.reverse()) {
    const raceData = await eventService.getSingleRace(event.eventId);
    await redis.setex(
      `/api/races/${event.eventId}`,
      86400,
      JSON.stringify(raceData)
    );
    await sleep(15000);
    logger.info(`updateRaceCache - ${event.eventId} done.`);
  }
};

export const updateCache = async () => {
  logger.info("updateCache - Cache update started.");
  const raceCalendar = await calendarService.getRaceCalendar();
  await redis.setex("/api/races", 86400, JSON.stringify(raceCalendar));
  logger.info("updateCache - raceCalendar done.");

  const info = await infoService.getInfo();
  await redis.setex("/api/standings", 86400, JSON.stringify(info));
  logger.info("updateCache - info done.");

  const standings = await standingsService.getStandings();
  await redis.setex("/api/standings", 86400, JSON.stringify(standings));
  logger.info("updateCache - standings done.");

  const teams = await teamService.getTeams();
  await redis.setex("/api/teams", 86400, JSON.stringify(teams));
  logger.info("updateCache - teams done.");

  await updateRaceCache(raceCalendar);
};
