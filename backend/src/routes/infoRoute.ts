import express from "express";
import Redis from "ioredis";
import config from "../config";
import infoService from "../services/info/infoService";

const router = express.Router();
const redis = new Redis(config.REDIS_URL);

// Get all info
router.get("/", async (req, res, next) => {
  try {
    const info = await infoService.getInfo();
    await redis.setex(req.baseUrl, 600, JSON.stringify(info));

    res.status(200).json(info);
  } catch (err) {
    next(err);
  }
});

export default router;
