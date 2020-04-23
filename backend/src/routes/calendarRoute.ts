import express from "express";
import { googleSheetsService } from "../services";

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const raceCalendar = await googleSheetsService.getRaceCalendar();
    return res.status(200).json(raceCalendar);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

export default router;
