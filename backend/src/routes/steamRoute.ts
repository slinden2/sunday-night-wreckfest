import express from "express";
import { steamService } from "../services";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const servers = await steamService.getSNWServers();
    res.status(200).json(servers);
  } catch (err) {
    next(err);
  }
});

export default router;
