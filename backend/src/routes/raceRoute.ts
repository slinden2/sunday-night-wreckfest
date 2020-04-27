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
    console.log(req.params);
    typeof res;
    res.send(200);
    typeof res;
  } catch (err) {
    return next(err);
  }
});

export default router;
