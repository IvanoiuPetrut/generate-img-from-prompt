import * as dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";
import { generateImage } from "../utils/openAi.js";
import sharp from "sharp";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const prisma = new PrismaClient();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const imageController = {};

imageController.generateImage = async (prompt) => {
  const imageUrl = await generateImage(prompt);

  return imageUrl;
};

imageController.postImage = async (imageBuffer, imageName) => {
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
    console.log("Success S3", data);
  } catch (err) {
    console.log("Error S3", err);
  }

  const imageUrl = await getSignedUrl(
    s3Client,
    new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${imageName}.png`,
      ResponseContentDisposition: "attachment",
      ResponseContentType: "image/png",
      Expires: 3600,
      ACL: "public-read",
      CORSRules: [
        {
          AllowedOrigins: ["*"],
          AllowedMethods: ["GET", "HEAD"],
          MaxAgeSeconds: 3000,
        },
      ],
    }),
    {
      expiresIn: 3600,
    }
  );

  const image = await prisma.image
    .create({
      data: {
        name: imageName,
        userId: 5,
      },
    })
    .catch((error) => {
      console.log(error);
      return null;
    });

  image.imageUrl = imageUrl;
  return image;
};

imageController.getImageURL = async (imageName) => {
  const imageUrl = await getSignedUrl(
    s3Client,
    new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: imageName,
      ResponseContentType: "image/png",
      Expires: 3600,
    }),
    {
      expiresIn: 3600,
    }
  );

  return imageUrl;
};

export default imageController;
