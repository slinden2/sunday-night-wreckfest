import express from "express";
import { calendarService, eventService } from "../services";

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
    const raceData = await eventService.getRaceData(req.params.id);
    return res.status(200).json(raceData);
  } catch (err) {
    return next(err);
  }
});

export default router;
