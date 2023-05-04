import imageGenerator from "../utils/imageGenerator.js";
import imageEdit from "../utils/imageEdit.js";

const imageController = {};

imageController.getImage = async (prompt) => {
  const imageUrl = await imageGenerator(prompt);

  return imageUrl;
};

imageController.editImage = async (prompt, imageStream, maskStream) => {
  const imageUrl = await imageEdit(prompt, imageStream, maskStream);

  return imageUrl;
};

export default imageController;
