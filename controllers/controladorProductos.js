const Productos = require("../models/Product");
const _ = require("lodash");

// controlador para todos los productos

const todosLosProductos = async (req, res) => {
  const filtros = {};
  if (req.query.nombre) {
    filtros.nombre = req.query.nombre;
  }
  if (req.query.precio) {
    filtros.precio = req.query.precio;
  }
  if (req.query.seVende) {
    filtros.seVende = req.query.seVende;
  }
  if (req.query.tags) {
    console.log(req.query.tags);
    const arrayTags = req.query.tags.split(",");
    console.log(arrayTags);
    filtros.tags = {
      $in: arrayTags,
    };
    console.log(filtros.tags);
  }

  console.log(filtros);

  // aquí el try: sirve para algo = evitar errores de BBDD
  try {
    const productos = await Productos.find(filtros);
    res.status(200).json(productos);
  } catch (error) {
    res.status(400),
      json({
        msg: error.message,
      });
  }
};

// controlador para crear productos
const crearProductos = async (req, res) => {
  // console.log(req.body); VALIDACION DESDE CONTROLADOR
  //  if (!req.body.nombre) {
  //   res.status(400).json({
  //     msg: "Error antes del try",
  //   });
  // }
  try {
    const newProduct = await Productos.create(req.body);
    res.status(201).json({
      msg: "producto creado",
      newProduct,
    });
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
    console.log(error);
  }
};

//controlador para los tags únicos

const tagsUnicos = async (req, res) => {
  //  arregla el try catch aqui -pero como pruebo el error? valdría para cuando els ervidor falla
  try {
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
  } catch (error) {
    res.status(400),
      json({
        msg: error.message,
      });
  }
};

// controlador para borrar productos
const borrarProductos = async (req, res) => {
  const id = req.params.id;
  try {
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
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
    console.log(error);
  }
};

// Pendiente: UPDATE productos

module.exports = {
  todosLosProductos,
  crearProductos,
  tagsUnicos,
  borrarProductos,
};
