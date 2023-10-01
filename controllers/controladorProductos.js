const Productos = require("../models/Product");
const _ = require("lodash");

// controlador para todos los productos

const todosLosProductos = async (req, res) => {
  const filtros = {};
  if (req.query.nombre) {
    filtros.nombre = req.query.nombre;
  }
  console.log(filtros);
  const productos = await Productos.find(filtros);
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

// controlador para borrar productos
const borrarProductos = async (req, res) => {
  const id = req.params.id;
  const respuesta = await Productos.findByIdAndDelete(id);
  if (!respuesta) {
    res.status(404).json({
      msg: "No encontrado el producto a borrar",
    });
  } else {
    res.status(200).json({
      msg: "producto borrado con éxito",
      respuesta,
    });
  }
};

module.exports = {
  todosLosProductos,
  crearProductos,
  tagsUnicos,
  borrarProductos,
};
