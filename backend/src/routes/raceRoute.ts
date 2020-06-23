import express from "express";
import Redis from "ioredis";
import { calendarService, eventService } from "../services";
import config from "../config";
import { updateCache } from "../jobs";

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
    const raceData = await eventService.getSingleRace(req.params.id);
    res.status(200).json(raceData);
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

// An endpoint for manually updating the cache.
router.get("/update-cache/:hash", async (req, res, next) => {
  try {
    if (req.params.hash !== config.STANDINGS_UPDATE_HASH) {
      throw new Error("Invalid standings update hash");
    }
    res.status(200).json({
      message: "Cache update started. This will take a while... (15-20min)",
    });
    await updateCache();
  } catch (err) {
    next(err);
  }
});

export default router;
