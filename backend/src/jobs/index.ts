import Redis from "ioredis";
import { calendarService, standingsService, teamService } from "../services";
import config from "../config";

const redis = new Redis(config.REDIS_URL);

export const updateCache = async () => {
  const raceCalendar = await calendarService.getRaceCalendar();
  await redis.setex("races", 320, JSON.stringify(raceCalendar));

  const standings = await standingsService.getStandings();
  await redis.setex("standings", 320, JSON.stringify(standings));

  const teams = await teamService.getTeams();
  await redis.setex("teams", 320, JSON.stringify(teams));
};
