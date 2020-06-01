import express from "express";
import { calendarService, eventService } from "../services";
import { mergeRaceData, getSeasonData } from "../services/event/eventService";
import config from "../config";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const raceCalendar = await calendarService.getRaceCalendar();
    return res.status(200).json(raceCalendar);
  } catch (err) {
    return next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const calendar = await calendarService.getRaceCalendar();
    const calendarEvent = calendar.find(
      event => event.eventId === req.params.id
    );
    if (!calendarEvent) {
      throw new Error(`No event found with eventId ${req.params.id}`);
    }

    const raceData = await eventService.getRaceData(req.params.id);
    const seasonData = await getSeasonData(calendarEvent.seasonId);
    const mergedData = mergeRaceData(calendarEvent, raceData, seasonData);
    return res.status(200).json(mergedData);
  } catch (err) {
    return next(err);
  }
});

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
