import express from "express";
import Redis from "ioredis";
import { standingsService } from "../services";
import config from "../config";

const router = express.Router();
const redis = new Redis(config.REDIS_URL);

// Get all standings
router.get("/", async (req, res, next) => {
  try {
    const standings = await standingsService.getStandings();
    await redis.setex(req.baseUrl, 600, JSON.stringify(standings));

    res.status(200).json(standings);
  } catch (err) {
    next(err);
  }
});

// An endpoint for updating the stadings sheet in the DB.
// Works only if the secret hash is provided.
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

// An endpoint to check draws in the standings sheet.
// Works only if the secret hash is provided.
router.get("/check-draws/:hash", async (req, res, next) => {
  try {
    if (req.params.hash !== config.STANDINGS_UPDATE_HASH) {
      throw new Error("Invalid standings update hash");
    }
    await standingsService.checkDraws();
    res.status(200).json({
      message: "standings successfully updated.",
    });
  } catch (err) {
    next(err);
  }
});

export default router;
