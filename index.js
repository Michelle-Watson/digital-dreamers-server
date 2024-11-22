import express from "express";
import cors from "cors";
import "dotenv/config";
import multer from "multer";
// Set up multer for image uploads
const upload = multer({ dest: "uploads/" }); // This will save the uploaded files in the "uploads" directory

import imagesRoutes from "./routes/image-routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(upload.single("image")); // This will apply to all POST requests for image upload

app.use("/images", imagesRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
