const Productos = require("../models/Product");
const _ = require("lodash");

// controlador para todos los productos
const todosLosProductos = async (req, res) => {
  const productos = await Productos.find();
  res.status(200).json(productos);
};

// controlador para crear productos
const crearProductos = async (req, res) => {
  // console.log(req.body);
  const newProduct = await Productos.create(req.body);
  res.status(201).json({
    msg: "producto creado",
    newProduct,
  });
};

//controlador para los tags únicos

const tagsUnicos = async (req, res) => {
  const productos = await Productos.find();
  // const tags = productos.map((producto) => {
  //   return producto.tags;
  // });

  const tags = productos.flatMap((producto) => {
    return producto.tags;
  });
  const tagsUnicos = _.uniq(tags);
  res.status(200).json({
    msg: "tags únicos",
    tagsUnicos,
  });
};

module.exports = { todosLosProductos, crearProductos, tagsUnicos };
