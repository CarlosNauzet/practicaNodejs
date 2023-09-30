const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  nombre: String,
  precio: Number,
  seVende: Boolean,
  foto: String,
  tags: [String],
});

const Producto = mongoose.model("Product", ProductSchema);

module.exports = Producto;
