const mongoose = require("mongoose");
const { Requester } = require("cote");

// Validaciones hechas en el modelo de Moogose
const requester = new Requester({
  name: "thumbnail-microservice-requester",
});
const ProductSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El campo nombre es obligatorio"],
    trim: true,
  },
  precio: {
    type: Number,
    required: true,
    min: [0, " El valor mínimo de precio es 0"],
    max: [100000, "El valor máximo de precio es 100000"],
  },
  seVende: {
    type: Boolean,
    default: true, // validamos por defecto como true si no introduce este valor
  },
  foto: {
    type: String,
    // required: [true, "Debes subir una foto"],
  },
  tags: [
    {
      type: String,
      enum: ["lifestyle", "motor", "work", "mobile"], // Valido que sea uno de los 4 tags que tenemos asigandos
    },
  ],
});

ProductSchema.methods.createThumbnail = async function () {
  const event = {
    type: "create-thumbnail",
    fileName: this.foto,
    test: "testeando requester",
  };
  return new Promise((resolve) => {
    requester.send(event, resolve);
  });
};

const Producto = mongoose.model("Product", ProductSchema);

module.exports = Producto;
