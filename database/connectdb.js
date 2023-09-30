const mongoose = require("mongoose");

const dbconnect = async function connectdb() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/nodepop"); // reemplazo el localhost por el 127.0.0.1 y funciona!
    console.log("BBDD conectada con éxito");
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbconnect;
