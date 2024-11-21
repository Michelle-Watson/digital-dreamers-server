import express from "express";
import fs from "fs";

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

// POST endpoint to receive image and generate caption
router.post("/", async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No image file uploaded.");
    }

    // Temporarily using a static caption until I integrate the API
    const caption = "Temporary caption";

    // Access uploaded file with req.file, e.g., req.file.path to get the file path
    console.log("Uploaded file:", req.file);

    // Delete uploaded file after processing
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully");
      }
    });

    res.status(200).json({ caption: caption });
  } catch (err) {
    res.status(400).send(`Error processing image: ${err.message}`);
  }
});

export default router;
