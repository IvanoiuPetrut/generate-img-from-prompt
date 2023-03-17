const imageController = {};

imageController.getImage = (prompt) => {
  const imageUrl = `https://source.unsplash.com/1600x900/?${prompt}`;

  return imageUrl;
};

export default imageController;
