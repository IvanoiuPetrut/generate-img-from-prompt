import imageGenerator from "../utils/imageGenerator.js";

const imageController = {};

imageController.getImage = async (prompt) => {
  const imageUrl = await imageGenerator(prompt);

  return imageUrl;
};

export default imageController;
