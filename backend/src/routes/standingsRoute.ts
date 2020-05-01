import express from "express";
import { standingsService } from "../services";

const router = express.Router();

router.get("/:id", async (req, res, next) => {
  try {
    const standings = await standingsService.getStandings(req.params.id);
    res.status(200).json(standings);
  } catch (err) {
    next(err);
  }
});

export default router;
