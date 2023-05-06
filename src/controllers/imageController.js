import * as dotenv from "dotenv";
dotenv.config();
import imageGenerator from "../utils/imageGenerator.js";
import imageEdit from "../utils/imageEdit.js";
import sharp from "sharp";
import { S3Client } from "@aws-sdk/client-s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const imageController = {};

imageController.generateImage = async (prompt) => {
  const imageUrl = await imageGenerator(prompt);

  return imageUrl;
};

imageController.editImage = async (prompt, imageStream, maskStream) => {
  const imageUrl = await imageEdit(prompt, imageStream, maskStream);

  return imageUrl;
};

imageController.postImage = async (imageName, imageBuffer) => {
  imageBuffer = await sharp(imageBuffer)
    .resize({
      width: 1024,
      height: 1024,
      fit: "contain",
    })
    .png()
    .toBuffer();

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${imageName}.png`,
    Body: imageBuffer,
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    console.log("Success", data);
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

export default imageController;
