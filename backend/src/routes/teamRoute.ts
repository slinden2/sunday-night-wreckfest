import express from "express";
import Redis from "ioredis";
import { teamService } from "../services";

const router = express.Router();
const redis = new Redis();

// Get all teams
router.get("/", async (_req, res, next) => {
  try {
    const teams = await teamService.getTeams();
    await redis.setex("teams", 600, JSON.stringify(teams));

    res.status(200).json(teams);
  } catch (err) {
    next(err);
  }
});

export default router;
