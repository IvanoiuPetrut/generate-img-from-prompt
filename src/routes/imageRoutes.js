import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  const imageUrl = "https://picsum.photos/200/300";

  res.json({
    imageUrl,
  });
});

router.get("/:prompt", (req, res) => {
  const { prompt } = req.params;
  const imageUrl = `https://source.unsplash.com/1600x900/?${prompt}`;

  res.json({
    imageUrl,
  });
});

export default router;
