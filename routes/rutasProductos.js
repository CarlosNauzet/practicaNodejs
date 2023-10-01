const express = require("express");
const Productos = require("../models/Product");
const controladorProductos = require("../controllers/controladorProductos");

const router = express.Router();

// router todos los productos
router.get("/", controladorProductos.todosLosProductos);

// router crear productos
router.post("/", controladorProductos.crearProductos);

// router para los tags
router.get("/tags", controladorProductos.tagsUnicos);

// router para borrar productos
router.delete("/:id", controladorProductos.borrarProductos);

module.exports = router;
