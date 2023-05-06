import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import imageRoutes from "../src/routes/imageRoutes.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Middleware to handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// Routes
app.use("/api/images", imageRoutes);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server live on http://localhost:${port}`);
});
