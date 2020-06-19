import Redis from "ioredis";
import { calendarService, standingsService, teamService } from "../services";
import config from "../config";

const redis = new Redis(config.REDIS_PORT, config.REDIS_HOST);

export const updateCache = async () => {
  const raceCalendar = await calendarService.getRaceCalendar();
  await redis.setex("races", 600, JSON.stringify(raceCalendar));

  const standings = await standingsService.getStandings();
  await redis.setex("standings", 600, JSON.stringify(standings));

  const teams = await teamService.getTeams();
  await redis.setex("teams", 600, JSON.stringify(teams));
};
