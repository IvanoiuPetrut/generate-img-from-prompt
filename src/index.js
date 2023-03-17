import express from "express";
import imageRoutes from "../src/routes/imageRoutes.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/images", imageRoutes);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server live on http://localhost:${port}`);
});
