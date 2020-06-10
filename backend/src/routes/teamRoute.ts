import express from "express";
import { teamService } from "../services";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const teams = await teamService.getTeams();
    res.status(200).json(teams);
  } catch (err) {
    next(err);
  }
});

export default router;
