import * as dotenv from "dotenv";
dotenv.config();
import { Configuration, OpenAIApi } from "openai";
import { createReadStream } from "fs";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateImage = async (prompt) => {
  const response = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  });

  console.log(response.data.data[0].url);
  return response.data.data[0].url;
};

const editImage = async (prompt, imageName) => {
  console.log("Prompt fc", prompt);
  console.log("Numele imaginii fc", imageName);

  const src = `./images/${imageName}-imageType=base.png`;
  const mask = `./images/${imageName}-imageType=mask.png`;

  const response = await openai.createImageEdit(
    createReadStream(src),
    createReadStream(mask),
    prompt,
    1,
    "1024x1024"
  );

  const url = response.data.data[0].url;
  console.log(response.data.data[0].url);
  return url;
};
export { generateImage, editImage };
