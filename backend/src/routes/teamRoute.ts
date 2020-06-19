import express from "express";
import Redis from "ioredis";
import { teamService } from "../services";
import config from "../config";

const router = express.Router();
const redis = new Redis(config.REDIS_PORT, config.REDIS_HOST);

// Get all teams
router.get("/", async (req, res, next) => {
  try {
    const teams = await teamService.getTeams();
    await redis.setex(req.baseUrl, 600, JSON.stringify(teams));

    res.status(200).json(teams);
  } catch (err) {
    next(err);
  }
});

export default router;
