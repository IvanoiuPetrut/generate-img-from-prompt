import express from "express";
import imageController from "../controllers/imageController.js";

const router = express.Router();

router.get("/test", (req, res) => {
  const imageUrl = "https://picsum.photos/200/300";

  res.json({
    imageUrl,
  });
});

router.get("/", async (req, res) => {
  const { prompt } = req.query;
  console.log(prompt);

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ message: "Invalid prompt" });
  }

  try {
    const imageUrl = await imageController.getImage(prompt);

    res.set({
      "Content-Type": "text/plain",
    });
    res.status(200).json({
      imageUrl,
      width: 1024,
      height: 1024,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/edit/:imageStream/:maskStream", async (req, res) => {
  const { imageStream, maskStream } = req.params;
  const { prompt } = req.query;

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ message: "Invalid prompt" });
  }

  try {
    const imageUrl = await imageController.editImage(
      imageStream,
      maskStream,
      prompt
    );

    res.set({
      "Content-Type": "text/plain",
    });
    res.status(200).json({
      imageUrl,
      width: 1024,
      height: 1024,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

export default router;
