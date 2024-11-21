import express from "express";
import cors from "cors";
import "dotenv/config";

import imagesRoutes from "./routes/image-routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/images", imagesRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));