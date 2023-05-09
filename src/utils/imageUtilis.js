import axios from "axios";

async function imageUrlToBuffer(url) {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data, "binary");
    return buffer;
  } catch (error) {
    console.error(`Error fetching ${url}: ${error}`);
    throw error;
  }
}

export { imageUrlToBuffer };
