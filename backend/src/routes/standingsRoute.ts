import express from "express";
import { standingsService } from "../services";
import config from "../config";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const standings = await standingsService.getStandings();
    res.status(200).json(standings);
  } catch (err) {
    next(err);
  }
});

router.get("/update/:hash", async (req, res, next) => {
  try {
    if (req.params.hash !== config.STANDINGS_UPDATE_HASH) {
      throw new Error("Invalid standings update hash");
    }
    await standingsService.updateStandings();
    res.status(200).json({
      message: "Standings successfully updated.",
    });
  } catch (err) {
    next(err);
  }
});

export default router;
