import express from "express";
import { standingsService } from "../services";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const standings = await standingsService.getStandings("0400");
    res.status(200).json(standings);
  } catch (err) {
    next(err);
  }
});

// router.get("/:id", async (req, res, next) => {
//   try {
//     const standings = await standingsService.getStandings(req.params.id);
//     res.status(200).json(standings);
//   } catch (err) {
//     next(err);
//   }
// });

export default router;
