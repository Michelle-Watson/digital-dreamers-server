import express from "express";
import fs from "fs";
import axios from "axios";

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

    // Access uploaded file with req.file, e.g., req.file.path to get the file path
    console.log("Uploaded file:", req.file);

    // Define tone and prompt with default values
    let tone = "no-tone";
    let prompt = "";

    // Check if tone and prompt are provided in the request body, and override default values if necessary
    if (req.body.tone) {
      tone = req.body.tone;
    }

    if (req.body.prompt) {
      prompt = req.body.prompt;
    }

    // const imageUrl = `http://localhost:5051/uploads/${req.file.filename}`;
    // hardcode for now
    const imageUrl = `https://i.ibb.co/wKV2GLB/bunny.jpg`;

    // Construct the data for the external API request
    const requestData = {
      tone: tone,
      imageUrl: imageUrl,
      prompt: prompt,
    };

    // Send POST request to external API
    const response = await axios.post(
      "https://pallyy.com/api/tools/image-to-caption/get",
      requestData,
      {}
    );

    // Delete uploaded file after processing
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully");
      }
    });

    // Check if the response from the API contains captions and return the first one or both
    if (
      response.data &&
      response.data.captions &&
      response.data.captions.length > 0
    ) {
      const captions = response.data.captions; // An array of captions
      res.status(200).json({ captions: captions }); // Return all captions
      // return 1st caption
      // res.status(200).json({ caption: captions[0] });
    } else {
      res.status(400).send("Failed to generate captions.");
    }
  } catch (err) {
    res.status(400).send(`Error processing image: ${err.message}`);
  }
});

export default router;
