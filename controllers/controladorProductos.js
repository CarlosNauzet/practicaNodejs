const Productos = require("../models/Product");
const todosLosProductos = async (req, res) => {
  const productos = await Productos.find();
  res.status(200).json(productos);
};
module.exports = todosLosProductos;
