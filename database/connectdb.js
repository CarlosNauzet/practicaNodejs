const mongoose = require("mongoose");

const dbconnect = async function connectdb() {
  try {
    await mongoose.connect("mongodb://localhost:27017/nodepop");
    console.log("BBDD conectada con éxito");
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbconnect;
