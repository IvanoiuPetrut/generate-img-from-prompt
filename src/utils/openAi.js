import * as dotenv from "dotenv";
dotenv.config();
import { Configuration, OpenAIApi } from "openai";
import axios from "axios";

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

const editImage = async (prompt, baseUrl, maskUrl) => {
  const srcReadStream = await axios({
    method: "GET",
    url: baseUrl,
    responseType: "stream",
  }).then((response) => response.data);

  const maskReadStream = await axios({
    method: "GET",
    url: maskUrl,
    responseType: "stream",
  }).then((response) => response.data);

  const response = await openai.createImageEdit(
    srcReadStream,
    maskReadStream,
    prompt,
    1,
    "1024x1024"
  );

  return response.data.data[0].url;
};
export { generateImage, editImage };
