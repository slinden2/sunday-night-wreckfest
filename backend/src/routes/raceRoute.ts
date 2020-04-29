import express from "express";
import { googleSheetsService } from "../services";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const raceCalendar = await googleSheetsService.getRaceCalendar();
    return res.status(200).json(raceCalendar);
  } catch (err) {
    return next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const raceData = await googleSheetsService.getRaceData(req.params.id);
    return res.status(200).json(raceData);
  } catch (err) {
    return next(err);
  }
});

export default router;
