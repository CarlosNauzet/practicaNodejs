const { Responder } = require("cote");
const path = require("path");
const jimp = require("jimp");

const main = async (fileName) => {
  try {
    const responder = new Responder({ name: "thumbnail-microservice" });
    responder.on("create-thumbnail", async (req, done) => {
      const imagePath = path.join(
        __dirname,
        "..",
        "public",
        "images",
        fileName
      );
      const image = await jimp.read(imagePath);
      await image.resize(100, jimp.AUTO);
      const thumbnailPath = path.join(
        __dirname,
        "..",
        "public",
        "thumbnails",
        `thumb-${fileName}`
      );
      await image.writeAsync(thumbnailPath);
      done("Thumbnail creado");
    });
  } catch (error) {
    console.log(error);
  }
};
