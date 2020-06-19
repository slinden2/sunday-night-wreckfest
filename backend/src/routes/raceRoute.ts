import express from "express";
import Redis from "ioredis";
import { calendarService, eventService } from "../services";
import config from "../config";

const router = express.Router();
const redis = new Redis(config.REDIS_URL);

// Get the complete race calendar
router.get("/", async (req, res, next) => {
  try {
    const raceCalendar = await calendarService.getRaceCalendar();
    await redis.setex(req.baseUrl, 600, JSON.stringify(raceCalendar));

    return res.status(200).json(raceCalendar);
  } catch (err) {
    return next(err);
  }
});

// Get a single race
router.get("/:id", async (req, res, next) => {
  try {
    const calendar = await calendarService.getRaceCalendar();
    const calendarEvent = calendar.find(
      event => event.eventId === req.params.id
    );

    if (!calendarEvent) {
      throw new Error(`No event found with eventId ${req.params.id}`);
    }

    const seasonData = await eventService.getSeasonData(calendarEvent.seasonId);

    if (calendarEvent.writtenResults) {
      // If written results are present, no stat calculation is needed and therefore
      // the data returned is different.
      const mergedData = eventService.mergeRaceData(calendarEvent, {
        seasonData,
      });

      return res.status(200).json(mergedData);
    } else {
      // Returns regular race data with stat tables
      const raceData = await eventService.getRaceData(req.params.id);
      const mergedData = eventService.mergeRaceData(calendarEvent, {
        seasonData,
        raceData,
      });
      return res.status(200).json(mergedData);
    }
  } catch (err) {
    return next(err);
  }
});

// An endpoint to check draws in the eventDetails sheet.
// Works only if the secret hash is provided.
router.get("/update/:hash", async (req, res, next) => {
  try {
    if (req.params.hash !== config.STANDINGS_UPDATE_HASH) {
      throw new Error("Invalid standings update hash");
    }
    await eventService.checkDraws();
    res.status(200).json({
      message: "eventDetails successfully updated.",
    });
  } catch (err) {
    next(err);
  }
});

export default router;
