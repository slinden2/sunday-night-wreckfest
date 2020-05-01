import express from "express";

const router = express.Router();

router.get("/:id", async (req, res, next) => {
  try {
    res.status(200).send({ lol: req.params.id });
  } catch (err) {
    next(err);
  }
});

export default router;
