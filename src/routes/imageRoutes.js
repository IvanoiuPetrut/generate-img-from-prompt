import express from "express";
import multer from "multer";
import imageController from "../controllers/imageController.js";
import { imageUrlToBuffer } from "../utils/imageUtilis.js";
import randomName from "../utils/randomName.js";
import { editImage } from "../utils/openAi.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
upload.single("image");

const router = express.Router();

router.get("/test", (req, res) => {
  const imageUrl = "https://picsum.photos/200/300";

  res.json({
    imageUrl,
  });
});

router.get("/generate", async (req, res) => {
  const { prompt } = req.query;
  console.log(prompt);

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ message: "Invalid prompt" });
  }

  let imageName = randomName(16);
  imageName = imageName + "-imageType=base";

  try {
    const generatedImageUrl = await imageController.generateImage(prompt);
    const imageBuffer = await imageUrlToBuffer(generatedImageUrl);
    const { imageUrl, name } = await imageController.postImage(
      imageBuffer,
      imageName
    );

    console.log("NumeImg", name);
    res.set({
      "Content-Type": "text/plain",
    });
    res.status(200).json({
      imageUrl,
      name,
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

router.get("/edit", async (req, res) => {
  const { prompt } = req.query;
  const { imageName } = req.body;

  console.log(prompt);
  console.log(imageName);

  try {
    const imageUrl = await editImage(prompt, imageName);
    res.status(200).json({
      imageUrl,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  const { imageName, isMask } = req.body;
  const { buffer } = req.file;

  if (!imageName || typeof imageName !== "string") {
    return res.status(400).json({ message: "Invalid image name" });
  }

  if (!buffer || typeof buffer !== "object") {
    return res.status(400).json({ message: "Invalid image" });
  }

  try {
    const imageUrl = await imageController.postImage(buffer, imageName, isMask);

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
