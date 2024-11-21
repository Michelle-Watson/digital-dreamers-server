import express from "express";
const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    // temporary caption, replace with API call
    const data = "Temporary caption";
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving captions: ${err}`);
  }
});

export default router;
