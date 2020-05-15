import express from "express";
import { calendarService, eventService } from "../services";
import { mergeRaceData } from "../services/event/eventService";

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
    const raceData = await eventService.getRaceData(req.params.id);
    const mergedData = mergeRaceData(req.params.id, calendar, raceData);
    return res.status(200).json(mergedData);
  } catch (err) {
    return next(err);
  }
});

export default router;
