const Productos = require("../models/Product");
const mongoose = require("mongoose");
const productos = require("./products");
const dbconnect = async function connectdb() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/nodepop"); // reemplazo el localhost por el 127.0.0.1 y funciona!
    console.log("BBDD conectada con éxito");
    await Productos.deleteMany();
    console.log("Productos anteriores eliminados");
    await Productos.insertMany(productos);
    console.log("Productos insertados");
    mongoose.disconnect();
  } catch (error) {
    console.log(error);
  }
};

dbconnect();
