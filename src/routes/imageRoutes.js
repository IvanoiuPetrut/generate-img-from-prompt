import express from "express";
import imageController from "../controllers/imageController.js";

const router = express.Router();

router.get("/", (req, res) => {
  const imageUrl = "https://picsum.photos/200/300";

  res.json({
    imageUrl,
  });
});

router.get("/:prompt", (req, res) => {
  const { prompt } = req.params;

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ message: "Invalid prompt" });
  }

  try {
    const imageUrl = imageController.getImage(prompt);

    res.set({
      "Content-Type": "text/plain",
    });
    res.status(200).json({
      imageUrl,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

export default router;
