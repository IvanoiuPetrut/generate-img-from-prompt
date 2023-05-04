import * as dotenv from "dotenv";
dotenv.config();
import { Configuration, OpenAIApi } from "openai";
import got from "got";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const imageStream = got.stream("https://example.com/image.png");

const maskStream = got.stream("https://example.com/mask.png");

const generateImage = async (prompt, imageStream, maskStream) => {
  const response = await openai.createImageEdit(
    imageStream,
    maskStream,
    prompt,
    1,
    "1024x1-24"
  );

  console.log(response.data.data[0].url);
  return response.data.data[0].url;
};

export default generateImage;
